# Verification record
14 November 2026 · Pet Heaven · Lim EnLe 1036488

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
Desktop email-client composition and actual delivery were not verified; no email was sent. Database, real identity security, cross-device persistence and real shelter processing are not implemented. Chromium was checked locally and on Linux CI; Safari, Firefox, physical devices and a full accessibility/assistive-technology audit were not tested. The student must record the narrated walkthrough, upload it to Google Drive, enable lecturer viewing, add the actual video URL to the report and submit through Moodle. No video URL was supplied and no Moodle submission was performed.
