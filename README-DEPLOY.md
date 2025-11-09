# 🚀 Guia de Deploy no Vercel

## Problema: "No Output Directory named 'public' found"

O Vercel está procurando um diretório `public`, mas nosso projeto tem os arquivos na raiz.

## ✅ Solução

O Vercel detecta automaticamente:
- Arquivos estáticos na raiz (como `index.html`)
- Serverless Functions na pasta `api/`

**Não precisa de configuração complexa!**

## 📋 Passo a Passo Correto

### 1. Estrutura do Projeto

Certifique-se de que sua estrutura está assim:
```
projeto/
├── index.html          (arquivo principal)
├── api/
│   └── save-visit.js   (serverless function)
├── logs/
│   └── visitas.txt     (arquivo de log)
├── vercel.json         (configuração mínima)
└── package.json        (opcional)
```

### 2. Configurar no Vercel

1. **Acesse**: https://vercel.com
2. **Faça login** com GitHub
3. **Add New Project** → Importe seu repositório
4. **Não precisa configurar Framework Preset** (deixe em "Other")
5. **Root Directory**: deixe vazio (ou `/` se pedir)
6. **Build Command**: deixe vazio
7. **Output Directory**: deixe vazio
8. **Install Command**: deixe vazio

### 3. Variáveis de Ambiente

Nas **Environment Variables**, adicione:
- `GITHUB_OWNER` = `brunmdesv`
- `GITHUB_REPO` = `orcamentos`
- `GITHUB_TOKEN` = `seu_token_aqui`
- `LOG_PATH` = `logs/visitas.txt` (opcional)

### 4. Deploy

Clique em **Deploy** e aguarde!

## 🔧 Se Ainda Der Erro

### Opção 1: Configurar Output Directory Manualmente

No Vercel Dashboard:
1. Vá em **Settings** → **General**
2. Em **Root Directory**, deixe vazio
3. Em **Output Directory**, deixe vazio ou coloque `.`

### Opção 2: Usar Configuração Explícita

Se ainda não funcionar, adicione no `vercel.json`:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "functions": {
    "api/save-visit.js": {
      "maxDuration": 10
    }
  }
}
```

### Opção 3: Criar Diretório Public (Alternativa)

Se nada funcionar, você pode mover os arquivos:

```bash
mkdir public
mv index.html public/
# Atualize as referências no código
```

Mas isso **não é necessário** se você seguir a Opção 1 ou 2.

## ✅ Verificação

Após o deploy, verifique:
1. A página carrega: `https://seu-projeto.vercel.app`
2. A API funciona: `https://seu-projeto.vercel.app/api/save-visit`
3. Os logs são salvos no GitHub

## 🐛 Troubleshooting

### Erro: "Function not found"
- Verifique se `api/save-visit.js` existe
- Verifique se o arquivo exporta a função corretamente

### Erro: "Module not found"
- Verifique se não há `require()` ou `import` de módulos não instalados
- O Vercel fornece `fetch` nativamente (não precisa instalar)

### Erro: "Environment variable not found"
- Verifique se as variáveis estão configuradas no Vercel
- Verifique se os nomes estão corretos (case-sensitive)

## 💡 Dicas

- O Vercel detecta automaticamente Node.js nas funções
- Não precisa de `package.json` se não usar dependências externas
- O `vercel.json` é opcional se tudo estiver na estrutura padrão
- Use o Dashboard do Vercel para ver logs em tempo real

## 🎉 Pronto!

Seu projeto deve funcionar agora!

