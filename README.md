# Pet Heaven — ISIT207 Assignment 3

**Lim EnLe | UOW ID 1036488 | SIM–UOW, full-time | Session 4, 2026**

A responsive React SPA for a fictional pet welfare society. This work was prepared with ChatGPT assistance; review the code and acknowledgement before submission.

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
```

The `dist` folder is a static production build. It can be hosted on a static web server. Hash routing means deep links do not need server rewrite rules.

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
- `photo-sources.json`: exact source image URLs.

## Submission checklist

1. Review and understand the code and report. Confirm permitted AI use with the subject's assessment guidance; retain the acknowledgement.
2. The hosted Site starts owner-private. Enable appropriate lecturer access or host `dist` on a lecturer-accessible platform, then test the link outside your own signed-in session.
3. Record the website walkthrough with your narration using `WALKTHROUGH_SCRIPT.md`. Upload the actual recording to Google Drive and enable the appropriate viewing access.
4. Add the real Google Drive video link in the fillable report field on page 1. If using a different host, update the website URL field too. Save and reopen the PDF to verify both fields.
5. Submit the report and any required source-code files via Moodle by **15 November 2026, 11:50 pm Singapore time**. No Moodle submission or Google Drive upload has been performed.

## Credits

Course materials: Abel Choy's supplied ISIT207 lectures (L1–L9), tutorials, revision resources, subject outline, A3 outline and marking rubric. Core concepts applied include semantic HTML, CSS Grid/Flexbox, higher-order array functions, JSX, props, hooks, Context, SPA navigation and Nielsen's heuristics.

Real photographs: Unsplash, https://unsplash.com/license (exact assets in photo-sources.json). Icons: Lucide, ISC licence, https://lucide.dev/license. Fonts: DM Sans and Manrope via Google Fonts, with local system fallbacks; display headings use Georgia. React documentation: https://react.dev/learn. General care reference: https://www.aspca.org/pet-care.
