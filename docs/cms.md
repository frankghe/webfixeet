# CMS Integration Plan for Fixeet Blog

| Field | Value |
|-------|-------|
| Last Updated | 2026-03-29 |
| Project | WebFixeet (fixeet.co) |
| Repository | frankghe/webfixeet |
| Status | Phase 2 (CMS Admin) completed; Phases 3-5 pending |

## Goal

Add a blog to fixeet.co with a headless CMS system that allows non-technical team members to create, edit, and publish blog posts in both Hebrew and English. The blog content will be translated using OpenAI's API (hybrid translation strategy) and seamlessly integrated into the Next.js website.

## Current State

- **Website**: Live at fixeet.co with Next.js App Router, fully i18n-enabled (Hebrew primary, English secondary)
- **Blog**: Does not exist yet (greenfield)
- **Content folder**: Will be `content/blog/{he,en}/` for structured content
- **CMS admin interface**: Will be served at `/admin` (standalone SPA, built separately)

## CMS Options Evaluated

### 1. Decap CMS (Recommended for Git-based workflows)

**Pros:**
- Git-native workflow (commits changes directly to git)
- No backend required; content stored in repository
- Excellent for teams using git workflows
- Customizable UI and field types

**Cons:**
- Requires authentication layer (OAuth or similar)
- Learning curve for non-technical users
- Git history can get noisy with frequent edits

**Verdict:** Good for developer-led content; less ideal for non-technical editors.

### 2. Sveltia CMS (Decap fork, Recommended Choice)

**Pros:**
- Modern UI/UX built on Svelte (cleaner than Decap)
- Git-based (commits to repository)
- OAuth2 support with custom proxy
- Lightweight and performant
- Excellent RTL support (critical for Hebrew)
- Can run as standalone SPA (no backend required)
- Lower barrier to entry for non-technical users

**Cons:**
- Smaller community than Decap
- Fewer plugins/integrations

**Verdict:** **CHOSEN** — Best balance of simplicity, RTL support, and non-technical user experience.

### 3. TinaCMS (Headless CMS option)

**Pros:**
- Full headless CMS (content not stored in git)
- Visual editing experience
- Real-time collaboration
- API-driven (flexible content structure)

**Cons:**
- Backend service required (paid or self-hosted)
- Higher complexity than git-based solutions
- Overkill for a small team and single blog

**Verdict:** Rejected — Too complex for current needs; cost-prohibitive.

## Decision: Sveltia CMS

Sveltia CMS is chosen for the following reasons:

1. **RTL support**: Critical for Hebrew content
2. **Git-based**: Content stored in the repository; no external service required
3. **Non-technical friendly**: Modern UI significantly lowers barrier to entry
4. **OAuth2 integration**: Securely restricts access to team members
5. **Lightweight**: No backend required; runs as a static SPA
6. **Cost**: Free and open-source

### Architecture Overview

```
Sveltia CMS (SPA at /admin)
        ↓
   OAuth Proxy
   (cms-auth.fixeet.co:3003)
        ↓
GitHub OAuth
   & Git API
        ↓
Repository
(frankghe/webfixeet)
        ↓
content/blog/{he,en}/
```

## Translation Strategy: Hybrid (OpenAI)

Blog content will be managed using a hybrid translation approach:

### Translation Workflow

1. **English blog post authored** in Sveltia CMS (`/en/blog/post-slug.md`)
2. **Hebrew translation requested** via `/api/translate` endpoint (internal tool)
3. **OpenAI translates** (GPT-4 or Claude API) with context awareness
4. **Translator reviews** the Hebrew output
5. **Translator commits** the Hebrew post to the repository

### Why Hybrid?

- **Machine translation** is fast and cost-effective for technical/marketing content
- **Human review** ensures cultural nuance and accuracy for client-facing content
- **Scalable**: Team can publish more frequently without hiring full-time translators

### API Endpoint

```
POST /api/translate
Content-Type: application/json

{
  "sourceLocale": "en",
  "targetLocale": "he",
  "markdown": "# Blog Post Title\n\nContent here...",
  "context": "Construction defect management blog post"
}

Response:
{
  "translatedMarkdown": "# כותרת הפוסט\n\nתוכן כאן..."
}
```

## Implementation Plan: 5 Phases

### Phase 1: Setup & Tooling (Completed before CMS)

**Deliverables:**
- Blog content folder structure (`content/blog/{he,en}/`)
- Markdown parsing library (next-mdx or gray-matter)
- Blog post data model (frontmatter schema)
- Translation API endpoint (`/api/translate`)

**Timeline:** 1-2 weeks

---

### Phase 2: CMS Admin Interface (Completed)

**Deliverables:**
- Deploy Sveltia CMS as standalone SPA at `/admin`
- Configure OAuth2 proxy (`cms-auth.fixeet.co:3003`)
- Set up collections for blog posts (Hebrew, English)
- Create Sveltia config (`public/admin/config.yml`)
- Verify Git commit workflow

**Timeline:** 1-2 weeks

---

### Phase 3: Blog Post Display (Pending)

**Deliverables:**
- Create `/[locale]/blog` page (list view)
- Create `/[locale]/blog/[slug]` page (single post view)
- Markdown rendering with syntax highlighting
- Meta tags and OG images for SEO
- Pagination or infinite scroll

**Timeline:** 1 week

**Dependencies:**
- Phase 1 (content folder + parsing)
- Phase 2 (CMS admin for content creation)

---

### Phase 4: Content Management Features (Pending)

**Deliverables:**
- Tags/categories for blog posts (Construction, PropTech, Defect Management, Industry Insights)
- Search functionality (across posts)
- Related posts (by tags)
- RSS feed

**Timeline:** 1-2 weeks

**Dependencies:**
- Phase 3 (blog pages)

---

### Phase 5: Launch & Operations (Pending)

**Deliverables:**
- Documentation for team on using Sveltia CMS
- Backup strategy for content (GitHub is the source of truth)
- Monitoring for translation errors
- Analytics tracking for blog posts

**Timeline:** 1 week

**Dependencies:**
- Phases 1-4 complete

---

## Lessons Learned from AIgent Deployment

The AIgent website (aigent.com) deployed a similar CMS setup (Sveltia + blog). Three critical issues were encountered and resolved. Learning from these mistakes now will prevent the same issues on webfixeet.

### Issue 1: Next.js Standalone Mode Doesn't Serve Public Files

**Problem:**
Next.js standalone mode (`output: "standalone"`) creates a production-optimized bundle that runs as `node .next/standalone/server.js`. This mode only handles Next.js routes; it **does not serve static files** from the `public/` directory.

On AIgent, Sveltia CMS was deployed as a static SPA at `/admin/index.html`. The file existed in the container (`/app/public/admin/index.html`), but when requests came to `GET /admin/`, the Next.js server returned 404 because `/admin` was not a defined route.

**Error:**
```
404 Not Found
GET /admin HTTP/1.1
(Next.js standalone has no route handler for /admin)
```

**Root Cause:**
- Docker image contains `/app/public/admin/index.html`
- Next.js standalone server does not serve `/public` files
- Only Caddy reverse proxy can serve static files

**Fix Applied:**
Caddy was configured to serve `/admin/*` directly from the host filesystem instead of proxying to Next.js:

```caddyfile
# Caddy config at /etc/caddy/Caddyfile

aigent.com {
    # Serve /admin/* from public/admin on the host
    handle_path /admin/* {
        root * /opt/aigent/public/admin
        file_server
    }

    # All other paths: proxy to Next.js
    reverse_proxy 127.0.0.1:3000
}
```

**On webfixeet:**
Apply the same pattern. Caddy will serve `/admin` from the host filesystem:

```caddyfile
fixeet.co {
    # Serve /admin/* from public/admin on the host
    handle_path /admin/* {
        root * /opt/webfixeet/public/admin
        file_server
    }

    # All other paths: proxy to Next.js
    reverse_proxy 127.0.0.1:3001
}
```

**Key Takeaway:** When using Next.js standalone mode, static files must be served by the reverse proxy (Caddy), not by Next.js itself. Ensure the `/public` folder is mounted/accessible on the host.

---

### Issue 2: i18n Middleware Intercepts /admin Routes

**Problem:**
The next-intl middleware (in `src/proxy.ts`) matches **all paths without file extensions** and redirects them to locale-prefixed routes. This was intended to route `/` → `/he/` and `/about` → `/he/about`, but it also matched `/admin` → `/he/admin`, which doesn't exist as a route.

**Error:**
```
404 Not Found
GET /admin → 307 Redirect to /he/admin (via middleware)
GET /he/admin → 404 (route doesn't exist)
```

**Root Cause:**
The middleware pattern in `src/proxy.ts` was:

```typescript
matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)',]
// This matches: /admin (no extension, no excluded prefix)
```

**Fix Applied:**
Added `admin` to the middleware exclusion pattern:

```typescript
// src/proxy.ts
matcher: [
  '/((?!api|trpc|_next|_vercel|admin|.*\\..*).*)',
  //                        ^^^^^ Added
]
```

This tells the middleware: "Don't intercept paths starting with `/admin`; let them pass through."

**On webfixeet:**
Ensure `/src/proxy.ts` has `admin` in the exclusion pattern. Verify by checking the file:

```bash
grep -n "matcher" src/proxy.ts
# Should show: admin in the pattern
```

**Key Takeaway:** When adding CMS admin routes, exclude them from i18n middleware to prevent unintended locale redirects.

---

### Issue 3: /admin Without Trailing Slash Not Handled by Caddy

**Problem:**
Caddy's `handle_path /admin/*` only matches paths **under** `/admin/`, not `/admin` itself. When a user visits `https://fixeet.co/admin` (no trailing slash), the request doesn't match the `handle_path` directive and falls through to the default reverse proxy handler, which proxies to Next.js (which has no route for `/admin`) → 502 Bad Gateway.

**Error:**
```
502 Bad Gateway
GET /admin (no trailing slash)
→ Falls through (doesn't match handle_path /admin/*)
→ Proxies to Next.js
→ Next.js has no route for /admin
→ 502 error
```

**Fix Applied:**
Added a permanent redirect from `/admin` → `/admin/` before the `handle_path` directive:

```caddyfile
fixeet.co {
    # Redirect /admin to /admin/
    redir /admin /admin/ permanent

    # Serve /admin/* from public/admin on the host
    handle_path /admin/* {
        root * /opt/webfixeet/public/admin
        file_server
    }

    # All other paths: proxy to Next.js
    reverse_proxy 127.0.0.1:3001
}
```

Now:
- `GET /admin` → 301 redirect to `/admin/`
- `GET /admin/` → Served from `/opt/webfixeet/public/admin/index.html`

**On webfixeet:**
Include this redirect in the Caddyfile from day one.

**Key Takeaway:** Always add a redirect from the base path to the trailing slash version for Caddy's `handle_path` to work correctly.

---

## Migration Checklist

Before going live with the blog:

- [ ] **Phase 1**: Content folder created, markdown parsing library installed
- [ ] **Phase 1**: Translation API endpoint deployed and tested
- [ ] **Phase 2**: Sveltia CMS deployed at `/admin`
- [ ] **Phase 2**: OAuth2 proxy running on `cms-auth.fixeet.co:3003`
- [ ] **Phase 2**: Team members can log in and create posts
- [ ] **Phase 2**: Git commits are working (posts saved to repo)
- [ ] **Caddy config**: `/admin` routes configured (including redirect from `/admin` → `/admin/`)
- [ ] **i18n middleware**: `admin` added to exclusion pattern in `src/proxy.ts`
- [ ] **Phase 3**: Blog post pages render correctly
- [ ] **Phase 3**: Meta tags and OG images display in social shares
- [ ] **Phase 4**: Tags and search working
- [ ] **Phase 5**: Team documentation created
- [ ] **Phase 5**: Monitoring set up for API errors
- [ ] **Verification**: Test blog workflow end-to-end (create post → publish → view on site)

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| OAuth token expiration | Users locked out of `/admin` | Implement token refresh in OAuth proxy |
| GitHub API rate limits | Slow CMS performance during editing | Implement caching; consider GitHub Enterprise if needed |
| Accidental deletion of posts | Data loss | GitHub is the single source of truth; can recover from commit history |
| Translation quality | Poor customer experience | Human review step required before publication |
| SEO issues | Low discoverability | Proper meta tags, sitemap, schema markup |
| Performance (large blog) | Slow page loads | Implement pagination, code splitting, ISR for blog pages |
| Markdown parsing errors | Broken pages | Validate markdown in CI/CD (Phase 3) |

## Dependencies to Install

### Development

Already in `package.json` or to be added:

```bash
npm install next-intl @sveltia/cms gray-matter remark remark-html
npm install --save-dev typescript
```

### OAuth Proxy

A separate service at `cms-auth.fixeet.co:3003` (can reuse AIgent's proxy or deploy new instance):

```
https://github.com/frankghe/cms-oauth-proxy
```

### Docker

Ensure `Dockerfile` includes `public/admin/` in the builder stage (already fixed in webfixeet as of commit f15268d):

```dockerfile
# Copy public directory (ensures admin/ exists)
COPY public ./public
```

## References

- [Sveltia CMS Documentation](https://sveltia.dev/)
- [Next.js i18n Routing](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [next-intl Documentation](https://next-intl.dev/)
- [Caddy Reverse Proxy](https://caddyserver.com/docs/caddyfile)
- [GitHub OAuth Flow](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)
- [OpenAI Translation API](https://platform.openai.com/docs/api-reference)
- [Gray Matter (markdown parsing)](https://github.com/jonschlinkert/gray-matter)

## Implementation Status

| Phase | Status | Notes |
|-------|--------|-------|
| **Phase 1** | Not Started | Content folder structure, markdown parsing, translation API |
| **Phase 2** | Completed | Sveltia CMS deployed at `/admin`, OAuth proxy configured |
| **Phase 3** | Pending | Blog post pages (`/blog`, `/blog/[slug]`), rendering, SEO |
| **Phase 4** | Pending | Tags, search, related posts, RSS feed |
| **Phase 5** | Pending | Launch documentation, monitoring, team training |

### Phase 2 Completion Summary

Sveltia CMS is now running at `/admin` with OAuth2 authentication via `cms-auth.fixeet.co:3003`. The admin interface is properly served by Caddy (not proxied through Next.js), and the i18n middleware does not intercept `/admin` routes. Team members can log in and interact with the CMS interface.

**Key fixes applied to deployment:**
- Caddy serves `/admin/*` from host filesystem (`/opt/webfixeet/public/admin`)
- Redirect from `/admin` → `/admin/` added to Caddyfile
- `admin` added to i18n middleware exclusion pattern in `src/proxy.ts`
- Dockerfile builder stage ensures `public/` exists
