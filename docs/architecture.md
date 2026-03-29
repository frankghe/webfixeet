# Architecture

## Overview

WebFixeet is the Fixeet company website, built with Next.js App Router with server-side rendering and static generation capabilities. It is hosted on an OVH VPS alongside the AIgent website and the Meetr platform, with Caddy serving as the reverse proxy for TLS termination and domain routing.

## Layers

### Presentation Layer
- **Pages**: Next.js App Router pages in `src/app/`
- **Components**: Reusable UI components in `src/components/`
- **Styling**: Tailwind CSS v4 with utility-first approach
- **UI Library**: shadcn/ui components in `src/components/ui/`

### Application Layer
- **Routing**: File-based routing via Next.js App Router
- **Layouts**: Nested layouts in `src/app/layout.tsx`
- **Server Components**: Default rendering strategy (React Server Components)
- **Client Components**: Opt-in with `"use client"` directive for interactive UI

### Utilities
- **`src/lib/utils.ts`**: Shared utilities including `cn()` for Tailwind class merging

## Key Decisions

- **App Router over Pages Router**: Leverages React Server Components for better performance
- **Turbopack**: Used for faster development builds
- **Tailwind CSS v4**: Latest version with CSS-first configuration
- **shadcn/ui**: Copy-paste component library for full customization control

## Deployment Architecture

### Infrastructure

A single OVH VPS hosts all services. A host-level Caddy instance handles TLS termination (automatic HTTPS via Let's Encrypt) and routes incoming requests to the appropriate backend service by hostname. Each project runs in its own Docker stack, with containers binding to `127.0.0.1` so only Caddy can reach them.

### System Overview

```
                            Internet
                               │
                   ┌───────────┴───────────┐
                   │  Caddy (host-level)   │
                   │  TLS + reverse proxy  │
                   │  /etc/caddy/Caddyfile │
                   └───────────┬───────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                     │
          ▼                    ▼                     ▼
┌──────────────────┐ ┌──────────────────┐ ┌────────────────────┐
│ Docker: Next.js  │ │ Docker: Next.js  │ │ Docker: aigent     │
│ 127.0.0.1:3001   │ │ 127.0.0.1:3000   │ │ stack (meetr,      │
│ fixeet.co       │ │ aigent.com       │ │ callr, grafana...) │
│ (this project)   │ │ AIgent website   │ │ 127.0.0.1:8000-8002│
└──────────────────┘ └──────────────────┘ └────────────────────┘
```

### Services

| Service | Technology | Port (host-bound) | Domain | Purpose |
|---------|------------|-------------------|--------|---------|
| Reverse Proxy | Caddy (host) | 80, 443 | all domains | TLS termination, domain routing |
| Fixeet Website | Next.js (Docker) | 127.0.0.1:3001 | fixeet.co | Fixeet marketing site (this project) |
| AIgent Website | Next.js (Docker) | 127.0.0.1:3000 | aigent.com | AIgent marketing site |
| CMS OAuth Proxy | Docker | 127.0.0.1:3003 | cms-auth.fixeet.co | GitHub OAuth for CMS admin |
| Meetr Platform | FastAPI (Docker) | 127.0.0.1:8001 | meetr.aigent.biz, meetr.fixeet.co | AI meeting scheduling service |
| Callr Service | FastAPI (Docker) | 127.0.0.1:8000 | meetr.aigent.biz/callr | Call/messaging service |

### Docker Configuration

WebFixeet uses a multi-stage Dockerfile optimized for Next.js standalone output:

- **Stage 1 (deps)**: Installs npm dependencies
- **Stage 2 (builder)**: Builds the Next.js application
- **Stage 3 (runner)**: Minimal production image with standalone server

Docker Compose (`deploy/docker-compose.prod.yml`) runs the container bound to `127.0.0.1:3001`, accessible only from the host (where Caddy runs).

### Caddy Configuration

A unified host-level Caddyfile (`deploy/Caddyfile`, installed to `/etc/caddy/Caddyfile`) routes all domains on the VPS. Caddy provides automatic HTTPS via Let's Encrypt, security headers, static asset caching, and gzip/zstd compression.

### Process Management

- **Caddy**: Runs as a systemd service (`caddy.service`, installed with the package)
- **WebFixeet**: Runs via Docker Compose with `restart: unless-stopped`
- **AIgent stack**: Runs via its own Docker Compose with `restart: unless-stopped`

## CMS (Blog Content Management)

The site uses [Sveltia CMS](https://github.com/sveltia/sveltia-cms) — a git-based, open-source CMS that runs as a static SPA at `/admin/`. Blog content is stored as markdown files in `content/blog/{locale}/` and committed directly to the git repo.

**Key components:**
- **Admin UI**: `public/admin/index.html` — served by Caddy from the host filesystem (not by Next.js, which doesn't serve `public/` files in standalone mode)
- **CMS Config**: `public/admin/config.yml` — defines the blog collection schema with i18n support (he/en)
- **OAuth Proxy**: Docker service on port 3003, authenticates admin users via GitHub OAuth through `cms-auth.fixeet.co`

See `docs/cms.md` for the full CMS integration plan, implementation phases, and lessons learned from the AIgent deployment.

## Domain Strategy

All domains resolve to the same OVH VPS; the host-level Caddy routes requests by hostname:

- `fixeet.co` — Fixeet company website (this project)
- `aigent.com` — AIgent company website
- `meetr.aigent.biz` / `meetr.fixeet.co` — Meetr scheduling platform
