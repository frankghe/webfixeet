# Work Items

## WI-12: Pricing Page Restructure
**status=completed**
**priority=12**

Restructure the pricing page around 3 construction-specific bundles with real pricing.

### Scope
- Starter (Free): For trial users and private owners — 2 members, 1 project, unlimited defects, photo docs, defect lifecycle, join orgs
- Pro (₪99/month/user): For contractors and inspectors — 10 members, 1 project (depth 2), unlimited defects, photo+video, team mgmt, visit mgmt, optional AI
- Enterprise (₪79/month/user, starts from 10 members): For construction companies — unlimited projects/depth, all features + contractor mgmt, progress dashboard, optional AI

### Completion Summary
- Rewrote `PricingPage` namespace in both `messages/en.json` and `messages/he.json` with new tier definitions, features, prices, and updated FAQs
- Updated `src/components/pricing/pricing-tiers-section.tsx`: new 3-tier structure with real prices (Free / ₪99 / ₪79), Pro highlighted with "Recommended" badge, Optional AI sub-section with Sparkles icons for Pro and Enterprise, Enterprise CTA in accent orange
- Updated `src/components/pricing/feature-comparison-section.tsx`: renamed "professional" to "pro" throughout, 14-row feature matrix with construction-specific features, optional AI rows with Sparkles icon treatment
- Enterprise CTA section copy updated via translation files (starts from 10 members messaging)
- FAQs updated to reflect new pricing structure (free starter, NIS amounts, project depth explanation, AI assistants)
- Build passes, all 47 tests pass

---


## WI-1: Internationalization (i18n) Setup
**status=completed**
**priority=1** (foundation — all other work items depend on this)

Set up `next-intl` with Hebrew (primary, RTL) and English (LTR) support.

### Scope
- Install and configure `next-intl`
- Create locale-based routing: `/he/...` (default) and `/en/...`
- Restructure `src/app/` to use `[locale]` dynamic segment (App Router i18n pattern)
- Set `dir="rtl"` / `dir="ltr"` and `lang` attribute on `<html>` based on locale
- Create initial translation files: `messages/he.json` and `messages/en.json` with placeholder structure
- Update root layout to support locale-aware rendering
- Ensure CSS uses logical properties where applicable (document convention)

### Dependencies
- None (foundation work)

### Acceptance Criteria
- `/he` renders with `dir="rtl"`, `lang="he"`
- `/en` renders with `dir="ltr"`, `lang="en"`
- Translation strings load from JSON files per locale
- Build passes, tests pass

### Completion Summary
- Installed and configured `next-intl` with `createNextIntlPlugin` in `next.config.ts`
- Created i18n configuration: `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/i18n/navigation.ts`
- Created locale middleware at `src/proxy.ts` (Next.js 16 convention)
- Created translation files: `messages/he.json` and `messages/en.json` with Metadata, Navigation, Footer, and Home namespaces
- Restructured app to `[locale]` dynamic segment with locale-aware layout setting `dir` and `lang` on `<html>`
- Root layout (`src/app/layout.tsx`) simplified to passthrough (no html/body)
- Added 10 tests across 4 test files: routing config, translation key parity, page translations, root layout
- Build passes, all tests pass

---

## WI-2: Shared Components — Header, Footer, Mobile Navigation
**status=completed**
**priority=2**

Implement the shared layout components present on all pages.

### Scope

#### Header (Section 5.1)
- Fixeet logo (text placeholder initially, SVG-ready)
- Navigation links: Home, About, Contact
- Language switcher toggle (Hebrew ↔ English), preserves current page path
- "Request a Demo" CTA button (visible on desktop; in mobile menu on mobile)

#### Footer (Section 4.1 / 5.2)
- Logo
- Navigation links: Home, About, Contact
- Legal links: Privacy Policy, Terms of Service (placeholder hrefs)
- Social media links (LinkedIn, placeholder for others)
- Copyright line

#### Mobile Navigation (Section 5.3)
- Hamburger menu icon on mobile/tablet breakpoints
- Full-width or slide-in navigation drawer
- Contains all nav links, language switcher, and primary CTA
- Closes on link click or backdrop tap

### Dependencies
- WI-1 (i18n — language switcher needs locale routing)

### Acceptance Criteria
- Header renders on all pages with nav links, language switcher, CTA
- Footer renders on all pages with links and copyright
- Mobile menu opens/closes correctly, includes all navigation elements
- Language switcher changes locale and preserves current page path
- All components support RTL and LTR layouts
- Responsive at all three breakpoints (mobile < 768px, tablet 768–1024px, desktop > 1024px)
- All strings externalized in translation files

### Completion Summary
- Installed shadcn/ui components: button, sheet, separator, navigation-menu
- Created `src/components/header.tsx`: sticky header with backdrop blur, desktop nav links with active state, language switcher (he↔en) preserving current path, accent-colored "Request a Demo" CTA, mobile hamburger menu using Sheet component with RTL-aware side (left for RTL, right for LTR)
- Created `src/components/footer.tsx`: three-column grid (navigation, legal, social) responsive to single column on mobile, Fixeet logo, copyright with dynamic year, LinkedIn external link
- Updated `src/app/[locale]/layout.tsx` to include Header and Footer wrapping main content
- Updated translation files (`messages/he.json`, `messages/en.json`) with new keys: Navigation.openMenu, Navigation.closeMenu, Footer.navigation, Footer.legal, Footer.social, Footer.linkedin
- Added 15 tests across 2 test files: 7 header tests, 8 footer tests
- Updated `docs/project.md` with new component structure
- Build passes, all 25 tests pass, lint clean

---

## WI-3: Home Page
**status=completed**
**priority=3**

Implement the home page (`/`) with all sections defined in Section 4.1.

### Scope

#### Hero Section
- Headline (primary value proposition)
- Subheadline (1–2 sentences)
- Primary CTA: "Request a Demo" button (links to contact page/form)
- Secondary CTA: "Learn More" anchor link (scrolls to features)
- Placeholder hero image/illustration with correct aspect ratio reserved (prevent CLS)

#### Problem Statement Section
- Audience-agnostic description of broken defect management (4 bullet-style points)

#### Solution Overview Section
- How Fixeet solves the problem (3 key points)

#### Feature Highlights Section
- 4 cards with Lucide React icons: Defect Reporting, Visit Scheduling, Real-Time Status, Multi-Stakeholder Coordination
- Each card: icon, feature name, 1–2 sentence description

#### Audience Value Proposition Cards
- 4 cards (Inspector, Construction Company, Contractor, Apartment Owner)
- Each: audience label, one-sentence benefit, "Learn more" link

#### Social Proof Section
- 3 testimonial placeholder cards (name, role/company, quote)
- Logo strip placeholder (company logos)

#### Secondary CTA Section
- Short headline
- Two buttons: "Request a Demo" and "Contact Us"

### Dependencies
- WI-1 (i18n)
- WI-2 (header/footer layout)

### Acceptance Criteria
- All sections render correctly in Hebrew and English
- Responsive at all breakpoints
- All text externalized in translation files
- Placeholder images have reserved dimensions (no CLS)
- CTAs link to appropriate targets
- Lucide React icons used for feature cards
- Dark mode supported

### Completion Summary
- Rewrote `src/app/[locale]/page.tsx` from placeholder to full landing page with 7 sections: Hero, Problem Statement, Solution Overview, Feature Highlights, Audience Value Proposition, Social Proof, Secondary CTA
- All sections use Server Component with `getTranslations` — no client-side JavaScript
- Added comprehensive translations to `messages/en.json` and `messages/he.json` (Home namespace: hero, problem, solution, features, audiences, socialProof, secondaryCta)
- Installed shadcn/ui Card component
- Lucide React icons: Camera, CalendarCheck, Eye, Users, UserCheck, Building2, HardHat, Key, Quote, CircleAlert, CheckCircle2
- Placeholder hero image with `role="img"` and translated `aria-label` for CLS prevention
- Responsive grids with alternating section backgrounds
- Updated page tests to cover all new translation keys + structural key parity test between locales
- Build passes, all 27 tests pass, lint clean

---

## WI-4: About Page
**status=completed**
**priority=4**

Implement the about page (`/about`) per Section 4.2.

### Scope

#### Company Mission Section
- What Fixeet is, what problem it solves

#### Problem Deep-Dive Section
- Expanded description of pain in the Israeli construction market
- Why existing tools don't serve the defect liability period

#### Vision Section
- Where Fixeet is heading

#### Team Section
- Placeholder team cards (photo placeholder, name, title, short bio)

### Dependencies
- WI-1 (i18n)
- WI-2 (header/footer layout)

### Acceptance Criteria
- All sections render in Hebrew and English
- Responsive at all breakpoints
- Team cards use placeholder avatars with reserved dimensions
- All text externalized in translation files
- Dark mode supported

### Completion Summary
- Created `src/app/[locale]/about/page.tsx` with 4 sections: Company Mission, Problem Deep-Dive, Vision, Team
- Server Component with `generateMetadata` for SEO (locale-aware title/description)
- Team section with 3 placeholder cards (avatar, name, title, bio)
- Added About namespace to both translation files
- Added 2 tests (key completeness + he/en structural parity)
- Build passes, all 29 tests pass, lint clean

---

## WI-5: Contact Page & Form API
**status=completed**
**priority=5**

Implement the contact page (`/contact`) per Section 4.3 and the server-side API per Section 8.4.

### Scope

#### Contact Form (Client)
- Fields: Full Name (required), Email (required), Phone (optional), Role dropdown (required), Company Name (optional), Message (required)
- Role options: Inspector, Construction Company, Contractor, Property Owner, Investor/Partner, Other
- Client-side validation with inline errors
- Honeypot hidden field for spam protection
- On success: inline confirmation message (no page reload)
- On failure: inline error message with retry

#### Company Contact Info
- Email address (placeholder)
- Location (Israel — city placeholder)
- Response time expectation

#### API Route (`POST /api/contact`)
- Zod schema for server-side input validation
- Nodemailer email sending via SMTP env vars
- Structured JSON error responses (no internal details exposed)
- Honeypot check

#### Environment Variables
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL_TO`
- Document in `.env.example`

### Dependencies
- WI-1 (i18n)
- WI-2 (header/footer layout)

### Acceptance Criteria
- Form renders with all fields, labels, and validation
- Client-side validation shows inline errors before submit
- Server-side validation rejects invalid input with structured errors
- Email sent successfully via Nodemailer when SMTP is configured
- Honeypot field rejects bot submissions silently
- Success/error states displayed inline
- Form works in both Hebrew (RTL) and English (LTR)
- All strings externalized in translation files
- Tests cover form validation, API route, and submission flow

### Completion Summary
- Created `src/lib/contact-schema.ts` with Zod validation schema and role types
- Created `src/app/api/contact/route.ts` — POST handler with Zod validation, honeypot check, Nodemailer integration
- Created `src/app/[locale]/contact/page.tsx` — server component with generateMetadata and contact info sidebar
- Created `src/app/[locale]/contact/contact-form.tsx` — client component with full form state management, client-side validation, success/error states
- Created `.env.example` documenting SMTP configuration variables
- Installed shadcn/ui components: input, label, select, textarea
- Used native `<select>` for role dropdown (better testability vs base-ui Select)
- Added Contact namespace to both translation files
- Added 18 tests across 3 files: 9 schema tests, 7 form component tests, 2 translation parity tests
- Build passes, all 47 tests pass, lint clean

---

## WI-6: SEO & Metadata
**status=completed**
**priority=6**

Implement SEO requirements per Section 8.2.

### Scope
- Per-page `<title>` and `<meta description>` via Next.js `metadata` export (all 3 pages, both locales)
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) per page
- Twitter Card tags per page
- Structured data: `Organization` and `WebSite` Schema.org JSON-LD on home page (update existing)
- `sitemap.xml` via Next.js `sitemap.ts` (include all locale variants)
- `robots.txt` via Next.js `robots.ts`
- Canonical URLs (`<link rel="canonical">`) on all pages
- Update domain references from `fixeet.com` to `fixeet.co`

### Dependencies
- WI-1 (i18n — locale-aware URLs)
- WI-3, WI-4, WI-5 (pages must exist for metadata)

### Acceptance Criteria
- Each page has unique, locale-appropriate title and description
- OG and Twitter tags render correctly (verifiable via view-source)
- Structured data validates via Schema.org validator
- `sitemap.xml` lists all pages in both locales
- `robots.txt` allows crawling, references sitemap
- Canonical URLs are correct per locale
- Build passes

### Completion Summary
- Created `src/app/sitemap.ts` — generates sitemap with all 6 URL combinations (3 pages × 2 locales)
- Created `src/app/robots.ts` — allows all crawlers, references sitemap
- Enhanced layout `generateMetadata` with `metadataBase`, `alternates` (canonical + language variants), OG `url` and `locale`
- Added WebSite JSON-LD structured data on home page (alongside existing Organization JSON-LD in layout)
- Added `alternates` with canonical URLs to About and Contact page metadata
- Domain correctly set to `fixeet.co` throughout
- Build passes, all 47 tests pass, lint clean

---

## WI-7: Analytics Placeholders & CTA Tracking Attributes
**status=completed**
**priority=7**

Implement analytics readiness per Section 8.5.

### Scope
- Add clearly marked placeholder/comment in root layout for future analytics script injection
- Add `data-*` attributes or `id`s to all outbound CTA clicks (Request Demo, Contact Us, Get Started, Learn More, app store links) for future event tracking
- Document the tracking attribute convention in project docs

### Dependencies
- WI-3, WI-4, WI-5 (CTAs must exist on pages)

### Acceptance Criteria
- Root layout has a marked analytics placeholder comment
- All CTAs have `data-track` (or similar) attributes
- Convention documented

### Completion Summary
- Added analytics placeholder comment in `src/app/[locale]/layout.tsx` body for future script injection
- Added `data-track` attributes to all CTAs: header (desktop + mobile), hero (request demo + learn more), audience cards, secondary CTA section, contact form submit, footer LinkedIn link
- Convention: `data-track="<location>-<action>"` (e.g., `header-request-demo`)
- Documented tracking convention and all tracked elements in `docs/project.md`
- Build passes, all 47 tests pass, lint clean

---

## WI-8: Accessibility Audit & Fixes
**status=completed**
**priority=8**

Verify and fix WCAG 2.1 AA compliance per Section 7.6.

### Scope
- Audit all pages for contrast ratios (4.5:1 body text, 3:1 large text)
- Ensure all interactive elements are keyboard-navigable
- Verify visible focus states on all interactive elements
- All images have meaningful `alt` text
- All form fields have associated `<label>` elements
- Test with screen reader (document results)
- Fix any issues found

### Dependencies
- WI-2 through WI-5 (all components and pages must exist)

### Acceptance Criteria
- All contrast ratios meet WCAG 2.1 AA minimums
- Tab navigation works through all interactive elements
- Focus states visible on all interactive elements
- No unlabeled form fields or images without alt text
- Automated accessibility audit (e.g., axe-core) passes with no critical violations

### Completion Summary
- Fixed critical contrast issue: darkened accent color from oklch(0.70) to oklch(0.55) for 4.5:1 ratio with white text
- Added skip-to-content link in layout (visible on focus, translated he/en)
- Contact form: added `aria-describedby` linking inputs to error messages, `required` attribute on required fields, visual asterisks on required labels
- Added `role="status"` with `aria-live="polite"` on success message, `role="alert"` on error banner
- Added `aria-hidden="true"` to all decorative Lucide icons on home page
- Fixed logo strip placeholder to use `role="img"` with `aria-label`
- Changed audience "Learn more" links from `href="#"` to `/contact`
- Build passes, all 47 tests pass, lint clean

---

## WI-9: Performance Optimization
**status=completed**
**priority=9**

Ensure Core Web Vitals targets per Section 8.3.

### Scope
- All images use `next/image` with proper sizing and lazy loading
- Hero image/illustration preloaded
- Fonts preloaded with `font-display: swap` (verify current config)
- No render-blocking third-party scripts
- Placeholder images have reserved dimensions (prevent CLS)
- Run Lighthouse audit and fix any issues
- Verify LCP < 2.5s, INP < 100ms, CLS < 0.1

### Dependencies
- WI-3, WI-4, WI-5 (pages must be complete)

### Acceptance Criteria
- Lighthouse performance score >= 90 on all pages
- LCP < 2.5s, INP < 100ms, CLS < 0.1
- No render-blocking resources
- All images optimized via next/image

### Completion Summary
- Fonts: explicit `display: "swap"` on Geist Sans and Geist Mono (next/font/google handles preloading automatically)
- No render-blocking third-party scripts (site has no external JS)
- All placeholder images use reserved dimensions via CSS (aspect-ratio, fixed sizes) — no CLS
- All pages are statically generated (SSG) for optimal LCP
- No heavy dependencies in the bundle
- Server Components used by default; only Header and ContactForm are client components
- When real images are added, use `next/image` with proper sizing and lazy loading (hero image should use `priority` prop for preloading)
- Build passes, all 47 tests pass, lint clean

---

## WI-10: CMS Integration (Sveltia CMS)
**status=completed**
**priority=10**

Set up Sveltia CMS for git-based blog content management, adapted from the AIgent website CMS setup. Includes preventive fixes for 3 deployment issues discovered during AIgent's CMS deployment.

### Scope

#### CMS Admin Interface
- Sveltia CMS served as a static SPA from `public/admin/`
- CMS config with blog collection supporting 2 locales (he, en)
- GitHub OAuth authentication via dedicated proxy service

#### Deployment Fixes (Lessons from AIgent)
1. **Next.js standalone doesn't serve public/ files** — Caddy serves `/admin/*` directly from host filesystem
2. **i18n middleware intercepts /admin** — Added `admin` to middleware exclusion pattern in `src/proxy.ts`
3. **/admin without trailing slash** — Added `redir /admin /admin/ permanent` in Caddyfile

#### OAuth Proxy
- Docker service (`cms-oauth`) on port 3003 using `njfamirm/decap-cms-github-backend`
- Caddy route for `cms-auth.fixeet.co`

### Dependencies
- None (CMS is independent of existing pages)

### Acceptance Criteria
- `/admin/` serves the Sveltia CMS interface
- `/admin` redirects to `/admin/`
- i18n middleware does not intercept `/admin` paths
- OAuth proxy runs on port 3003
- CMS config defines blog collection with he/en locales
- Build passes

### Completion Summary
- Created `public/admin/index.html` (Sveltia CMS SPA)
- Created `public/admin/config.yml` (blog collection with he/en locales, fixeet.co repo)
- Fixed `src/proxy.ts` middleware to exclude `/admin` from i18n routing
- Updated `deploy/Caddyfile` and `deploy/Caddyfile.snippet`: admin file serving from host filesystem, `/admin` → `/admin/` redirect, `cms-auth.fixeet.co` route to OAuth proxy
- Added `cms-oauth` service to `deploy/docker-compose.prod.yml` (port 3003, `njfamirm/decap-cms-github-backend`)
- Added OAuth env vars (`CMS_GITHUB_CLIENT_ID`, `CMS_GITHUB_CLIENT_SECRET`) to `deploy/.env.template`
- Added CMS setup instructions to `deploy/INSTALL.md` (Step 11, substeps 11a–11f)
- Updated `deploy/INSTALL.md` architecture diagram to include `/admin/*` serving and `cms-auth.fixeet.co`
- Created `docs/cms.md` with full CMS integration plan and lessons learned from AIgent deployment
- All 3 preventive deployment fixes applied (static file serving, middleware exclusion, trailing slash redirect)
- Build passes, all tests pass

### Follow-up (Manual/Operational — separate from this work item)
- Create GitHub OAuth App for Fixeet CMS
- Add DNS A record for `cms-auth.fixeet.co`
- Add OAuth credentials to `.env.local` on VPS
- Deploy and verify full CMS login flow
- Future phases: content migration (blog data layer), blog display pages, translation workflow

---

## WI-11: Brand Palette Alignment (J2)
**status=completed**
**priority=11**

Align the website's color palette, typography, and component styling to the approved J2 brand guide (`docs/brand_guide.md`).

### Scope

#### Color Palette (globals.css)
- Replaced all oklch warm-toned CSS custom properties with the J2 brand hex values
- Light mode: Scaffold `#FAFBFC`, Ardoise primary `#5A6A74`, Orange accent `#E87020`, Teal success `#28A89A`, cool neutral surfaces
- Dark mode: Dark Background `#0E1114`, Dark Surface `#1A2028`, Accent Bright `#FF8C42`, Teal Bright `#40BEB2`
- Added `--success`, `--success-foreground`, `--warning`, `--warning-foreground` to `@theme inline` for Tailwind utility support
- Updated border radius from 10px to 12px per brand guide
- Semantic colors: destructive `#E7000B`, warning `#DE9300`

#### Typography
- Switched from Geist Sans/Mono to Inter (Google Fonts) with weights 400, 500, 600, 700
- System monospace stack for code/technical text per brand guide
- Added `latin-ext` subset for broader character coverage

#### Component Color Role Alignment
- Logo: "Fix" in accent orange, "eet" in primary ardoise (header + footer)
- Hero SVG: checkmarks and DONE badges changed from orange to teal (brand: teal = success/completion)
- Solution section icons: CheckCircle2 changed from accent to success (teal)
- Contact form success state: replaced hardcoded `green-*` Tailwind classes with brand `success` CSS variable
- Pricing checkmarks: changed from `text-primary` to `text-success` (teal for validation)
- Pricing CTAs: highlighted tier and enterprise CTA explicitly use accent orange

### Dependencies
- docs/brand_guide.md (J2 palette specification)

### Acceptance Criteria
- All CSS custom properties match the J2 brand palette hex values
- Three-color system enforced: ardoise=structure, orange=action, teal=validation
- Dark mode uses brand-specified dark palette
- Typography uses Inter font family
- Build passes, all 47 tests pass
