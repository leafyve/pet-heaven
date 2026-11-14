# Verification record
14 November 2026 · Pet Heaven · Lim EnLe 1036488

## Executed automated checks
`npm test`: 4 tests passed, 0 failed.
- Combined case-insensitive query/species/age/saved filters; incompatible filters and empty saved list.
- Young/adult/senior age boundaries.
- Required whitespace, email, telephone and minimum applicant age validation; valid input acceptance.
- Export includes chosen pet ID/name and entered values.

`npm run build`: Vite production build succeeded.

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

## Limits
Email-client launch and actual email delivery were not tested; no email was sent. Database, real identity security, cross-device persistence and real shelter processing are not implemented. Browser extension metadata errors were observed; they are unrelated to application source. A full multi-browser/accessibility audit was not conducted. Screen recording and Google Drive sharing remain student completion steps.
