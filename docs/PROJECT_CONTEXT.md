# Project Context

## Purpose

This repository contains Riccardo Masetti's public personal website. It is a
one-page professional portfolio focused on DevOps, platform engineering, cloud
infrastructure, AI-assisted automation, selected projects, community work, and
contact links.

The site should feel technically credible and personal without becoming a large
web application. Fast static delivery, readable content, accessibility, and easy
maintenance are higher priorities than adding framework complexity.

## Current Product Shape

- A React 19 single-page interface built with Vite 7.
- Sections: Timeline, Skills, Projects, Bio, and Contact.
- Sticky section navigation with active-section highlighting.
- Responsive dark glass-style presentation and scroll-reveal effects.
- A dismissible privacy notice stored only in the visitor's local browser.
- No analytics, advertising, cookie tracking, backend, authentication, or forms.
- Static output intended for S3 behind CloudFront.
- Search and machine-readable metadata in HTML, JSON-LD, `robots.txt`,
  `sitemap.xml`, and `llms.txt`.
- A branded social-sharing image referenced by Open Graph and Twitter metadata.

## Source of Truth

| Concern | Source |
| --- | --- |
| Page content and repeated section data | `src/App.jsx` |
| Layout, responsive behavior, and visual design | `src/styles.css` |
| React bootstrap | `src/main.jsx` |
| SEO, social metadata, JSON-LD, and HTML shell | `index.html` |
| Public crawler files | `public/` |
| Local assets | `src/assets/` |
| Build configuration | `vite.config.js`, `package.json` |
| Build verification and AWS release workflow | `Makefile` |
| Sitemap date automation | `scripts/update-sitemap.mjs` |
| Generated production output | `dist/` (never edit directly) |

When biographical facts, job history, project descriptions, links, or the
canonical domain change, check every relevant machine-readable representation as
well as the visible page. In particular, content may be duplicated between
`src/App.jsx`, `index.html`, and `public/llms.txt`.

## Design and Engineering Constraints

- Preserve the one-page information architecture unless a product decision says
  otherwise.
- Prefer native browser APIs and existing React functionality over new packages.
- Maintain keyboard usability, semantic landmarks, descriptive link text,
  visible focus states, reduced-motion support, and useful alternative text.
- Keep layouts usable on mobile, tablet, and desktop.
- Keep external links intentional and use safe new-tab behavior where applicable.
- Do not introduce tracking or remote runtime dependencies without an explicit
  product decision and corresponding privacy-content update.
- Do not place environment-specific AWS identifiers in version control.

## Development and Verification

```bash
npm ci
npm run dev
npm run build
make prepare
```

`npm run build` is the baseline verification. `make prepare` additionally checks
that the production directory contains the expected deployable files.

Production builds refresh `public/sitemap.xml` using the Europe/Rome calendar
date before generating `dist/`.

There is currently no automated unit, integration, or end-to-end test suite.
For visual or interaction changes, supplement the production build with a manual
check at narrow and wide viewport sizes.

## Definition of Done

A change is complete when:

- the requested behavior or content is present in source files;
- duplicated metadata or crawler content is consistent where relevant;
- accessibility and responsive behavior have been considered;
- `npm run build` succeeds;
- release-related changes also pass `make prepare`;
- this continuity documentation is updated if the repository's durable context,
  decisions, or outstanding work changed.

