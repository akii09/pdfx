# PDFx — Deployment, Publishing & Growth Guide

> A practical playbook for deploying PDFx, publishing to npm, growing your GitHub stars,
> and turning an open-source library into a sustainable project.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Prerequisites](#2-prerequisites)
3. [Build the Project](#3-build-the-project)
4. [Publishing to npm](#4-publishing-to-npm)
5. [Deploying the Documentation Website](#5-deploying-the-documentation-website)
6. [Hosting the Component Registry](#6-hosting-the-component-registry)
7. [CI/CD Pipeline](#7-cicd-pipeline)
8. [Growing GitHub Stars](#8-growing-github-stars)
9. [Monetisation Strategies](#9-monetisation-strategies)
10. [Community & Support](#10-community--support)
11. [SEO & Discoverability](#11-seo--discoverability)
12. [Launch Checklist](#12-launch-checklist)

---

## 1. Architecture Overview

PDFx is a **pnpm monorepo** with three publishable packages and two apps:

```
pdfx/
├── packages/
│   ├── shared/     → @pdfx/shared   (types, schemas, theme presets)
│   ├── ui/         → @pdfx/ui       (React PDF components)
│   └── cli/        → @pdfx/cli      (npx installer)
└── apps/
    ├── www/        → docs site  (Vite + React)
    └── playground/ → live editor
```

**Publish order**: `@pdfx/shared` → `@pdfx/ui` → `@pdfx/cli`

The registry JSON files in `apps/www/public/r/` are served as static files from the docs
host and consumed by the CLI at install time.

---

## 2. Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | ≥ 18 LTS | Runtime |
| pnpm | ≥ 8 | Package manager |
| Turbo | bundled | Build orchestration |
| npm account | — | Publishing |
| Vercel / Netlify account | — | Docs hosting |

```bash
# Install pnpm globally if not present
npm install -g pnpm

# Install all dependencies
pnpm install

# Verify builds pass
pnpm build
```

---

## 3. Build the Project

```bash
# Build all packages and apps in dependency order (uses Turbo)
pnpm build

# Build only the publishable packages
pnpm --filter @pdfx/shared build
pnpm --filter @pdfx/ui build
pnpm --filter @pdfx/cli build

# Run tests before publishing
pnpm test
```

Turbo caches build outputs — subsequent builds are near-instant.

---

## 4. Publishing to npm

### 4a. First-time setup

```bash
# Log in to npm (one-time)
npm login

# Check you are logged in as the right user
npm whoami
```

### 4b. Version bumping

PDFx follows **Semantic Versioning** (semver):

- **patch** (`0.1.x`): Bug fixes, docs, non-breaking tweaks
- **minor** (`0.x.0`): New components, new CLI commands, backward-compatible features
- **major** (`x.0.0`): Breaking API changes (rare)

```bash
# Bump all packages together (keeps versions in sync)
pnpm --filter @pdfx/shared version patch
pnpm --filter @pdfx/ui    version patch
pnpm --filter @pdfx/cli   version patch

# Or use changeset for granular versioning (recommended long-term)
pnpm changeset
pnpm changeset version
```

### 4c. Publish

```bash
# Publish packages in dependency order
pnpm --filter @pdfx/shared publish --access public
pnpm --filter @pdfx/ui    publish --access public
pnpm --filter @pdfx/cli   publish --access public

# Verify
npm info @pdfx/ui version
```

### 4d. Publish tips

- **Dry-run first**: `npm publish --dry-run` shows exactly what will be uploaded
- **`.npmignore`**: Exclude test files, source maps, internal docs to keep the package small
- **provenance**: Add `--provenance` flag (requires GitHub Actions) to get the npm provenance badge — signals trustworthiness to users
- **dist-tag**: Use `npm publish --tag next` for pre-releases so users must opt-in with `npm install @pdfx/ui@next`
- **README on npm**: npm shows the root `README.md` — keep it polished with badges, a GIF/screenshot, and a quick-start example

---

## 5. Deploying the Documentation Website

### Option A — Vercel (recommended, free tier is generous)

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your repo
3. Set **Root Directory** to `apps/www`
4. Set **Build Command** to `pnpm build` (Vercel auto-detects pnpm)
5. Set **Output Directory** to `dist`
6. Click **Deploy**

Every `git push` to `main` triggers a new deployment. Pull request previews are automatic.

```json
// vercel.json (place in apps/www/)
{
  "rewrites": [{ "source": "/((?!r/).*)", "destination": "/index.html" }]
}
```

### Option B — Netlify

1. Connect repo at [netlify.com](https://netlify.com)
2. **Base directory**: `apps/www`
3. **Build command**: `pnpm build`
4. **Publish directory**: `apps/www/dist`
5. Add `_redirects` file in `apps/www/public/`:

```
/*  /index.html  200
```

### Custom domain

1. Buy a domain (e.g. `pdfx.dev`) on Namecheap, Google Domains, or Cloudflare Registrar
2. Point DNS to Vercel/Netlify using their provided nameservers or CNAME records
3. Enable HTTPS in the platform dashboard (auto-provisioned via Let's Encrypt)

---

## 6. Hosting the Component Registry

The registry JSON files live in `apps/www/public/r/` and are served as static assets
alongside the docs site. No separate hosting is needed — they are part of the same
Vercel/Netlify deployment.

**Registry URL format**:
```
https://your-domain.com/r/index.json
https://your-domain.com/r/heading.json
https://your-domain.com/r/templates/invoice-classic.json
```

**To add a new component to the registry:**
1. Build the component in `packages/ui/src/components/<name>/`
2. Run the registry build script: `pnpm build:registry` (in `apps/www`)
3. Commit the generated JSON in `apps/www/public/r/`
4. Deploy — the new component is immediately available via `npx @pdfx/cli add <name>`

---

## 7. CI/CD Pipeline

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 8 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm test
      - run: pnpm lint
```

Create `.github/workflows/publish.yml` for automated npm releases:

```yaml
name: Publish

on:
  push:
    tags: ['v*']

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write   # required for npm provenance
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 8 }
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm --filter @pdfx/shared publish --access public --provenance
      - run: pnpm --filter @pdfx/ui    publish --access public --provenance
      - run: pnpm --filter @pdfx/cli   publish --access public --provenance
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Store your npm token in **GitHub → Settings → Secrets → `NPM_TOKEN`**.

---

## 8. Growing GitHub Stars

### 8a. The best code in the world means nothing if nobody can find it

**Profile & README polish**

- Add a compelling animated GIF or screenshot in the README showing a real PDF being generated in < 10 seconds
- Display badges: npm version, downloads/week, license, CI status, bundle size
- Write a one-sentence hook at the very top: *"shadcn/ui for PDF generation — copy-paste components, full theme control"*

```markdown
[![npm](https://img.shields.io/npm/v/@pdfx/ui)](https://npmjs.com/package/@pdfx/ui)
[![downloads](https://img.shields.io/npm/dw/@pdfx/ui)](https://npmjs.com/package/@pdfx/ui)
[![license](https://img.shields.io/github/license/yourusername/pdfx)](LICENSE)
```

**GitHub metadata**

- Add **topics/tags** to your repo: `react`, `pdf`, `react-pdf`, `shadcn`, `invoice`, `typescript`
- Write a short, punchy repo **Description** (shown in search results)
- Pin the repo on your GitHub profile
- Set up **GitHub Discussions** so users can ask questions publicly (builds community + SEO)

### 8b. Launch strategy

**Week 1 — Soft launch**

1. Post on Reddit: [r/reactjs](https://reddit.com/r/reactjs), [r/webdev](https://reddit.com/r/webdev), [r/typescript](https://reddit.com/r/typescript)
   - Lead with a concrete problem: *"Tired of writing raw @react-pdf/renderer styles? I built a component library..."*
   - Show a before/after code comparison
2. Tweet/post on X (Twitter) with a GIF demo — tag `@reactpdf`, `@shadcn`
3. Post on [dev.to](https://dev.to) — "I built shadcn/ui for PDF generation"

**Week 2 — Hacker News**

Submit to [news.ycombinator.com/submit](https://news.ycombinator.com/submit):
- Title: *"PDFx – React PDF component library with shadcn/ui-style copy-paste install"*
- Best time: Tuesday–Thursday, 8–10am EST
- Front page HN = 200–1000 stars in a day

**Week 3 — Product Hunt**

Launch on [Product Hunt](https://producthunt.com):
- Prepare a Loom/YouTube demo video (< 90 seconds)
- Get friends to upvote on launch day (Tuesday–Thursday work best)
- Respond to every comment within the first hour

**Ongoing — Content marketing**

- Write a tutorial: *"Building an invoice generator with React and PDFx"* (post to dev.to, Medium, Hashnode)
- Create a YouTube short showing the CLI install + invoice preview in 60 seconds
- Submit to [awesome-react](https://github.com/enaqx/awesome-react) via PR
- Submit to [awesome-react-components](https://github.com/brillout/awesome-react-components)

### 8c. Referral loops

- Add `<!-- Built with PDFx https://github.com/yourusername/pdfx -->` as a comment in generated files (opt-out only)
- Show a "Built with PDFx" badge option in the docs that users can embed in their own READMEs
- Create a **showcase page** on the docs site listing projects built with PDFx — encourages contributors to submit their projects (and star the repo)

### 8d. Keeping momentum

- Ship a new component or template every 2–3 weeks — each release is a new tweet/post opportunity
- Add a **GitHub Sponsors** button so power users can fund development
- Respond to every issue and PR within 24 hours during the growth phase — GitHub's algorithm surfaces responsive repos
- Write a CHANGELOG with human-readable release notes (not just commit hashes)

---

## 9. Monetisation Strategies

### Free tier (default — maximize adoption)

Everything in the current repo stays MIT licensed and free forever.

### Revenue streams

**1. Pro templates (one-time purchase)**

Create a `templates-pro` private repo with premium templates (multi-page reports, branded proposals, contracts). Sell access via [Gumroad](https://gumroad.com) or [Lemon Squeezy](https://lemonsqueezy.com):
- Price: $29–79 per template pack
- Deliver as a zip or private npm package
- Marketing: "Save 4 hours of PDF design work for $29"

**2. SaaS — hosted PDF rendering API**

Offer a REST API that accepts JSON + template name and returns a PDF:

```bash
curl -X POST https://api.pdfx.dev/render \
  -H "Authorization: Bearer $TOKEN" \
  -d '{ "template": "invoice-classic", "data": { ... } }'
```

- Pricing: free tier (10 renders/month) → $19/mo (1000 renders) → $99/mo (unlimited)
- Hosting: Railway, Render, or Fly.io (cheap for Node.js workers)
- Tech: Express or Fastify + `@react-pdf/renderer` server-side

**3. GitHub Sponsors / Open Collective**

Enable [GitHub Sponsors](https://github.com/sponsors) once you have 100+ stars:
- Offer tiers: $5/mo (badge) → $25/mo (priority issues) → $100/mo (consulting call)
- Many companies will sponsor tools they depend on

**4. Consulting / custom development**

List yourself as available for "custom PDF template development" in the README. At scale (1000+ stars) you can charge $150–300/hour for bespoke templates.

**5. White-label / enterprise licensing**

Offer an enterprise license for companies that want:
- Private registry hosting
- SLA support
- Custom theme development
- Remove "Built with PDFx" attribution

Pricing: $500–2000/year depending on team size.

---

## 10. Community & Support

### Discord server

Create a free Discord server:
1. Go to [discord.com](https://discord.com) → Create server → "For a community"
2. Add channels: `#announcements`, `#help`, `#showcase`, `#contributing`
3. Add a Discord invite link in the README and docs
4. Bot: [carl-bot](https://carl.gg) for auto-roles and welcome messages

Discord is the #1 channel for real-time support and grows the community quickly.

### Responding to issues

- Use GitHub issue templates (`.github/ISSUE_TEMPLATE/bug_report.yml`)
- Label issues clearly: `bug`, `feature`, `documentation`, `good first issue`
- `good first issue` label is indexed by [goodfirstissue.dev](https://goodfirstissue.dev) — free contributor acquisition

### Documentation quality

High-quality docs are the #1 driver of stars and adoption:
- Every component needs: description, live preview, props table, copy-paste code example
- Add a "Cookbook" section with real-world recipes (invoice, report, certificate)
- Add a TypeScript playground embedded in the docs

---

## 11. SEO & Discoverability

### npm SEO

```json
// packages/ui/package.json
{
  "keywords": [
    "react-pdf", "pdf", "invoice", "pdf-template", "react", "typescript",
    "shadcn", "component-library", "pdf-generator", "invoice-generator"
  ]
}
```

### Website SEO

- Add `<meta>` description + Open Graph tags in `apps/www/index.html`
- Create a `sitemap.xml` (Vite plugin: `vite-plugin-sitemap`)
- Target keywords: "react pdf component library", "invoice pdf react", "react-pdf templates"
- Submit sitemap to Google Search Console

### GitHub SEO

- Include keywords in the repo description and README H1
- Star the repos of competing/related projects — they show up in "related repositories"
- Cross-link: mention PDFx in issues/discussions of `react-pdf`, `shadcn-ui`, `recharts`

---

## 12. Launch Checklist

### Pre-launch

- [ ] All tests passing (`pnpm test`)
- [ ] Build succeeds (`pnpm build`)
- [ ] README has: description, badges, GIF/screenshot, quick-start (< 5 lines), links
- [ ] LICENSE file present (MIT)
- [ ] CHANGELOG.md updated
- [ ] npm packages published and verified (`npm info @pdfx/ui`)
- [ ] Docs site deployed and accessible
- [ ] Registry URLs in `DEFAULTS.REGISTRY_URL` match the deployed docs URL
- [ ] GitHub repo topics set (react, pdf, typescript, invoice, shadcn)
- [ ] GitHub Discussions enabled
- [ ] Social preview image set (Settings → Social preview — 1280×640px)

### Launch day

- [ ] Submit to Hacker News (Show HN) at 9am EST Tuesday–Thursday
- [ ] Post on Reddit (r/reactjs, r/webdev) at the same time
- [ ] Tweet with GIF + link
- [ ] Post on dev.to / Hashnode
- [ ] Notify personal network to upvote/star

### Post-launch (week 1)

- [ ] Respond to all HN/Reddit comments
- [ ] Close/address any issues that appeared
- [ ] Thank everyone who starred or shared
- [ ] Write a brief "launch recap" post for dev.to

---

*Built with love for the open-source PDF ecosystem. Go ship amazing PDFs! 🚀*
