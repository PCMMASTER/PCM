# SQPR Hunter — app (PWA)

Planner completo: Hoje, Tarefas, Rotina, Semana, Casa, Novembro, Vídeos,
Roteiro (com teleprompter), Pesquisa, Checklist e Kit. Funciona offline e
pode ser instalado no iPhone, Android e computador.

## Publicar no GitHub Pages (repositório PCM)
1. No GitHub, abra o repositório **PCM** → **Add file → Upload files**.
2. Arraste a **pasta `sqpr` inteira** (com `index.html`, `manifest.webmanifest`,
   `sw.js` e a pasta `icons`). Confirme em **Commit changes**.
3. Em 1–2 minutos o app fica em:
   https://murilomachado201112-design.github.io/PCM/sqpr/

## Instalar
- **iPhone (Safari):** abra o link → Compartilhar → Adicionar à Tela de Início.
  Use sempre pelo ícone: ele guarda os dados separado do Safari.
- **Android (Chrome):** menu ⋮ → Instalar app / Adicionar à tela inicial.
- **PC (Chrome/Edge):** ícone de instalar na barra de endereço, ou menu → Instalar.

## Dados
Tudo fica salvo no aparelho (sem servidor, sem API). Para levar o plano de um
aparelho para outro: **Kit → Baixar backup** e depois **Restaurar de um backup**
no outro aparelho.

## Atualizar o app
1. Suba o `index.html` novo no lugar do antigo.
2. No `sw.js`, troque `const VERSAO = "sqpr-v1"` para `"sqpr-v2"` (depois v3…).
3. Ao abrir, o app mostra "Nova versão do app disponível → Atualizar".
   Os dados salvos continuam.
