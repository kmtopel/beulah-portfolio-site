# Beulah Portfolio Site (Next.js + Sanity)

This repo is scaffolded with:
- Next.js App Router + TypeScript
- Static export compatible with GitHub Pages
- Starter schemas for `project`, `about`, and `siteSettings`
- Portfolio pages: `/`, `/work/[slug]`, `/skills/[slug]`, `/about`

## 1) Install dependencies

```bash
npm install
```

## 2) Set environment variables

Copy `.env.example` to `.env.local` and fill in your Sanity details.

```bash
cp .env.example .env.local
```

Required values:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

Recommended values:
- `SANITY_API_READ_TOKEN` (for private datasets/draft previews)

## 3) Run the app

```bash
npm run dev
```

## 4) Open Studio

Visit `http://localhost:3000/studio` for setup guidance.

For content editing, use:
- Sanity Manage: `https://www.sanity.io/manage`
- Optional separate Studio deploy: `npm run sanity deploy`

## 5) Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In GitHub repo settings:
   - `Settings -> Pages -> Build and deployment -> Source: GitHub Actions`
3. Add repository variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION` (set to `2024-07-11`)
4. Optional repository secret for private datasets:
   - `SANITY_API_READ_TOKEN`
5. Push to `main` and GitHub Actions will deploy the `out/` directory.

Note: GitHub Pages is static hosting, so server APIs and ISR webhooks are not available.
