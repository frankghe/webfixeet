# Fixeet Brand Guide

Reference document for graphic designers and developers. All colors, fonts, and visual guidelines for the Fixeet brand.

**Palette chosen after 3 rounds of team votes (Tal, Eric, Frank, Lia) -- Option J2: Gris Clair + Orange Fort + Teal.**

---

## Brand Identity

Fixeet is a professional construction defect and project management app. The brand identity reflects:

- **Reliability** -- Slate/ardoise primary conveys seriousness and trust
- **Energy** -- Orange accent connects to the construction world (safety gear, signage, equipment) and drives action
- **Modern tech** -- Teal secondary adds a contemporary, digital feel that differentiates from old-school construction software
- **Not corporate** -- The palette avoids the generic navy blue of large BTP competitors (Buildertrend, Fieldwire), while still feeling professional

---

## Color Palette

### Primary (Ardoise)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Primary** | `#5A6A74` | 90, 106, 116 | Headings, logo "eet", navigation, app bar |
| **Primary Light** | `#728690` | 114, 134, 144 | Labels, secondary text, form labels |
| **Primary Container** | `#ECF0F4` | 236, 240, 244 | Light backgrounds, chips, badges, dark mode text |

### Accent Principal (Orange)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Accent** | `#E87020` | 232, 112, 32 | CTA buttons, links, logo "Fix", interactive highlights |
| **Accent Bright** | `#FF8C42` | 255, 140, 66 | Hover states, dark mode CTA, gradient endpoint |
| **Accent Container** | `#FFF2E8` | 255, 242, 232 | Light orange backgrounds, notification badges |

### Accent Secondaire (Teal)

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Teal** | `#28A89A` | 40, 168, 154 | Success states, validation, completed tasks |
| **Teal Bright** | `#40BEB2` | 64, 190, 178 | Dark mode success, info badges |

### Surfaces

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Scaffold** | `#FAFBFC` | 250, 251, 252 | Page background |
| **Surface Muted** | `#F2F4F6` | 242, 244, 246 | Input fields, secondary surfaces |
| **Border** | `#D8DEE4` | 216, 222, 228 | Dividers, card borders, input borders |
| **Neutral** | `#8A969E` | 138, 150, 158 | Placeholders, captions, disabled text |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Destructive (Red)** | `#E7000B` | Errors, destructive actions, delete confirmations |
| **Success (Green)** | `#28A89A` | Success states -- uses Teal as success color |
| **Warning (Amber)** | `#DE9300` | Warnings, attention needed |

### Dark Mode

| Name | Hex | Usage |
|------|-----|-------|
| **Dark Background** | `#0E1114` | Page background |
| **Dark Surface** | `#1A2028` | Card / popover surfaces |
| **Dark Text** | `#ECF0F4` | Body text (= Primary Container) |
| **Dark Accent** | `#FF8C42` | Orange CTA (= Accent Bright) |
| **Dark Teal** | `#40BEB2` | Success states (= Teal Bright) |

---

## Color Swatches (Copy-Paste Ready)

**Brand essentials (most important for logo / assets):**

```
Primary Ardoise:   #5A6A74
Primary Light:     #728690
Primary Container: #ECF0F4
Accent Orange:     #E87020
Accent Bright:     #FF8C42
Teal:              #28A89A
Teal Bright:       #40BEB2
Scaffold:          #FAFBFC
Border:            #D8DEE4
```

---

## Typography

| Role | Font | Weight | Source |
|------|------|--------|--------|
| **Body & headings** | Inter | 400, 500, 600, 700 | Google Fonts |
| **Monospace (code, technical)** | System monospace | 400 | OS default |

### Type Scale (Material 3)

| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| Headline Large | 28px | 700 | Page titles |
| Headline Medium | 24px | 600 | Section headers |
| Title Large | 20px | 600 | Card titles, dialog titles |
| Title Medium | 16px | 600 | Sub-section headers |
| Body Large | 16px | 400 | Primary body text |
| Body Medium | 14px | 400 | Secondary text, descriptions |
| Body Small | 12px | 400 | Captions, metadata |
| Label Large | 14px | 600 | Button text, form labels |
| Label Small | 11px | 500 | Chips, badges, small labels |

---

## Design Principles

1. **Three-color system** -- Ardoise for structure, Orange for action, Teal for validation. Each color has a clear role. Never swap roles (e.g., don't use teal for CTA buttons).
2. **Orange = action** -- Orange is reserved for CTAs, links, and interactive elements. It should always feel clickable or important.
3. **Teal = confirmation** -- Teal signals success, completion, or positive status. Use for checkmarks, success messages, completed task indicators.
4. **Cool neutrals** -- Unlike the warm browns of the original palette, the new neutrals lean cool (blue-gray). This makes the orange pop more and feels more modern/tech.
5. **High contrast** -- The accent orange (`#E87020`) maintains WCAG AA contrast ratio (4.5:1) against white backgrounds.
6. **Minimal & professional** -- Clean layouts, generous whitespace, rounded corners (12dp standard), subtle borders.
7. **Trilingual** -- The app supports English, French, and Hebrew (RTL). Logos and assets must work in all directions.

---

## Logo Guidelines

### Logo Structure

The Fixeet logo consists of two parts:
- **Icon**: A house shape with a checkmark inside (represents construction + validation)
- **Text**: "Fix" in accent orange + "eet" in primary ardoise

### Color Variants

| Variant | "Fix" | "eet" | Icon | Use case |
|---------|-------|-------|------|----------|
| **Light background (default)** | `#E87020` | `#5A6A74` | Gradient `#5A6A74` -> `#E87020` | Website, app, documents |
| **Dark background** | `#FF8C42` | `#ECF0F4` | Gradient `#ECF0F4` -> `#FF8C42` | Dark surfaces, hero sections |
| **Monochrome dark** | `#5A6A74` | `#5A6A74` | `#5A6A74` | Letterhead, formal docs |
| **Monochrome light** | `#ECF0F4` | `#ECF0F4` | `#ECF0F4` | Dark background, mono |

### Icon-Only Variants

When using the icon without text (app icon, favicon, small sizes):

| Variant | House | Checkmark | Use case |
|---------|-------|-----------|----------|
| **Gradient (preferred)** | Gradient `#5A6A74` -> `#E87020` | Same gradient | App icon, favicon |
| **Split (alternative)** | `#5A6A74` | `#E87020` | When gradient not possible |
| **Split inverse** | `#E87020` | `#5A6A74` | Alternative split |
| **Solid primary** | `#5A6A74` | `#5A6A74` | Monochrome contexts |
| **Solid accent** | `#E87020` | `#E87020` | High-energy / marketing |

### Clear Space & Sizing

- **Minimum clear space**: Maintain padding equal to the height of the house icon on all sides
- **Minimum size**: Icon must be at least 24x24dp to remain legible
- **Logo with text minimum**: 120px wide to ensure "Fixeet" is readable

### What NOT to Do

- Do not rotate the logo
- Do not stretch or distort proportions
- Do not place on busy/patterned backgrounds without a solid container
- Do not use colors outside the brand palette
- Do not add shadows, outlines, or effects to the logo
- Do not separate the icon from the text in the horizontal logo (use icon-only variant instead)

---

## Gradients

| Name | Colors | Direction | Usage |
|------|--------|-----------|-------|
| **Primary Gradient** | `#5A6A74` -> `#E87020` | Left to right | Logo icon, hero headers |
| **Accent Gradient** | `#E87020` -> `#FF8C42` | Left to right | Progress bars, highlights |
| **Dark Mode Gradient** | `#ECF0F4` -> `#FF8C42` | Left to right | Logo icon on dark |

---

## Component Styling

### Buttons

| Type | Background | Text | Border | Usage |
|------|-----------|------|--------|-------|
| **Primary (filled)** | `#E87020` | `#FFFFFF` | None | Main CTA, submit, save |
| **Secondary (outlined)** | Transparent | `#728690` | `#D8DEE4` | Cancel, secondary actions |
| **Text** | Transparent | `#E87020` | None | Links, tertiary actions |
| **Destructive** | `#E7000B` | `#FFFFFF` | None | Delete, remove |

### Cards

- Background: `#FFFFFF`
- Border: `1px solid #D8DEE4`
- Border radius: `12px`
- Elevation: subtle (1dp)

### Input Fields

- Background: `#F2F4F6` (Surface Muted)
- Border: `1px solid #D8DEE4`
- Border radius: `8px`
- Focus border: `#E87020` (Accent)
- Placeholder text: `#8A969E` (Neutral)

---

## File Delivery Checklist

- [ ] Logo full (icon + text, horizontal) -- SVG + PNG
- [ ] Logo icon only (square) -- SVG + PNG + favicon sizes (16x16, 32x32, 180x180)
- [ ] Logo on dark background variant
- [ ] Monochrome versions (ardoise on light, container on dark)
- [ ] Open Graph image (1200x630) for social sharing
- [ ] Apple touch icon (180x180)
- [ ] Android adaptive icon (108x108 with safe zone)

---

## Existing Logo Files

All logo SVGs are in `assets/logos/`:

| File | Content |
|------|---------|
| `FIXEET-01.svg` | Full logo (icon + text), light background, gradient icon |
| `FIXEET-text.svg` | Text only, light background |
| `FIXEET-icon.svg` | Icon only, light background |
| `FIXEET-01-dark.svg` | Full logo, dark background |
| `FIXEET-text-dark.svg` | Text only, dark background |
| `FIXEET-icon-dark.svg` | Icon only, dark background |

All SVG and PNG files are up to date with the J2 palette. PNG versions (2000px, transparent background) are available for the light variants.

---

## Palette Proposals Archive

The full exploration process (21 initial proposals, 10 tour-2 variants, 3 tour-3 tone variants, final choice) is archived in `docs/palette-proposals/`:

- `propositions-palettes.html` -- Tour 1 (21 proposals)
- `tour-2-votes.html` -- Tour 2 (10 finalist variants)
- `tour-3-tons.html` -- Tour 3 (tone variants on Option J)
- `choix-final-j0-j2.html` -- Final comparison J0 vs J2 (J2 retained)
