# Fixeet Website Requirements Specification

**Domain**: fixeet.co
**Version**: 1.0
**Date**: 2026-03-24
**Status**: Approved

---

## 1. Overview

The Fixeet website (fixeet.co) is the public-facing marketing site for Fixeet, a platform for in-field defect management in construction and real estate. It is a static/server-rendered marketing site — entirely separate from the Fixeet application itself — with no authentication and no access to application data.

The website's primary purpose is to attract and convert visitors into leads: inspectors, construction companies, contractors, and apartment owners who will sign up for or request a demo of the Fixeet platform.

The site is built with Next.js and hosted on an OVH VPS at port 3001, behind a Caddy reverse proxy that handles TLS termination and routes `fixeet.co` traffic to the application.

---

## 2. Website Goals & KPIs

Goals are listed in priority order.

### 2.1 Primary — Lead Generation

Convert visitors into actionable leads who can be contacted or onboarded.

| Goal | KPI | Target (initial) |
|------|-----|-----------------|
| Demo requests | Form submissions via "Request Demo" CTA | 5+ per month |
| Contact inquiries | Contact form submissions | 10+ per month |
| Sign-up intent | Clicks on "Get Started" / sign-up CTA | Tracked, baseline TBD |

### 2.2 Secondary — Brand Awareness

Establish Fixeet as a credible, professional solution in the Israeli construction market.

| Goal | KPI |
|------|-----|
| Organic discoverability | Google Search impressions for target keywords |
| Professional credibility | Bounce rate < 60%, avg session duration > 60s |
| Social sharing | Open Graph previews render correctly on LinkedIn, WhatsApp |

### 2.3 Tertiary — App Download Funnel

Direct visitors toward the Fixeet app once it is publicly available.

| Goal | KPI |
|------|-----|
| App store referrals | Clicks on app store links (tracked via UTM) |

### 2.4 Quaternary — Investor / Partner Credibility

Present Fixeet professionally to potential investors and integration partners.

| Goal | KPI |
|------|-----|
| Investor page views | About page views |
| Partner inquiries | Contact form submissions with "other" role |

---

## 3. Target Audiences

### 3.1 Inspectors (Primary — Bottom-Up Market)

**Who they are**: Freelance real estate inspectors and small inspection firms in Israel. They conduct on-site property inspections, recording defects on behalf of apartment buyers.

**Pain points**:
- Entire workflow is manual: handwritten notes on-site, photos taken on a phone, hours spent post-visit transferring photos to a PC and writing PDF reports
- No structured defect tracking — items are missed between the site visit and the report
- Reports are delivered as static PDFs; customers cannot track resolution status

**Value proposition**: Fixeet eliminates post-visit report writing by capturing defects directly on-site with structured entries, photos, and videos. A shareable digital report is generated automatically. Each inspection saves hours of administrative work.

**CTA**: Start a free trial / request demo

---

### 3.2 Construction Companies (Secondary — Top-Down Market)

**Who they are**: Israeli construction companies managing the defect liability period after building handover. Relevant roles include COOs, operations managers, and customer relations managers.

**Pain points**:
- Managers spend significant time managing customer frustration instead of resolving defects
- No structured task list means workers arrive on-site without a complete picture of what needs doing, requiring multiple return visits
- Lack of visibility makes it impossible to prioritize work or communicate reliable schedules to customers
- Chaotic defect management causes crises that cascade and delay work for all customers

**Value proposition**: Fixeet provides a structured, trackable defect lifecycle — from customer report to verified completion. Managers gain full visibility, workers receive clear task lists, customers receive real-time status updates. Operational costs decrease; customer satisfaction improves.

**CTA**: Request a demo / contact sales

---

### 3.3 Contractors

**Who they are**: Subcontractors (electricians, plumbers, etc.) hired by construction companies to carry out specific repair work.

**Pain points**:
- Receive work assignments informally (phone calls, WhatsApp), with incomplete information
- No clarity on the full scope of work for a given visit, leading to return trips
- No structured way to report task completion or flag issues

**Value proposition**: Fixeet gives contractors a clear, structured task list for each visit, with all necessary context (description, photos, location). They can report completion directly in the app, reducing back-and-forth with managers.

**CTA**: Learn how it works / contact us

---

### 3.4 Apartment Owners

**Who they are**: Individuals who have purchased new apartments and are in the defect liability period, waiting for construction companies to fix reported defects.

**Pain points**:
- Must manually track and follow up on every reported defect
- No visibility into whether a defect has been acknowledged, scheduled, or fixed
- Constant need to chase after companies and workers
- Workers arrive and address only part of the reported issues

**Value proposition**: Fixeet gives apartment owners visibility into the status of every reported issue, scheduled visit dates, and real-time completion updates — without chasing anyone.

**CTA**: Learn more / ask your inspector or developer to use Fixeet

---

## 4. Pages & Content Structure

### 4.1 Home Page (`/`)

#### Hero Section
- **Headline**: Primary value proposition — one sentence that communicates what Fixeet does and for whom (e.g., "Manage construction defects without the chaos")
- **Subheadline**: 1–2 sentences expanding on the headline, addressing the core problem
- **Primary CTA**: "Request a Demo" button (links to contact form or dedicated demo request form)
- **Secondary CTA**: "Learn More" anchor link (scrolls to feature section)
- **Visual**: Hero illustration or product screenshot (placeholder initially)

#### Problem Statement Section
Relatable, audience-agnostic description of the current state of defect management in construction:
- Customers chasing workers to track whether issues are scheduled and completed
- Managers spending their time managing customer frustration instead of resolving defects
- Workers arriving on-site without a complete task list, completing a subset, and returning multiple times
- No structured visibility into the full list of outstanding tasks

#### Solution Overview Section
How Fixeet solves the problem:
- One structured platform connecting customers, managers, workers, and contractors
- Every defect is logged, assigned, scheduled, and tracked to verified completion
- All stakeholders have the visibility they need — no more chasing, no more guessing

#### Feature Highlights (3–4 cards with icons)
Each card: icon (Lucide React), feature name, 1–2 sentence description.

| Feature | Description |
|---------|-------------|
| Defect Reporting with Media | Report issues on-site with text, photos, and videos — everything in one place |
| Visit Scheduling | Assign tasks to scheduled visits and notify workers — no more informal coordination |
| Real-Time Status Tracking | Every stakeholder sees the current status of every defect, from report to resolution |
| Multi-Stakeholder Coordination | Customers, managers, workers, and contractors all connected in a single workflow |

#### Audience Value Proposition Cards
One card per target audience segment (inspector, construction company, contractor, apartment owner). Each card:
- Audience label
- One-sentence summary of the benefit
- Link: "Learn more" (anchor to a section or dedicated page — future scope)

#### Social Proof Section
- Testimonial placeholders (3 cards: name, role/company, quote)
- Logo strip placeholder (company logos)
- Note: populated with real content once available

#### Secondary CTA Section
- Short headline encouraging contact
- Two buttons: "Request a Demo" and "Contact Us"

#### Footer
- Logo
- Navigation links: Home, About, Contact
- Legal links: Privacy Policy, Terms of Service (pages TBD, links placeholder)
- Social media links (LinkedIn, placeholder for others)
- Copyright line

---

### 4.2 About Page (`/about`)

#### Company Mission Section
- What Fixeet is and what problem it exists to solve
- Why defect management in construction is broken (problem framing from the company's perspective)

#### Problem Deep-Dive Section
- Expanded description of the pain in the Israeli construction market
- Why existing tools (generic construction management software) do not adequately serve the defect liability period

#### Vision Section
- Where Fixeet is heading: a platform that transforms how defect management works across construction and real estate in Israel, and eventually beyond

#### Team Section
- Placeholder team cards (photo, name, title, short bio)

---

### 4.3 Contact Page (`/contact`)

#### Contact Form
Fields:

| Field | Type | Required |
|-------|------|----------|
| Full Name | Text input | Yes |
| Email | Email input | Yes |
| Phone | Tel input | No |
| Role | Dropdown | Yes |
| Company Name | Text input | No |
| Message | Textarea | Yes |

Role dropdown options: Inspector, Construction Company, Contractor, Property Owner, Investor/Partner, Other

**Submission behavior**:
- Client-side validation (inline errors before submit)
- Server-side API route validates input and sends email via Nodemailer
- On success: inline confirmation message (no page reload required)
- On failure: inline error message with retry option

#### Company Contact Info
- Email address (placeholder)
- Location (Israel — city placeholder)
- Response time expectation (e.g., "We respond within 1 business day")

---

## 5. Shared Components

### 5.1 Header
Present on all pages.

| Element | Details |
|---------|---------|
| Logo | Fixeet logo (SVG, links to home) |
| Navigation | Links: Home, About, Contact |
| Language Switcher | Toggle or dropdown: עברית / English |
| Primary CTA | "Request a Demo" button (visible on desktop; may be in mobile menu) |

### 5.2 Footer
Present on all pages. See Section 4.1 footer description.

### 5.3 Mobile Navigation
- Hamburger menu icon visible on mobile/tablet breakpoints
- Opens a full-width or slide-in navigation drawer
- Contains all navigation links, language switcher, and primary CTA
- Closes on link click or backdrop tap

---

## 6. Internationalization (i18n)

### 6.1 Language Configuration

| Property | Value |
|----------|-------|
| Primary language | Hebrew (`he`) |
| Secondary language | English (`en`) |
| Default | Hebrew |
| URL structure | `/he/...` for Hebrew, `/en/...` for English |
| i18n library | `next-intl` (recommended) |

### 6.2 RTL/LTR Layout

- Hebrew pages render with `dir="rtl"` on the `<html>` element
- English pages render with `dir="ltr"`
- All layout components must support both directions without separate implementations
- CSS logical properties (e.g., `margin-inline-start` instead of `margin-left`) are preferred

### 6.3 Content Translation

- All user-facing strings must be externalized into translation files (e.g., JSON per locale)
- No hardcoded strings in component files
- The language switcher changes locale and redirects to the equivalent page in the selected language

### 6.4 Language Switcher
- Visible in the header on all pages
- Preserves the current page path when switching languages (e.g., `/he/about` ↔ `/en/about`)

---

## 7. Design & UX Requirements

### 7.1 Responsive Design

Mobile-first. Three primary breakpoints:

| Breakpoint | Width | Target devices |
|-----------|-------|---------------|
| Mobile | < 768px | Smartphones |
| Tablet | 768px – 1024px | Tablets, small laptops |
| Desktop | > 1024px | Laptops, desktops |

All pages and components must be fully functional and visually correct at all three breakpoints.

### 7.2 Color Theme

Warm orange/amber primary palette, already configured as CSS custom properties in `src/app/globals.css`. Design must use the established CSS variables — no hardcoded color values.

### 7.3 Typography

- **Sans-serif**: Geist Sans (already configured)
- **Monospace**: Geist Mono (already configured, for code/technical contexts if needed)
- Font sizes follow Tailwind's type scale

### 7.4 UI Components

Use shadcn/ui components wherever appropriate (buttons, inputs, cards, dialogs, navigation menus). Install via `npx shadcn@latest add <component>`. Do not hand-roll components that shadcn/ui provides.

Icons from Lucide React (already a dependency).

### 7.5 Simplicity Principle

Target audience includes non-technical users (apartment owners, field inspectors). Design must:
- Minimize cognitive load: clear hierarchy, generous whitespace, prominent CTAs
- Avoid jargon in all visible text
- Default to showing less information, not more

### 7.6 Accessibility

- WCAG 2.1 AA compliance
- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text
- All interactive elements keyboard-navigable
- Focus states visible
- All images have meaningful `alt` text
- Form fields have associated `<label>` elements

### 7.7 Dark Mode

CSS variables already support dark mode via `@media (prefers-color-scheme: dark)`. All components must respect the dark mode token values — no hardcoded light-mode colors.

---

## 8. Technical Requirements

### 8.1 Framework & Runtime

| Property | Value |
|----------|-------|
| Framework | Next.js 16, App Router |
| Language | TypeScript (strict mode) |
| Runtime | Node.js >= 20 |
| Rendering | React Server Components by default; `"use client"` for interactive components only |
| Build tool | Turbopack (development), standard Next.js build (production) |

### 8.2 SEO

| Requirement | Implementation approach |
|-------------|------------------------|
| Per-page `<title>` and `<meta description>` | Next.js `metadata` export per page |
| Open Graph tags | `og:title`, `og:description`, `og:image`, `og:url` per page |
| Twitter Card tags | `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` |
| Structured data | `Organization` and `WebSite` Schema.org JSON-LD on home page |
| Sitemap | `sitemap.xml` generated via Next.js `sitemap.ts` |
| Robots file | `robots.txt` via Next.js `robots.ts` |
| Canonical URLs | `<link rel="canonical">` on all pages |

### 8.3 Performance

Target Core Web Vitals:

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID / INP (Interaction to Next Paint) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |

Requirements to achieve these targets:
- Images use `next/image` for automatic optimization and lazy loading
- No render-blocking third-party scripts
- Hero image/illustration preloaded
- Fonts preloaded with `font-display: swap`

### 8.4 Contact Form — Server-Side

| Requirement | Details |
|-------------|---------|
| API route | `POST /api/contact` (Next.js Route Handler) |
| Email sending | Nodemailer (already a project dependency) |
| Input validation | Zod schema — server-side, not trust client |
| SMTP config | Via environment variables in `.env.local` |
| Error handling | Return structured JSON error responses; do not expose internal details |
| Spam protection | Honeypot field (hidden input) at minimum; reCAPTCHA v3 as future enhancement |

Required environment variables:

```
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_EMAIL_TO=
```

### 8.5 Analytics

- No analytics in the initial release
- Add a clearly marked placeholder/comment in the root layout for future analytics script injection
- All outbound CTA clicks should have `data-*` attributes or `id`s that make future event tracking straightforward

### 8.6 Security

- No authentication required on the website
- Contact form: validate and sanitize all inputs server-side
- HTTP security headers configured in Caddy (HSTS, X-Frame-Options, CSP) — outside this project's scope, documented here for coordination
- No secrets committed to the repository

### 8.7 Hosting

| Property | Value |
|----------|-------|
| Platform | OVH VPS |
| Port | 3001 |
| Reverse proxy | Caddy (TLS termination, HTTP → HTTPS redirect) |
| Domain | fixeet.co |
| Process management | systemd unit |

---

## 9. Content Requirements

### 9.1 Scope of This Document

This requirements specification defines the structure and intent of all content. Actual copywriting (headlines, body text, feature descriptions) is a separate deliverable. All text in the initial implementation may use placeholder copy that conforms to the specified structure.

### 9.2 Language Versions

All content must exist in both Hebrew and English. Hebrew is the primary language and should be written first; English is a translation.

Content files are organized by locale in the i18n translation directory (e.g., `messages/he.json`, `messages/en.json`).

### 9.3 Brand Assets

| Asset | Status |
|-------|--------|
| Logo (SVG) | TBD — use text placeholder initially |
| Hero illustration / product screenshot | TBD — use placeholder image |
| Team photos | TBD — use placeholder avatars |
| Customer logos (social proof) | TBD — use placeholder boxes |
| Favicon | TBD — use placeholder |

All placeholder images should have correct aspect ratios and dimensions reserved to prevent layout shift (CLS).

### 9.4 Icons

Use Lucide React icons throughout. No additional icon library.

---

## 10. Future Considerations (Out of Initial Scope)

The following are explicitly excluded from the initial release and documented here to inform architectural decisions that should not preclude them.

| Feature | Notes |
|---------|-------|
| Blog / content marketing | Will require a CMS integration or MDX-based blog |
| Pricing page | Dependent on finalized business model |
| FAQ page | Useful once common questions are identified from leads |
| Case studies / success stories | Requires real customer data |
| App store links | When mobile app is publicly released |
| Live chat widget | Integration with a third-party widget (e.g., Crisp, Intercom) |
| CRM integration | Contact form submissions pushed to a CRM |
| reCAPTCHA | Enhancement to basic honeypot spam protection on contact form |
| Dedicated audience landing pages | Separate optimized pages per audience segment (inspector, construction company, etc.) |
| Cookie consent banner | If analytics or tracking is added |
