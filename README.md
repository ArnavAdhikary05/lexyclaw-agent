# Lexyclaw Agent

Lexyclaw Agent is a Bun + TypeScript workspace for a coding assistant that can operate in multiple modes:

- CLI mode with Ask, Agent, and Plan sub-modes
- Telegram bot mode with `/ask`, `/plan`, and `/agent` commands
- Staged file operations with explicit approval before changes are applied
- Optional web research via Firecrawl
- AI model access through OpenRouter

The app is designed to help you reason about, inspect, plan, and modify a codebase with an LLM while keeping review and approvals in the loop.

## Features

### CLI workflow

Run the main entrypoint and choose a mode from the startup menu:

```bash
bun run index.ts wakeup
```

From there you can select:

- CLI
  - Agent Mode: let the agent perform codebase work
  - Plan Mode: generate and execute a structured plan
  - Ask Mode: answer questions about the repository or external topics
- Telegram
  - starts the Telegram bot flow
- Exit

### Telegram workflow

Configure the Telegram environment variables and start the bot from the wakeup menu. The bot supports:

- `/ask <question>`
- `/plan <goal>`
- `/agent <task>`

All generated code changes are reviewed in an approval flow before being applied.

### Approval and execution model

The agent framework keeps changes staged and pending until the user approves them. It supports:

- reading files and listing directories
- searching code and matching content
- creating, editing, deleting, and creating folders (staged first)
- shell execution queued for later approval
- diff previews before applying changes

## Prerequisites

- [Bun](https://bun.sh)
- an OpenRouter API key
- optional Firecrawl API key for web search/crawl
- optional Telegram bot token and owner ID for Telegram mode

## Setup

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Fill in your real values in `.env`:

```env
OPENROUTER_API_KEY="your_openrouter_key"
OPENROUTER_DEFAULT_MODEL="openrouter/free"
FIRECRAWL_API_KEY="your_firecrawl_key"
TELEGRAM_BOT_TOKEN="your_telegram_bot_token"
TELEGRAM_OWNER_ID="your_telegram_user_id"
```

3. Install dependencies:

```bash
bun install
```

4. Start the app:

```bash
bun run index.ts wakeup
```

## Common commands

Type-check the project:

```bash
bun check
```

Run the CLI startup flow:

```bash
bun run index.ts wakeup
```

## Project structure

```text
.
├── ai/
│   ├── ai.config.ts       # OpenRouter model setup
│   └── index.ts
├── modes/
│   ├── agent/             # file-editing agent logic and approvals
│   ├── ask/               # Q&A workflow
│   ├── cli.ts             # CLI submenu coordinator
│   ├── plan/              # planning and execution logic
│   └── telegram/          # Telegram handlers, plan sessions, approval prompts
├── tui/
│   ├── terminal-md.ts     # Markdown rendering for terminal output
│   └── wakeup.ts          # main menu banner and mode picker
├── todoapp/               # simple browser Todo app demo
├── .env.example           # sample environment values
├── index.ts               # Bun CLI entrypoint
├── package.json
├── tsconfig.json
└── README.md
```

## Notes

- The project uses `@clack/prompts` for interactive terminal UX.
- The AI layer is modeled via the Vercel AI SDK and the OpenRouter provider.
- Telegram mode is protected by `TELEGRAM_OWNER_ID` so only the configured owner can use the bot.
- Web tools are optional: if `FIRECRAWL_API_KEY` is missing, the web research features are disabled.

## Todo app demo

A lightweight front-end example is included under `todoapp/`:

- `index.html`
- `styles.css`
- `script.js`

It is a simple localStorage-backed to-do list app and is separate from the agent workflow.
