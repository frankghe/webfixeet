# Test Strategy

## Test Infrastructure

- **Test Runner**: [Vitest](https://vitest.dev/) v4
- **UI Testing**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) with jsdom environment
- **User Interactions**: `@testing-library/user-event` for realistic event simulation
- **Assertions**: Vitest built-in + `@testing-library/jest-dom` matchers

## Configuration

- **Config file**: `vitest.config.ts` at project root
- **Setup file**: `src/test/setup.ts` (loads jest-dom matchers)
- **Path aliases**: `@/` maps to `./src/` (mirrors tsconfig)

## Running Tests

```bash
npm test          # Single run
npm run test:watch # Watch mode
```

## Test Organization

Tests live alongside the code they test, in `__tests__/` directories:

```
src/
  components/
    __tests__/
      header.test.tsx
      footer.test.tsx
    header.tsx
    footer.tsx
  app/
    __tests__/
      page.test.tsx
```

## Test Categories

### Unit Tests
- Utility functions (`src/lib/`)
- Custom hooks (`src/hooks/`)

### Component Tests
- Render and assert DOM output
- Verify navigation links and accessibility attributes
- Test interactive behaviors (mobile menu, form validation)

### Integration Tests
- Page-level rendering with layout components
- Form submission flows
- API route handlers

## Visual Verification (Playwright)

- **Tool**: Playwright with Chromium
- **Config**: `playwright.config.ts`
- **Screenshot script**: `e2e/screenshot.spec.ts`

### Taking Screenshots

```bash
npm run screenshot                                    # Screenshot of /
SCREENSHOT_PATH=/products npm run screenshot           # Screenshot of /products
```

Screenshots are saved to `e2e/screenshots/` as `<page>-<viewport>.png` (desktop and mobile).

### E2E Tests

E2E test files go in `e2e/` with `.spec.ts` extension. Playwright config defines two projects:
- `desktop` — Desktop Chrome (1280x720)
- `mobile` — Pixel 5 (393x851)

The dev server starts automatically if not already running.

## Conventions

- Use `getAllBy*` queries for elements that may be duplicated by React 19 strict mode double-rendering
- Mock `next/link` in component tests to render standard `<a>` tags
- Test accessibility: verify ARIA labels, roles, and keyboard navigation
- Prefer querying by role/label over test IDs
