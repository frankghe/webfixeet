# Fixeet Website

Company website for [Fixeet](https://fixeet.com) — professional repair services you can trust.

Built with Next.js, Tailwind CSS, and shadcn/ui.

## Quick Start

```bash
# Install dependencies and set up the dev environment
./setup.sh --dev

# Start the development server
npm run dev
```

The site will be available at `http://localhost:3001`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests (Vitest) |

## Tech Stack

- **[Next.js 16](https://nextjs.org/)** — App Router, React Server Components
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS v4](https://tailwindcss.com/)**
- **[shadcn/ui](https://ui.shadcn.com/)** — UI component library
- **Node.js >= 20**

## Documentation

| Document | Description |
|----------|-------------|
| [docs/project.md](docs/project.md) | Project overview and structure |
| [docs/architecture.md](docs/architecture.md) | Architecture and key decisions |
| [docs/test_strategy.md](docs/test_strategy.md) | Test infrastructure and strategy |
| [docs/production_deployment.md](docs/production_deployment.md) | Deployment guide (OVH VPS + Caddy) |

## Deployment

For production deployment on the OVH VPS:

```bash
./setup.sh --production
```

See [docs/production_deployment.md](docs/production_deployment.md) for the full guide including first-time setup, updates, rollback, and troubleshooting.
