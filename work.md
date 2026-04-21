# Work Items

## Pricing Strategy: Switch from per-member to per-project pricing

Restructure the pricing page to charge based on active projects instead of team members:

- **Free (Starter):** 1 active project (free)
- **Pro:** 2–10 active projects, ₪50/active project/month
- **Enterprise:** starts from 10 active projects, ₪30/active project/month

### Files to update
- `messages/en.json` — English translations (PricingPage section)
- `messages/he.json` — Hebrew translations (PricingPage section)
- `src/components/pricing/pricing-tiers-section.tsx` — tier definitions, prices, features
- `src/components/pricing/feature-comparison-section.tsx` — comparison table
- `src/components/pricing/enterprise-cta-section.tsx` — enterprise CTA text references "members"
