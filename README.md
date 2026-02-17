# Beulah Portfolio Site (Next.js + Sanity)

This repo is scaffolded with:
- Next.js App Router + TypeScript
- Static export compatible with GitHub Pages
- Starter schemas for `project`, `about`, and `siteSettings`
- Portfolio pages: `/`, `/projects/[slug]`, `/skills/[slug]`, `/about`

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

## 4) Deploy to GitHub Pages

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

## 5) Trigger deploys from Sanity content changes

You can auto-deploy on publish by sending a `repository_dispatch` event to GitHub.

1. Create a GitHub fine-grained personal access token with access to this repo.
2. In Sanity project settings, create a webhook:
   - URL: `https://api.github.com/repos/<OWNER>/<REPO>/dispatches`
   - Method: `POST`
   - Headers:
     - `Accept: application/vnd.github+json`
     - `Authorization: Bearer <YOUR_GITHUB_TOKEN>`
     - `X-GitHub-Api-Version: 2022-11-28`
   - Body:
     ```json
     {
       "event_type": "sanity-content-update",
       "client_payload": {
         "source": "sanity"
       }
     }
     ```
3. Filter webhook triggers to relevant document types (for example: `project`, `skill`, `about`, `siteSettings`) and publish events.

The deploy workflow in this repo already listens for `repository_dispatch` type `sanity-content-update`.
