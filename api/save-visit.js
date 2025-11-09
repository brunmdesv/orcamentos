// Vercel Serverless Function para salvar visitas no GitHub
// O token fica seguro nas variáveis de ambiente do Vercel

export default async function handler(req, res) {
  // Permite apenas requisições POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Configurações (do ambiente ou padrão)
  const GITHUB_OWNER = process.env.GITHUB_OWNER || 'brunmdesv';
  const GITHUB_REPO = process.env.GITHUB_REPO || 'orcamentos';
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const LOG_PATH = process.env.LOG_PATH || 'logs/visitas.txt';

  // Verifica se o token está configurado
  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN não configurado');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Processa o body (pode vir como JSON ou Blob do sendBeacon)
    let data = req.body;
    
    // Se for um Blob/stream do sendBeacon, precisa ser parseado
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        // Se não for JSON válido, tenta ler como texto
        return res.status(400).json({ error: 'Invalid data format' });
      }
    }
    
    // Valida os dados recebidos
    if (!data || !data.datetime) {
      return res.status(400).json({ error: 'Invalid data - datetime required' });
    }

    // URL da API do GitHub
    const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${LOG_PATH}`;

    // Busca o conteúdo atual do arquivo
    let currentContent = '';
    let sha = null;

    try {
      const getResponse = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Visit-Log-App'
        }
      });

      if (getResponse.ok) {
        const fileData = await getResponse.json();
        // Decodifica o conteúdo base64
        currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
        sha = fileData.sha;
      } else if (getResponse.status !== 404) {
        // Se não for 404, é um erro real
        const errorData = await getResponse.json();
        console.error('❌ Erro ao buscar arquivo:', errorData);
        return res.status(getResponse.status).json({ error: 'Failed to fetch file', details: errorData });
      }
    } catch (error) {
      console.log('📄 Arquivo não existe ainda, será criado');
    }

    // Prepara o conteúdo atualizado
    let updatedContent;
    if (!currentContent || currentContent.trim() === '') {
      updatedContent = '=== LOG DE VISITAS - SCROLL ATÉ O FIM ===\n\n';
    } else {
      updatedContent = currentContent;
    }

    // Adiciona nova entrada
    const newEntry = `Data/Hora: ${data.datetime}\n`;
    const newEntryFull = `${newEntry}URL: ${data.url || 'N/A'}\nUser Agent: ${data.userAgent || 'N/A'}\nScroll: ${data.scrollPosition || 0}px\nScreen: ${data.screenWidth || 0}x${data.screenHeight || 0}\n---\n\n`;
    updatedContent += newEntryFull;

    // Codifica para base64
    const encodedContent = Buffer.from(updatedContent, 'utf-8').toString('base64');

    // Atualiza o arquivo no GitHub
    const updateResponse = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Visit-Log-App'
      },
      body: JSON.stringify({
        message: `Update visit log: ${data.datetime}`,
        content: encodedContent,
        sha: sha // null se for novo arquivo
      })
    });

    if (updateResponse.ok) {
      const result = await updateResponse.json();
      console.log('✅ Log salvo no GitHub:', data.datetime);
      return res.status(200).json({ 
        success: true, 
        message: 'Log saved successfully',
        commit: result.commit
      });
    } else {
      const errorData = await updateResponse.json();
      console.error('❌ Erro ao salvar no GitHub:', errorData);
      return res.status(updateResponse.status).json({ 
        error: 'Failed to save log', 
        details: errorData 
      });
    }
  } catch (error) {
    console.error('❌ Erro ao processar requisição:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
}

