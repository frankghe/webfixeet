# Work Items


# CMS support
status=completed

A CMS was integrated in project ~/projects/webaigent. 
These projects are very similar. 
Reuse what was done for webaigent for webfixeet to setup a CMS

## Summary

Implemented Phase 1 (content infrastructure) and Phase 3 (blog display from CMS), replicating the pattern from webaigent.

### What was done
- Installed `gray-matter`, `react-markdown`, `remark-gfm`, `@tailwindcss/typography`
- Created `content/blog/{he,en}/` directory structure with 3 migrated blog posts per locale
- Created `src/lib/blog.ts` (filesystem-based content reader using gray-matter) and `src/lib/blog-types.ts` (shared types/constants)
- Replaced hardcoded `src/lib/blog-data.ts` with filesystem reader
- Updated blog pages (`blog/page.tsx`, `blog/[slug]/page.tsx`) to read from markdown files
- Updated `BlogPostContent` to render markdown via `ReactMarkdown` + `remark-gfm` (replaces manual `\n\n` splitting)
- Updated `BlogListingSection` to accept posts as props from server component
- Updated `BlogCard` and `CategoryFilter` to import from `blog-types.ts`
- Reconciled CMS category values in `config.yml` to match code categories
- Added blog routes to `sitemap.ts`
- Removed `BlogPosts` namespace from `messages/{en,he}.json` (content now in markdown files)
- Added `@tailwindcss/typography` plugin for prose styling

### Remaining (Phase 4+)
- `/api/translate` endpoint (needs OpenAI API key)
- Tags/search/RSS
- Team documentation
