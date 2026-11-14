# Pet Heaven — recording guide
Lim EnLe · 1036488 · ISIT207 Assignment 3

Approximate length: 4–5 minutes. Record the actual website with your own voice. The text below is a draft to adapt to your understanding. Open the website first, hide unrelated tabs and use sample data. No video has been recorded or uploaded yet.

## 0:00–0:30 — Home
**Show:** home hero, scroll to the pet cards and adoption steps.

“Hello, I’m Lim EnLe, UOW ID 1036488. This is Pet Heaven, a React single-page application for a fictional charity caring for abandoned cats and dogs. The main goal is to help visitors understand the society, find a suitable pet and begin an adoption or release request. The cream background, forest-green buttons and real animal photographs create a warm and calm design. The main call to action leads directly to the pet directory.”

## 0:30–1:05 — Directory and profiles
**Show:** Find a pet; choose Cats; search Luna; open her profile; close it; save her; open Saved pets from the footer.

“The directory uses reusable PetCard components. I pass each pet object through props, which keeps the card layout consistent. Visitors can search names and breeds, filter by species and age, and sort results. Clicking a card opens a reusable dialog showing the pet’s personality and ideal home. The heart button saves a pet in this browser. Search results update immediately without reloading the page.”

## 1:05–1:45 — Registration and login
**Show:** apply for Luna while logged out; choose Become a member; submit empty form once; fill sample details; demonstrate matching passwords and consent; create account.

“Browsing does not require an account, but adoption requests do. The app keeps the selected pet when it directs a visitor to sign-up or login. Required fields, email format, password length and password confirmation are validated. Context shares the logged-in member across components. This is frontend demonstration authentication: accounts remain in memory for the current page session and are cleared by refresh. It is not a production security system.”

## 1:45–2:40 — Adoption request
**Show:** sample phone, age 23, home type, household permission, care experience and reason. Submit an incomplete form once; correct it; review; edit; prepare request; download the text copy.

“The adoption form asks about the member’s home, daily routine and care experience. Validation catches missing fields and checks the proposed minimum age of 21. The review stage allows corrections before preparing the request. The confirmation explicitly says no email has been sent. Visitors can download a text copy or enter the administrator’s email to open a draft in their own email client. Sending is manual, so the interface does not falsely claim delivery. Staff would then review the request and arrange an interview.”

## 2:40–3:10 — Release and society information
**Show:** footer Rehome a pet; health/behaviour and reason fields; Our story and Contact FAQ.

“The release form reuses the same Field and RequestForm components, but collects different information about the pet and the reason for rehoming. It reminds owners to continue care until intake is agreed. Our story explains the mission and proposed facilities, while Contact includes a validated enquiry form and expandable answers to common questions.”

## 3:10–3:40 — Care and community
**Show:** open a care guide; check the readiness items; open community page and submit a sample review while signed in.

“The care page includes practical guides and a readiness checklist with immediate progress feedback. Member reviews are saved locally and identified as demo feedback. These additions support responsible ownership and give visitors useful reasons to explore beyond the directory.”

## 3:40–4:30 — Responsive design, code and limitations
**Show:** narrow the browser or use device mode; demonstrate mobile menu. Briefly show components.jsx, context.jsx and tests/logic.test.js in an editor.

“The layout changes from three columns to one on a small screen, and navigation collapses into a menu. Labelled inputs, focus outlines, descriptive image text and native dialogs support accessibility. CSS motion respects reduced-motion preferences. The structure separates page components, reusable UI, data and shared state. Tests cover combined filters, age boundaries, invalid form values and request content, and the main flows were also checked in a browser. No backend database is included because it is optional for this assignment. For real use, I would add secure server authentication, a database and verified email delivery. Source images and development assistance are acknowledged in the project credits. Thank you.”

## After recording

- Upload the video file to your Google Drive.
- Set appropriate viewer access for the lecturer and test the shared link.
- Paste that actual link into the report's page-1 Video URL field.
- Ensure the hosted website is also accessible to the lecturer.
- Do not submit an unfilled video field as a completed recording requirement.
