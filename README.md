# Mirkan's Portfolio Website

**Live at:** [mirkan1.github.io](https://mirkan1.github.io)

A modern, interactive portfolio presenting Renas Mirkan KILIC as a capable software developer focused on understanding problems, adapting to changing tools, and delivering useful software.

## 🎯 What's Inside

This portfolio features:

- **Full-Stack Projects**: From blockchain-enabled Web3 apps to Flask/Django backends and React frontends
- **Systems & Reverse Engineering**: Memory manipulation, kernel drivers, and binary analysis with Ghidra
- **Data Engineering**: Web scrapers, data pipelines, and real-time cryptocurrency monitoring
- **Web & Mobile**: React, React Native, and Node.js applications
- **Technology Showcase**: 40+ technologies across multiple domains

## 🚀 Key Projects

| Project | Tech | Highlights |
|---------|------|-----------|
| **Effortl3ssAI** | TypeScript, Solidity | Prompt-to-on-chain Web3 action solution (EthSingapore Hackathon) |
| **jotform-api** | Python | PyPI package—comprehensive JotForm API wrapper with real-time health monitoring |
| **Reverse Engineering** | Ghidra, Cheat Engine | Memory manipulation for game analysis (Booster Pack Heroes) |
| **Datareporter** | Flask, React, Docker | End-to-end data reporting platform |
| **Defisherpa** | Python, Scrapy | Crypto data scraping, monitoring, and analysis automation |
| **SdPaint** | Python, Stable Diffusion | AI-powered painting application |

## 💻 Tech Stack

**Languages:** Python · TypeScript · Solidity · Go · C/C++

**Frontend:** React · React Native · Bootstrap · Tailwind CSS · D3.js

**Backend:** Flask · Django · Node.js · Express.js

**Data:** Pandas · MySQL · PostgreSQL · MongoDB · Redis

**Cloud & DevOps:** AWS · Azure · Heroku · Docker · Git

**Systems:** Visual Studio · Windows API · Kernel Drivers · Ghidra

## 🛠️ Development

### Prerequisites
- Node 18.x
- npm

### Setup

```bash
# Install dependencies
npm install

# Run locally
npm start

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Available Scripts

- `npm start` — Start development server (http://localhost:3000)
- `npm run build` — Create production build in `/build`
- `npm test` — Run test suite
- `npm run deploy` — Deploy to GitHub Pages

## 🎨 Features

- **Responsive Design** with Bootstrap and custom styling
- **Smooth Page Transitions** using react-transition-group
- **Pixel-art Themed UI** with custom border styling
- **Contact Integration** with email-based resume requests
- **Dark Mode Support** with themed color scheme

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Main page routes (About, Work, Privacy)
├── css/             # Stylesheets
├── fonts/           # Custom fonts (Press Start 2P)
├── img/             # Images and certifications
└── files/           # Project assets
```

## 🔗 Connect

- **GitHub:** [github.com/mirkan1](https://github.com/mirkan1)
- **Email:** mirkanbaba1@gmail.com
- **LinkedIn:** Available via portfolio

## 📜 License

This project is open source and available under the terms specified in this repository.

---

**Built with React, Bootstrap, and a passion for full-stack development.**

## Deployment

The site is hosted at https://mirkan1.github.io/ (not `/mirkan1portfolio/`).
In **Settings > Pages > Build and deployment**, set **Source** to **GitHub Actions**.
The [Pages workflow](.github/workflows/github-pages.yml) builds and deploys `build/`
on pushes to `main`, or when run manually from the Actions tab. Do not publish the
repository root directly: it contains the source code, not the built React app.

Routes use clean URLs, for example `https://mirkan1.github.io/work/`.
The build prerenders each page into its own HTML file, so GitHub Pages serves
content directly on visits and refreshes without requiring JavaScript. Old
`/#/work` and `/mirkan1portfolio/#/work` links arriving at this site redirect to
the clean URLs. Unknown paths return a real 404 instead of redirecting to the homepage.

## Search visibility

`npm run build` generates page-specific titles, descriptions, canonical URLs,
social sharing metadata, and a sitemap at `build/sitemap.xml`. The homepage
includes Person structured data linking to the public GitHub and LinkedIn profiles.
Page content and metadata are shared with the React app, not maintained as a
separate copy. Update route metadata in [src/site.js](src/site.js).

The sitemap lists the homepage, projects, and certifications. The unfinished
privacy page and 404 page are marked `noindex`. Remove that restriction only
when the privacy page has real content.

After deploying:

1. Add `https://mirkan1.github.io/` as a URL-prefix property in
   [Google Search Console](https://search.google.com/search-console).
2. Verify ownership using Google's HTML file in `public/` (then redeploy), or its
   verification meta tag in `public/index.html`. Use the value Google provides.
3. Submit `https://mirkan1.github.io/sitemap.xml`.
4. Use URL Inspection to test the live homepage, `/work/`, and `/certifications/`,
   then request indexing.

Google controls whether and when pages appear in search; these changes make
the content discoverable and readable, but do not guarantee indexing or rankings.
