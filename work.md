
# Requirements

status=completed

Fixeet is a company created to address in-field defect management.
docs/Fixeet.md describes the problem statement, solution, customers, etc.

The purpose of this project is to create the company's website that will be separate from the Fixeet application available on Mobile (Android iOS) and web.

The domain is fixeet.co

This item will review the company's scope and define the requirements for the website, and create a specifications in docs/requirements.md

### Summary

Created `docs/requirements.md` (v1.0) covering:
- **Goals & KPIs**: Lead generation (primary), brand awareness, app download funnel, investor credibility — each with measurable targets
- **Target audiences**: Inspectors, construction companies, contractors, apartment owners — with pain points, value propositions, and CTAs per segment
- **Pages**: Home (hero, problem statement, solution, feature cards, audience cards, social proof, CTA, footer), About (mission, problem, vision, team), Contact (form with role dropdown, Nodemailer integration)
- **Shared components**: Header (logo, nav, language switcher, CTA), footer, mobile hamburger menu
- **i18n**: Hebrew (RTL, primary) + English (LTR), next-intl, `/he/` and `/en/` URL structure, CSS logical properties
- **Design & UX**: Mobile-first, warm orange/amber theme, shadcn/ui, WCAG 2.1 AA, dark mode
- **Technical**: Next.js 16 App Router, SEO (sitemap, robots, Schema.org, OG), Core Web Vitals targets, contact form API route with Zod + Nodemailer, honeypot spam protection
- **Future scope**: Blog, pricing, FAQ, case studies, app store links, chat widget, CRM integration

