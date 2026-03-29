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
│   ├── [locale]/       # Locale-aware routes
│   │   ├── __tests__/  # Page-level tests
│   │   ├── layout.tsx  # Locale layout (html dir/lang, fonts, providers)
│   │   └── page.tsx    # Home page
│   ├── __tests__/      # Root layout tests
│   ├── layout.tsx      # Root layout (passthrough)
│   └── globals.css     # Global styles and Tailwind imports
├── i18n/               # next-intl configuration
│   ├── __tests__/      # i18n config tests
│   ├── routing.ts      # Locale routing config (he, en)
│   ├── request.ts      # Server request config (message loading)
│   └── navigation.ts   # Locale-aware Link, redirect, usePathname, useRouter
├── components/
│   ├── __tests__/      # Component tests
│   ├── ui/             # shadcn/ui components (button, sheet, separator, navigation-menu)
│   ├── header.tsx      # Site header with nav, language switcher, mobile menu
│   └── footer.tsx      # Site footer with nav, legal links, social links
├── lib/
│   └── utils.ts        # Utility functions (cn helper)
├── test/
│   ├── setup.ts        # Vitest setup (jest-dom matchers)
│   └── i18n-helpers.tsx # Test utilities for i18n rendering
└── proxy.ts            # next-intl middleware (locale routing)
messages/
├── he.json             # Hebrew translations (RTL)
└── en.json             # English translations (LTR)
```

## Internationalization (i18n)

The site supports Hebrew (primary, RTL) and English (LTR) via [next-intl](https://next-intl.dev/).

- **Locale routing**: All pages are under `src/app/[locale]/`, with URL prefixes `/he/...` and `/en/...`
- **Default locale**: Hebrew (`he`) — visiting `/` redirects to `/he/`
- **Translation files**: `messages/he.json` and `messages/en.json`
- **RTL/LTR**: The `<html>` element gets `dir="rtl"` or `dir="ltr"` and `lang` attribute based on locale
- **Middleware**: `src/proxy.ts` handles locale detection and routing (named `proxy.ts` per Next.js 16 convention). Excludes `/admin` paths to avoid intercepting the CMS admin panel
- **Navigation helpers**: Use `Link`, `redirect`, `usePathname`, `useRouter` from `@/i18n/navigation` instead of Next.js built-ins for locale-aware navigation
- **Server Components**: Use `getTranslations` from `next-intl/server` (async)
- **Client Components**: Use `useTranslations` from `next-intl` (hook)
- **CSS convention**: Prefer CSS logical properties (e.g., `margin-inline-start` instead of `margin-left`) for RTL/LTR support

## Analytics & CTA Tracking

- **Analytics placeholder**: A marked comment in `src/app/[locale]/layout.tsx` body indicates where to inject analytics scripts
- **CTA tracking**: All outbound CTA elements have `data-track` attributes for future event tracking
- **Convention**: `data-track="<location>-<action>"` (e.g., `header-request-demo`, `hero-learn-more`, `contact-form-submit`)
- **Tracked elements**:
  - `header-request-demo` / `mobile-request-demo` — Header CTA buttons
  - `hero-request-demo` / `hero-learn-more` — Hero section CTAs
  - `audience-learn-more-{segment}` — Audience card links
  - `secondary-request-demo` / `secondary-contact-us` — Bottom CTA section
  - `contact-form-submit` — Contact form submit button
  - `footer-linkedin` — Footer social link

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
