# Pet Heaven — ISIT207 Assignment 3

**Lim EnLe | UOW ID 1036488 | SIM–UOW, full-time | Session 4, 2026**

A responsive React SPA for a fictional pet welfare society. 

**Primary public website:** https://leafyve.github.io/pet-heaven/  
**Source repository:** https://github.com/leafyve/pet-heaven


## Run locally

Install Node.js 20.19+ (or a current supported LTS version), then:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Do not double-click index.html; JSX requires the development server or production build.

```sh
npm test
npm run build
npx playwright install chromium
npm run test:e2e
npm run preview
```

The `dist` folder is a static production build. It can be hosted on a static web server. Hash routing means deep links do not need server rewrite rules.

The development server binds to localhost. The production preview is at `http://127.0.0.1:4173/pet-heaven/`. Build before preview or browser tests. Browser tests use Chromium and synthetic data in fresh browser contexts; they inspect email-draft navigation without sending mail. To test a different deployment in PowerShell:

```powershell
$env:PLAYWRIGHT_BASE_URL = 'https://leafyve.github.io/pet-heaven/'
npm run test:e2e
Remove-Item Env:PLAYWRIGHT_BASE_URL
```

## GitHub Pages deployment

Pushes to `main` run `.github/workflows/deploy.yml`: install the lockfile, run six logic tests, build with Vite, run five browser integration tests, upload `dist`, and deploy to the `github-pages` environment. The repository's Pages source is **GitHub Actions**. No deployment credentials are stored in the source; the workflow uses GitHub's scoped token and OIDC.

`vite.config.js` sets the production and preview base to `/pet-heaven/`. JSX image paths use `import.meta.env.BASE_URL`; Vite rewrites the HTML favicon and compiled assets. All application routes follow the hash, for example `https://leafyve.github.io/pet-heaven/#/adopt/luna`, so shared links, reloads and browser back/forward work without a server fallback. If the repository is renamed, update the base and documented links together.

## Features

- Home, pet directory, saved pets, About/mission/facilities, care, contact, community, sign-up/login, adoption and release routes.
- Six fictional pet profiles with real, locally bundled Unsplash photography.
- Search, species and age filters, sorting, saved pets and accessible native dialogs.
- Member-gated adoption with the chosen pet retained across sign-up/login.
- Shared validated request form: input → review/edit → prepare → download or email draft.
- Educational guides, interactive readiness checklist and member feedback.
- Responsive grids, mobile navigation, reduced-motion support and visible focus indicators.

## Demo boundaries

Accounts are simulated in React memory and disappear on a full refresh. Register first, then log out and log back in without refreshing to test authentication. Use invented details and a disposable demo password. No credentials are stored in localStorage.

Saved pet IDs and feedback persist only in this browser's localStorage. No database or server-side authorisation is claimed. Requests are not automatically emailed or stored. The visitor enters a recipient and opens a mailto draft in their own email client; they must send it manually. A text download is the fallback. No real shelter address, email recipient, outcome or adoption availability is implied.

A production system would need server-side validation, secure authentication, a database, verified staff access, consent/retention policies and authenticated email delivery.

## Structure

- `src/main.jsx`: app entry, hash routing and shared page layout.
- `src/context.jsx`: member state, saved pets and feedback via Context.
- `src/components.jsx`: Button, Header, Footer, Field, Modal, PetCard and reusable headings.
- `src/pages.jsx`: page components and shared request flow.
- `src/data.js`: pet profiles and care guide content.
- `src/utils.js`: filtering, validation and request export.
- `src/styles.css`: design tokens, layouts and responsive rules.
- `tests/logic.test.js`: executable data/validation tests.
- `tests/browser/flows.spec.js`: browser integration tests against the production build or public site.
- `playwright.config.js`: browser-test runner and local preview setup.
- `photo-sources.json`: exact source image URLs.

## Credits

Course materials: Abel Choy's supplied ISIT207 lectures (L1–L9), tutorials, revision resources, subject outline, A3 outline and marking rubric. Core concepts applied include semantic HTML, CSS Grid/Flexbox, higher-order array functions, JSX, props, hooks, Context, SPA navigation and Nielsen's heuristics.

Real photographs: Unsplash, https://unsplash.com/license (exact assets in photo-sources.json). Icons: Lucide, ISC licence, https://lucide.dev/license. Font: DM Sans via Google Fonts, used throughout the website with a system sans-serif fallback. React documentation: https://react.dev/learn. General care reference: https://www.aspca.org/pet-care.
