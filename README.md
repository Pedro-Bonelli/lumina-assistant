# Lumina Assistant — aplicação educacional

Aplicação de gestão educacional com interfaces para aluno, professor e gestor. Usa React/TypeScript no cliente, Express/TypeScript no servidor, rotas por perfil e estrutura de dados compartilhada com Drizzle.

## Estrutura

- `client/`: interface React.
- `server/`: API Express.
- `shared/`: esquemas e tipos compartilhados.
- `package.json`: scripts de execução.

## Como executar

Requisitos: Node.js e npm. O script de desenvolvimento define `NODE_ENV` no formato de sistemas Unix; no Windows, execute em WSL/Git Bash com suporte à atribuição de variável ou adapte o comando localmente.

```bash
git clone https://github.com/Pedro-Bonelli/lumina-assistant.git
cd lumina-assistant
npm ci
npm run dev
```

O servidor e funcionalidades de dados podem exigir PostgreSQL e variáveis de ambiente. Consulte `replit.md` e os arquivos de configuração antes de usar o painel completo.

## Observações

A arquitetura e dependências do ambiente original estão descritas em `replit.md`. Banco PostgreSQL e configuração de ambiente podem ser necessários para fluxos persistentes; verifique `server/` antes de integrar serviços externos.
