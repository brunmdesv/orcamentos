# 🚀 Configuração no Vercel

Esta solução usa **Vercel Serverless Functions** para salvar os logs no GitHub de forma segura.

## ✅ Por que Vercel é melhor?

1. **Token seguro**: O token GitHub fica nas variáveis de ambiente do Vercel, nunca exposto no código
2. **Sem CORS**: Serverless functions não têm problemas de CORS
3. **Gratuito**: Plano gratuito do Vercel é suficiente
4. **Fácil deploy**: Conecta direto com seu repositório GitHub

## 📋 Passo a Passo

### 1. Criar Token no GitHub

1. Vá em: https://github.com/settings/tokens
2. Clique em "Generate new token (classic)"
3. Dê um nome: "Vercel Visit Log"
4. Marque a permissão `repo`
5. Clique em "Generate token"
6. **COPIE O TOKEN** (você só verá uma vez!)

### 2. Fazer Deploy no Vercel

#### Opção A: Via GitHub (Recomendado)

1. Acesse: https://vercel.com
2. Faça login com sua conta GitHub
3. Clique em "Add New Project"
4. Importe seu repositório
5. Nas configurações, adicione as variáveis de ambiente:
   - `GITHUB_OWNER` = seu-usuario-github
   - `GITHUB_REPO` = nome-do-repositorio
   - `GITHUB_TOKEN` = seu_token_aqui
   - `LOG_PATH` = logs/visitas.txt (opcional)
6. Clique em "Deploy"

#### Opção B: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Configurar variáveis de ambiente
vercel env add GITHUB_OWNER
vercel env add GITHUB_REPO
vercel env add GITHUB_TOKEN
vercel env add LOG_PATH

# Fazer deploy
vercel --prod
```

### 3. Testar

1. Acesse sua página no Vercel (ex: `https://seu-projeto.vercel.app`)
2. Role até o fim da página
3. Abra o Console do navegador (F12)
4. Você deve ver: `✅ Log salvo no GitHub via Vercel`
5. Verifique o arquivo `logs/visitas.txt` no GitHub

## 🔧 Configuração Local (Opcional)

Para testar localmente:

1. Crie um arquivo `.env.local`:
```
GITHUB_OWNER=seu-usuario-github
GITHUB_REPO=nome-do-repositorio
GITHUB_TOKEN=seu_token_aqui
LOG_PATH=logs/visitas.txt
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
vercel dev
```

4. Acesse: `http://localhost:3000`

## 📁 Estrutura de Arquivos

```
projeto/
├── index.html
├── api/
│   └── save-visit.js (Serverless Function)
├── vercel.json (Configuração do Vercel)
├── .env.example (Exemplo de variáveis)
└── README-VERCEL.md (este arquivo)
```

## 🔒 Segurança

- ✅ Token nunca fica exposto no código
- ✅ Token fica seguro nas variáveis de ambiente do Vercel
- ✅ Requisições passam pela serverless function
- ✅ Sem problemas de CORS

## 🐛 Troubleshooting

### Erro: "Failed to save log"
- Verifique se as variáveis de ambiente estão configuradas no Vercel
- Verifique se o token tem permissão `repo`
- Verifique se o repositório existe

### Erro: "404 Not Found" na API
- Verifique se o arquivo `api/save-visit.js` está na pasta correta
- Verifique se o `vercel.json` está configurado

### Logs não aparecem no GitHub
- Verifique os logs do Vercel em: Dashboard → Functions → Logs
- Verifique se o arquivo `logs/visitas.txt` existe no repositório

## 💡 Dicas

- Use o dashboard do Vercel para ver logs em tempo real
- O Vercel tem um plano gratuito generoso
- Você pode usar webhooks do Vercel para notificações
- O token GitHub pode ser revogado a qualquer momento no GitHub

## 🎉 Pronto!

Agora seus logs serão salvos automaticamente no GitHub sempre que alguém chegar ao fim da página!

