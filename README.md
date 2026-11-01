# More Priyo — Portfolio

Personal portfolio for More Priyo, a second-year B.Tech student in Computer Science and Engineering (Data Science) at CVR College of Engineering.

The site is built with Next.js App Router, React, TypeScript, and CSS. It features a responsive dark visual design, an animated particle portrait, project cards, skills, education, events, certificates, contact links, and a downloadable résumé.

## Projects featured

- **JanSetu AI** — Civic issue reporting platform connecting citizens and government. [Live site](https://jansetu-gray.vercel.app/) · [GitHub](https://github.com/morepriyo-dotcom/JanSetu-AI)
- **SkillBridge** — Student-to-industry platform. [Live site](https://skillbridge-sih-rho.vercel.app/) · [GitHub profile](https://github.com/morepriyo-dotcom)
- **Back2U** — Lost-and-found recovery platform with multimodal matching and privacy-aware claims. [Live site](https://back2-u-eta.vercel.app/) · [GitHub](https://github.com/morepriyo-dotcom/Back2U)

## Run locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create a production build with `npm run build`, then serve it locally with `npm run start`.

## Main files

- `app/page.tsx` — portfolio content and project links
- `app/globals.css` — layout, responsive styles, animations, and theme
- `app/hero-particles.tsx` — animated portrait effect
- `app/scroll-motion.tsx` — scroll reveal effects
- `app/layout.tsx` — page metadata and document layout
- `public/more-priyo.jpeg` — portrait used by the particle effect
- `public/More-Priyo-Resume.pdf` — downloadable résumé

## Deploy

Import this repository into Vercel and keep its detected Next.js build settings. Connect the production branch for automatic production deployments and preview deployments for changes.
