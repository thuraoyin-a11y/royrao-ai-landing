# Deploy Guide

## Step 1: GitHub Pages Auto-Deployment

The repository includes `.github/workflows/deploy.yml`. On every push to `main`, the site is built and deployed to the `gh-pages` branch.

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
```

## Step 2: Alibaba Cloud Domain (royraoai.top)

1. Log in to the Alibaba Cloud console → Domain DNS.
2. Add a CNAME record:
   - Host: `www`
   - Value: `<your-github-username>.github.io`
   - TTL: 10 minutes
3. Add A records for the apex domain:
   - Host: `@`
   - Values:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
4. In your GitHub repository, go to **Settings → Pages → Custom domain** and enter `www.royraoai.top`.
5. Check **Enforce HTTPS**.
6. Wait 5–10 minutes, then verify by visiting `www.royraoai.top`.

## Step 3: Vite Configuration

`vite.config.ts` sets `base: '/'` for a custom domain. If you deploy to `username.github.io/repo-name`, change `base` to `'/repo-name/'`.

The `public/CNAME` file contains `www.royraoai.top` so the custom domain is preserved on each deploy.
