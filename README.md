# Gita Saathi

Independent, bilingual (English/हिन्दी) Bhagavad Gita website. React + Vite + TypeScript. Not affiliated with gitachat.in.

## Run
    npm install
    npm run dev        # development
    npm run build      # production build (base path /gita-saathi/)
    npm run validate   # checks verse data

## Deploy (GitHub Pages)
1. Create repo `gita-saathi` under your account and push this folder to `main`.
2. Repo Settings > Pages > Source: **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes to https://pawanbaheti.github.io/gita-saathi/.
Routing uses `HashRouter`, so page refresh works on GitHub Pages.

## Languages
- Site language: `src/locales/en.json`, `hi.json` (same keys in both).
- Verse language (Sanskrit / हिन्दी / English): separate setting, saved separately.

## Data
`public/data/verses.json` is built by `npm run data` from AdiyogiArts/gita-json (MIT).
It has 701 records: Chapter 13 includes the opening "Arjuna uvacha" verse (13.1).
**Licence warning:** English/Hindi texts are credited to other authors. Verify redistribution rights before publishing.

## Chat / search
Local keyword retrieval in the browser. Not generative AI. Lookup is keyword search, not semantic search.

## Not done yet
Russian/Spanish (not required), screenshot-vs-site visual comparison, mobile testing, chapter descriptions. Festival articles are short original summaries, shorter than the reference site's.
