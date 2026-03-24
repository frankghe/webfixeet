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

A single OVH VPS hosts all services. Caddy handles TLS termination (automatic HTTPS via Let's Encrypt) and routes incoming requests to the appropriate backend service by hostname.

### System Overview

```
                        Internet
                           │
               ┌───────────┴───────────┐
               │  Caddy (TLS, reverse  │
               │        proxy)         │
               └───────────┬───────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ Next.js (:3000)  │ │ Next.js (:3001)  │ │ FastAPI (:8000)  │
│ aigent.com       │ │ fixeet.com       │ │ meetr.aigent.com  │
│ AIgent website   │ │ Fixeet website   │ │ Meetr scheduling  │
│                  │ │ (this project)   │ │ platform          │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

### Services

| Service | Technology | Port | Domain | Purpose |
|---------|------------|------|--------|---------|
| Reverse Proxy | Caddy | 80, 443 | *.fixeet.com, *.aigent.com | TLS termination, domain routing |
| AIgent Website | Next.js (Node.js) | 3000 | aigent.com | AIgent marketing site |
| Fixeet Website | Next.js (Node.js) | 3001 | fixeet.com | Fixeet marketing site (this project) |
| Meetr Platform | FastAPI (Python) | 8000 | meetr.aigent.com | AI meeting scheduling service |

### Caddy Configuration

Caddy provides automatic HTTPS via Let's Encrypt. A minimal Caddyfile block for this project:

```
fixeet.com {
    reverse_proxy localhost:3001
}
```

### Process Management

Services should be managed via systemd (or a comparable process manager) to ensure automatic restart on failure and startup on boot. Each service has its own systemd unit file.

## Domain Strategy

All domains resolve to the same OVH VPS; Caddy routes requests by hostname:

- `aigent.com` — AIgent company website
- `fixeet.com` — Fixeet company website (this project)
- `meetr.aigent.com` — Meetr scheduling platform
