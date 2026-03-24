# WebFixeet

## Purpose

WebFixeet is a web application built for the Fixeet company website.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Runtime**: Node.js >= 20

## Project Structure

```
src/
├── app/                # Next.js App Router pages and layouts
│   ├── __tests__/      # Page-level tests
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Landing page (home)
│   └── globals.css     # Global styles and Tailwind imports
├── components/
│   ├── __tests__/      # Component tests
│   └── ui/             # shadcn/ui components
└── lib/
    └── utils.ts        # Utility functions (cn helper)
```

## Setup

For first-time setup, run the installation script:

```bash
./setup.sh               # Dev setup (default): installs nvm, Node 20, all deps, verifies build
./setup.sh --production   # Production setup: installs nvm, Node 20, production deps, builds
```

## Development

```bash
nvm use              # Use correct Node version
npm run dev          # Start dev server (Turbopack) on port 3001
npm run build        # Production build
npm run lint         # Run ESLint
npm test             # Run tests
```

## Environment Variables

Place environment variables in `.env.local` (not committed to git). Next.js loads this automatically during `npm run dev` and `npm run build`.
