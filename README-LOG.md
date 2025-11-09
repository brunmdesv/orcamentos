# 📊 Sistema de Log de Visitas

Este projeto inclui um sistema que detecta quando usuários chegam ao fim da página e salva essas informações.

## 🔧 Configuração

### Opção 1: Salvar no GitHub (Recomendado para GitHub Pages)

#### Passo 1: Criar Personal Access Token
1. Vá em GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Clique em "Generate new token (classic)"
3. Dê um nome (ex: "Visit Log Token")
4. Marque a permissão `repo` (acesso completo aos repositórios)
5. Clique em "Generate token"
6. **COPIE O TOKEN** (você só verá ele uma vez!)

#### Passo 2: Configurar no código
1. Crie um arquivo `config.js` na raiz do projeto:
```javascript
const GITHUB_TOKEN = 'seu_token_aqui';
```

2. Adicione antes do fechamento do `</body>` no HTML:
```html
<script src="config.js"></script>
```

3. Edite o arquivo `proposta-mercadinho.html` e configure:
```javascript
const GITHUB_OWNER = 'seu-usuario-github';
const GITHUB_REPO = 'nome-do-repositorio';
```

4. **IMPORTANTE**: Adicione `config.js` no `.gitignore` para não expor o token:
```
config.js
```

#### Passo 3: Criar diretório de logs
O diretório `logs/` já foi criado. O arquivo `visitas.txt` será criado automaticamente.

### Opção 2: Usar Webhook (Mais Seguro)

#### Usando Formspree (Gratuito)
1. Acesse https://formspree.io
2. Crie uma conta e um novo formulário
3. Copie a URL do formulário
4. No código HTML, configure:
```javascript
const WEBHOOK_URL = 'https://formspree.io/f/xxxxx';
```

#### Usando n8n (Self-hosted)
1. Configure um webhook no n8n
2. Adicione um passo para salvar em arquivo
3. Use a URL do webhook no código

### Opção 3: Apenas LocalStorage (Mais Simples)

Se você não quiser salvar no servidor, os dados são salvos apenas no navegador do usuário.

Para baixar o log:
1. Abra o Console do navegador (F12)
2. Digite: `downloadLogFile()`
3. O arquivo `visitas-log.txt` será baixado

## 📁 Estrutura de Arquivos

```
projeto/
├── proposta-mercadinho.html
├── config.js (criar manualmente)
├── .gitignore (adicionar config.js)
├── logs/
│   └── visitas.txt (criado automaticamente)
└── README-LOG.md (este arquivo)
```

## 🔒 Segurança

**NUNCA** commite o arquivo `config.js` com o token no GitHub!

Adicione no `.gitignore`:
```
config.js
```

## 📊 Dados Coletados

Cada registro inclui:
- Data e hora da visita
- URL da página
- User Agent (navegador usado)
- Posição do scroll
- Dimensões da tela
- Timestamp ISO

## 🚀 Como Funciona

1. O script detecta quando o usuário rola até o fim da página
2. Os dados são salvos no `localStorage` do navegador
3. Se configurado, os dados são enviados para:
   - GitHub API (salva no repositório)
   - Webhook externo
4. O usuário pode baixar o log completo usando `downloadLogFile()` no console

## 🐛 Troubleshooting

### Erro: "GitHub não configurado"
- Verifique se `GITHUB_OWNER` e `GITHUB_REPO` estão corretos
- Verifique se o token está configurado no `config.js`
- Verifique se o token tem permissão `repo`

### Erro: "401 Unauthorized"
- O token pode estar expirado ou inválido
- Verifique se o token tem a permissão `repo`

### Erro: "404 Not Found"
- Verifique se o caminho `logs/visitas.txt` está correto
- Verifique se o repositório existe e você tem acesso

## 📝 Exemplo de Log

```
=== LOG DE VISITAS - SCROLL ATÉ O FIM ===

Data/Hora: 15/01/2025 14:30:25
URL: https://seu-usuario.github.io/proposta-mercadinho.html
User Agent: Mozilla/5.0...
Scroll: 1250px
Screen: 1920x1080
---

Data/Hora: 15/01/2025 15:45:10
URL: https://seu-usuario.github.io/proposta-mercadinho.html
User Agent: Mozilla/5.0...
Scroll: 1300px
Screen: 1366x768
---
```

## 💡 Dicas

- Para ver os logs em tempo real, abra o Console do navegador (F12)
- Os logs são salvos no `localStorage`, então persistem mesmo fechando o navegador
- Use `downloadLogFile()` no console para baixar todos os logs

