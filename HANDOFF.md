# WORKS NOW

- Original source preserved in checkpoint `ca0a698`.
- `npm test`: six tests passed on 14 November 2026.
- `npm run build`: Vite production build completed.
- `npm run test:e2e`: five Chromium integration tests passed against production preview, covering directory, accounts, request flows, responsive layouts, routing and keyboard controls.
- `npm audit`: zero vulnerabilities after the Vite 6 patch.

# IN PROGRESS

- Complete GitHub Pages deployment and repeat the browser suite against the public URL; record evidence in TEST_RESULTS.md.
- Update the fillable review report and create the final submission ZIP.

# DO NOT TOUCH

- Keep hash routing and the `/pet-heaven/` production base together.
- Keep demo disclosures and manually supplied email recipients; no backend or mail service exists.
- Preserve the original ChatGPT-hosted version and the report's development acknowledgement.

# OPEN QUESTIONS

- The student must record and upload the narrated walkthrough and add its real Google Drive link to the PDF. No video URL was provided.

# COMMANDS

`npm ci`; `npm test`; `npm run build`; `npx playwright install chromium`; `npm run test:e2e`; `npm run dev`; `npm run preview`.

Push to `main` to run the GitHub Pages build, browser checks and deployment. Primary public URL: https://leafyve.github.io/pet-heaven/.
