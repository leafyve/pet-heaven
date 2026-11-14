# Verification record
14 November 2026 · Pet Heaven · Lim EnLe 1036488

## Final submission verification — 14 November 2026

- Final application revision `1482db3` is deployed successfully on GitHub Pages. The production build and six logic tests passed again; all six browser tests passed against the public site (`6 passed (18.3s)`). Dependency audit reported zero vulnerabilities.
- The latest interface includes Gmail/default-app drafts, copy/download exports with manual-copy fallback, centered adoption membership actions, and the round 18px saved-pet badge with its final upper-right spacing.
- The supplied Google Drive walkthrough opened and played in a fresh signed-out browser context. Playback reported a duration of approximately 13 minutes 32 seconds, advancing video time and no media error. The local recording contains H.264 video and a non-silent AAC audio track; sampled frames show the current request controls and final application revision.
- The final five-page review report contains the actual public website and walkthrough URLs as clickable links. Draft link prompts and unfinished submission wording were removed. Student identification, references and development acknowledgement were preserved. The final PDF was flattened, reopened, checked for placeholders and visually reviewed on all five pages.
- The submission ZIP contains the final report, application source/assets, lockfile, tests, licences and setup instructions. Internal handoff notes, Git internals, node_modules, generated build/test files, secrets, lecture files and the large local MP4 are excluded. The walkthrough is supplied through its Drive link.
- No Moodle upload or final submission was performed. This record documents technical/file readiness, not a guarantee of marks or an independent full accessibility audit.

## Email export update — 14 November 2026

- Prepared adoption, release and enquiry requests now offer Copy request, Download request, Open Gmail draft and Open default email app.
- Production build and six logic tests passed. The expanded Chromium suite passed all six tests locally (`6 passed (13.1s)`).
- Tests copy synthetic request text through the real clipboard API and compare it with the downloaded text, Gmail draft body and default-app draft body. Windows clipboard CRLF line endings are normalised for this content comparison.
- Both email options reject blank/invalid recipients. Gmail opens in a separate tab with correctly encoded recipient, subject and body; browser tests intercept the destination so no request is sent to Gmail during the suite.
- An additional real Gmail navigation with synthetic details reached Google's sign-in page and retained the intended compose URL. Authenticated Gmail composition and delivery were not tested; no email was sent.
- Clipboard denial and missing Clipboard API both reveal selectable, focused request text for manual copying. Returning to review resets stale copy feedback. Prepared-screen and fallback layouts were checked at 390px and 320px without horizontal overflow; desktop and mobile screenshots were visually reviewed.
- GitHub Actions runs the production build, logic tests and the six browser tests before deploying this update. Earlier deployment checks below are retained as historical evidence.

## Executed automated checks
`npm test`: 6 tests passed, 0 failed.
- Combined case-insensitive query/species/age/saved filters; incompatible filters and empty saved list.
- Young/adult/senior age boundaries.
- Required whitespace, email, telephone and minimum applicant age validation; valid input acceptance.
- Export includes chosen pet ID/name and entered values.
- Password whitespace is preserved consistently; blank/short passwords are rejected.
- Select values, whole-year applicant ages and fractional pet ages are validated.

`npm run build`: Vite production build succeeded.

`npm audit`: zero vulnerabilities reported after the Vite 6.4.6 patch.

## Public deployment and repeatable integration tests

- Public website: https://leafyve.github.io/pet-heaven/
- Repository: https://github.com/leafyve/pet-heaven
- GitHub Actions: https://github.com/leafyve/pet-heaven/actions/runs/43576009476
- Commit `da81d42`: build, six logic tests, five browser tests and Pages deployment succeeded on Ubuntu.
- `npm run test:e2e`: all five tests passed against local production preview and the public site. Public result: `5 passed (11.8s)` in fresh unsigned Chromium contexts, with no ChatGPT or GitHub sign-in.
- Independent public home-page check: zero console errors or warnings observed.
- Final contrast update `b753147` deployed successfully: https://github.com/leafyve/pet-heaven/actions/runs/43576372715. The full public browser suite passed again after this deployment.

Executable tests in `tests/browser/flows.spec.js` cover every route, invalid routes, image decoding and console/runtime errors; responsive layouts at 320, 390, 768, 1024 and 1440px; filters/sorting; saved persistence; dialog Tab wrapping/Escape/focus restoration; member-gated selected-pet adoption; signup/login/logout and session reset; invalid input; adoption/release/enquiry review/edit focus, preparation, text downloads and email-draft navigation; member feedback; readiness; back/forward and refresh; mobile menu; reduced motion; malformed browser storage.

Email checks inspect Chromium's requested `mailto:` navigation and encoded recipient/body. No message is sent and no recipient's existence is assumed.

## Observed browser checks
- Desktop home and image loading visually reviewed.
- Cat filter plus Luna search returns one matching profile.
- Luna profile dialog opens; adoption directs logged-out visitor to membership.
- Empty sign-up shows required-field messages; sample registration returns to the selected pet.
- Adoption form errors appear; valid sample data reaches review; Edit returns to inputs; Prepare shows explicit not-sent confirmation.
- Release form accepts complete sample information and reaches request preparation.
- Sample member feedback appears in the community feed.
- Logout succeeds; invalid demo login shows an error; correct demo login succeeds.
- Saving Buddy exposes a one-item saved directory.
- Care checklist reaches 4/4; guide dialog opens and closes.
- Mobile home visually reviewed in a 390px iframe (375px content area with scrollbar); body scrollWidth equals clientWidth, with no horizontal overflow.
- Mobile menu opens and navigates to the pet directory.
- Final 320px signed-in header and menu logout checked without horizontal overflow.
- Desktop home/directory, tablet contact and mobile About, Contact, Care, Community, Credits, Login, Sign-up and Release layouts captured and visually reviewed.
- After darkening the story text and step numbers, the repeat axe-core scan of 11 public routes at 1440px and 390px reported zero violations under its WCAG 2 A/AA and WCAG 2.1 AA rules. Automated checks complement the keyboard and visual review; they do not establish full WCAG conformance.

## Report verification

The five-page PDF now includes the primary public URL, current screenshots, responsive/keyboard/test descriptions and public-hosting status. Formatting, references and development acknowledgement are retained. The PDF was reopened and rendered: canonical website field and widget values agree; both fields retain appearance streams; the existing blank video field is preserved. The original report is retained outside the final submission folder as a backup.

## Limits
Desktop email-client composition and actual delivery were not verified; no email was sent. Database, real identity security, cross-device persistence and real shelter processing are not implemented. Chromium was checked locally and on Linux CI; Safari, Firefox, physical devices and a full accessibility/assistive-technology audit were not tested. The walkthrough was recorded, uploaded and linked in the final review report; public playback was checked without signing in. The final Moodle upload/submission remains the student's action.
