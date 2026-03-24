# Work Items

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
**status=pending**
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

---

## WI-3: Home Page
**status=pending**
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

---

## WI-4: About Page
**status=pending**
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

---

## WI-5: Contact Page & Form API
**status=pending**
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

---

## WI-6: SEO & Metadata
**status=pending**
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

---

## WI-7: Analytics Placeholders & CTA Tracking Attributes
**status=pending**
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

---

## WI-8: Accessibility Audit & Fixes
**status=pending**
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

---

## WI-9: Performance Optimization
**status=pending**
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
