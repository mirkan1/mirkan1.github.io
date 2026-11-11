# Personal Portfolio Website

This repository contains the source code for my personal portfolio website.

## Tech Stack

- React
- JavaScript
- CSS

## Available Scripts

- `npm install` to install dependencies
- `npm start` to run locally in development mode
- `npm run build` to create a production build

## Deployment

The site is hosted at https://mirkan1.github.io/ (not `/mirkan1portfolio/`).
In **Settings > Pages > Build and deployment**, set **Source** to **GitHub Actions**.
The [Pages workflow](.github/workflows/github-pages.yml) builds and deploys `build/`
on pushes to `main`, or when run manually from the Actions tab. Do not publish the
repository root directly: it contains the source code, not the built React app.

Routes use hashes, for example `https://mirkan1.github.io/#/work`.
