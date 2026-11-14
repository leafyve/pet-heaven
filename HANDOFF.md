# WORKS NOW

- Original source preserved in checkpoint `ca0a698`.
- `npm test`: six tests passed on 14 November 2026.
- `npm run build`: Vite production build completed.
- `npm run test:e2e`: five Chromium integration tests passed against production preview, covering directory, accounts, request flows, responsive layouts, routing and keyboard controls.
- `npm audit`: zero vulnerabilities after the Vite 6 patch.
- GitHub Actions run `43576009476` built, tested and deployed commit `da81d42` successfully.
- All five browser tests passed against https://leafyve.github.io/pet-heaven/ in fresh unsigned Chromium contexts; public initial load reported zero console errors.

# IN PROGRESS

- No code work remains. Keep the public Pages URL as the primary project link.
- Student completion: record the narrated walkthrough, upload it to Google Drive, enter its real link in the report and submit through Moodle.

# DO NOT TOUCH

- Keep hash routing and the `/pet-heaven/` production base together.
- Keep demo disclosures and manually supplied email recipients; no backend or mail service exists.
- Preserve the original ChatGPT-hosted version and the report's development acknowledgement.

# OPEN QUESTIONS

- The student must record and upload the narrated walkthrough and add its real Google Drive link to the PDF. No video URL was provided.

# COMMANDS

`npm ci`; `npm test`; `npm run build`; `npx playwright install chromium`; `npm run test:e2e`; `npm run dev`; `npm run preview`.

Push to `main` to run the GitHub Pages build, browser checks and deployment. Primary public URL: https://leafyve.github.io/pet-heaven/.
