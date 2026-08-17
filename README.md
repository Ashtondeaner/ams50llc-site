# AMS50 LLC — Company Website

Marketing website for **AMS50 LLC**, a construction, facility maintenance, and project
management company. Built with [Vite](https://vite.dev/), [React 19](https://react.dev/),
and TypeScript.

## Requirements

- Node.js 22+
- npm 10+

## Getting started

```bash
npm ci        # install exact, locked dependencies
npm run dev   # start the dev server at http://localhost:5173
```

## Available scripts

| Command             | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with hot module replacement.  |
| `npm run build`     | Type-check (`tsc -b`) and build the production bundle.   |
| `npm run preview`   | Preview the production build locally (port 4173).        |
| `npm run lint`      | Lint the codebase with [oxlint](https://oxc.rs/).        |
| `npm run typecheck` | Run the TypeScript compiler in no-emit project mode.     |
| `npm test`          | Run the Vitest unit/interaction test suite once.         |
| `npm run test:watch`| Run Vitest in watch mode.                                |

## Project structure

```
.
├── index.html              # App entry HTML
├── public/                 # Static assets (favicon, etc.)
├── src/
│   ├── components/         # Header, Hero, Services, About, Contact, Footer
│   ├── data.ts            # Site content (services, stats, values)
│   ├── App.tsx            # Page composition
│   ├── main.tsx           # React entry point
│   ├── index.css          # Global styles
│   └── test/setup.ts      # Test environment setup
└── vite.config.ts          # Vite + Vitest configuration
```

## Cloud Agent environment

`.cursor/environment.json` configures the Cursor Cloud Agent environment: it installs
dependencies with `npm ci` and runs the dev server (`npm run dev -- --host`) in a
persistent `dev` terminal, exposing port `5173`.
