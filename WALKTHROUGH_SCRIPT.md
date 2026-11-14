# Pet Heaven — final website walkthrough and narration

**Lim EnLe · UOW ID 1036488 · SIM–UOW ISIT207 Assignment 3**

**Record this website:** https://leafyve.github.io/pet-heaven/

**Source:** https://github.com/leafyve/pet-heaven

Suggested duration: approximately **8–10 minutes**, allowing time to enter sample data. These are rehearsal timings, not an assignment-imposed limit. Follow any duration specified by your lecturer. Read only the **Say** passages aloud; the **Click / show** instructions are recording cues. Adapt the wording to your own understanding and keep the development-assistance acknowledgement.

## Before pressing Record

1. Open the public website in a **fresh private/incognito window**. This gives you an empty saved list and feedback feed, with no member logged in. Keep that same window open throughout the recording.
2. Start at desktop width, ideally 1366px or wider, at 100% browser zoom. Leave the address bar visible to establish the public GitHub Pages URL. Close unrelated tabs and hide notifications.
3. Record the website and your microphone. Keep this guide on another screen or device so it is not part of the screen capture. Test a short recording for readable text and clear audio.
4. Copy the sample entries below into a separate note for quick pasting. Pause briefly after each click so the viewer can see the result.
5. **Do not refresh, close the tab or type a new full URL after registration until the login demonstration is complete.** Accounts exist only in React memory. Use the website's links for navigation. Leave the refresh/deep-link demonstration until the end.
6. Use invented details. `demo@example.com` below is a sample account identifier; `81234567` is an illustrative number, not a contact to call. Do not send any email during this demonstration.

### Sample entries to keep ready

| Field | Enter |
|---|---|
| Full name | `Demo Member` |
| Email address | `demo@example.com` |
| Password and confirmation | `DemoPets207!` — disposable demonstration password only |
| Deliberately incorrect login password | `WrongPets207!` |
| Contact number | `81234567` — sample only |
| Your age | First `20` to show validation; correct to `23`; change to `24` during review/edit |
| Home type | `HDB flat` |
| Household / landlord agreement | `Yes, all necessary agreement obtained` |
| Pet-care experience and daily routine | `I can provide daily feeding, playtime and regular veterinary care.` |
| Why would your home suit Luna? | `My home is quiet, with secure windows and space for indoor play.` |
| Release: pet name | `Mittens` |
| Release: pet type and age | `Cat`, `2` |
| Release: health, vaccination and behaviour information | `This is a fictional cat with a gentle indoor routine and sample vaccination information.` |
| Release: reason and current care arrangements | `This is a sample rehoming request. I will continue daily care while arrangements are discussed.` |
| Member feedback | `The pet profiles and readiness checklist are clear and helpful.` |

## 1. Home and purpose — about 0:00–0:35

**Click / show**

1. Begin at the home page with the public URL visible.
2. Point briefly to the main heading and **Find your best friend** button.
3. Scroll slowly to the featured pets and the three adoption steps. Do not open a profile yet.

**Say**

> Hello, I’m Lim EnLe, UOW ID 1036488. This is my ISIT207 Assignment 3 website, Pet Heaven, deployed publicly on GitHub Pages. Pet Heaven is a fictional charity supporting abandoned cats and dogs. The application helps visitors understand the society, find a suitable pet and prepare an adoption or release request. The cream, forest-green and sage palette creates a welcoming identity, while the main action makes pet discovery easy to find.

## 2. Mission, facilities and contact — about 0:35–1:10

**Click / show**

1. Scroll to the top and click **Our story**.
2. Show the mission, then scroll to the facilities: comfortable living spaces, room to play, welfare first and meet-and-greet space.
3. Return to the top and click **Contact**. Point to the enquiry form and the demonstration notice.
4. Scroll to the FAQs and expand **Do I need to be a member?**

**Say**

> Our Story explains the mission and the proposed facilities. These operational details are fictional assumptions for the assignment. Contact provides an enquiry form and expandable answers to common questions. Visitors can browse freely, but membership is required for adoption. The page also makes clear that this demonstration does not represent a real staffed inbox or shelter address.

## 3. Search, filters, sorting, profiles and saved pets — about 1:10–2:20

**Click / show**

1. Click **Find a pet** in the header. There are six fictional profiles.
2. In **Search pets**, type `zzzz`. Pause on **No little souls found.** Click **Clear filters**.
3. Set **Age** to **Senior**. Show Daisy, then return Age to **All**.
4. Set **Sort by** to **Youngest first**. Briefly show the reordered cards.
5. Click **Cats**, then enter `Luna` in the search box. Only Luna remains.
6. Click Luna's photograph. Show her age, gender, size, energy and ideal home.
7. Press **Tab** two or three times to show the focus outline staying among the dialog controls. Press **Escape** to close it.
8. Click the heart on Luna's card. Click the heart in the desktop header, which is labelled **Saved pets (1)**, to open the saved directory. The footer's **Saved pets** link is an alternative.

**Say**

> The directory renders pet records dynamically using reusable cards. Search, species and age filters can be combined, and results can be sorted. An empty result provides a clear way to reset the filters. Each profile opens in a shared dialog with more detail about the pet and its ideal home. Keyboard focus stays within the dialog, and Escape closes it. The heart saves a favourite in this browser, and the saved directory reuses the same card and filtering components.

**Check before continuing:** the saved directory shows Luna and you are still logged out.

## 4. Membership gate and sign-up — about 2:20–3:10

**Click / show**

1. From Saved pets, click Luna's photograph again, then **Apply to adopt Luna**.
2. Show the membership gate, then click **Become a member**.
3. Click **Create my account** with the form empty. Pause on the required-field and consent messages.
4. Enter the sample name, email and matching passwords from the table. Tick the demonstration/privacy agreement.
5. Click **Create my account**. You should arrive at **A home for Luna.**

**Say**

> An anonymous visitor must join or log in before applying. The application remembers Luna while taking me through registration. Submitting an empty form shows useful field-level errors. Registration checks the email, password length, confirmation and consent. After registration, I return to Luna's application. This is a frontend demonstration account held in memory for this page session, not secure production authentication.

## 5. Adoption validation, review, editing and export — about 3:10–4:50

**Click / show**

1. Point to Luna's photograph and name beside the form. Name and email are already filled from the member session.
2. Fill the remaining fields using the sample table, initially entering **20** for Your age. Tick the confirmation checkbox and click **Review request**.
3. Show **Enter a whole number between 21 and 100.** Change age to **23**, then click **Review request** again.
4. On the review screen, point to **Pet: Luna** and the entered details.
5. Click **Edit details**, change age to **24**, then click **Review request** again. Show the updated age.
6. Click **Prepare email request**. Pause on **Your request is prepared** and **not sent an email**.
7. Click **Download request**. Briefly open the downloaded `pet-heaven-adoption.txt` in a text viewer to show Luna's name and the entered details. Return to the same browser tab.
8. Leave **Administrator’s email (supplied by you)** empty and click **Open email draft** once to show recipient validation.

**Say**

> The adoption request is tied to Luna and asks about my home, routine and care experience. Here, age twenty is rejected because the proposed minimum age is twenty-one. Once valid, I can review the details and edit them before preparing the request. The prepared screen explicitly says no email has been sent. The text download includes the chosen pet and the application details. To open an email draft, the visitor must supply a recipient address; the application does not invent an administrator's inbox.

### Email-draft demonstration: choose the appropriate option

**Recommended if no real administrator address is supplied:** show the download and the empty-recipient error, then explain the email option without opening an external app.

**Say**

> With a recipient address and a configured email app, this button opens a prefilled draft. The visitor must review and send it manually. A draft is not proof of delivery. For this recording, I’m demonstrating the download and validation without sending a message.

**Optional if you want to demonstrate the actual draft:** rehearse before recording using an inbox you control. Enter that address, click **Open email draft**, show the populated subject and body, then close or discard the draft **without sending**. An operating-system prompt may ask you to choose a mail app. If no mail handler opens, use the download and the recommended narration above. Do not describe your own address as Pet Heaven's real administrator.

## 6. Pet-release request — about 4:50–5:50

**Click / show**

1. Scroll to the footer and click **Rehome a pet**.
2. Point to the reminder about continuing to care for the pet until arrangements are confirmed.
3. Name and email should be prefilled. Fill the contact number and all release fields with the sample Mittens details above.
4. Tick the confirmation checkbox. Click **Review request**, briefly show the release details, then **Prepare email request**.
5. Show the prepared state. Optionally download `pet-heaven-release.txt`; there is no need to repeat the entire email explanation.

**Say**

> The release form collects information about the pet's age, health, behaviour and current care arrangements. It reminds owners that a request does not guarantee immediate intake. Adoption and release use the same RequestForm and Field components with different field definitions. This keeps validation, review and request preparation consistent while avoiding duplicated form logic.

## 7. Pet-care content and readiness checklist — about 5:50–6:30

**Click / show**

1. Return to the top and click **Pet care**.
2. Under **Your first week together**, click **Read the guide**. Show the practical steps and click **Got it**.
3. Scroll to **Ready for a new companion?** Tick the four checklist items one at a time.
4. Pause on **4 of 4 things considered** and the completed progress bar.

**Say**

> The care page adds educational content beyond the basic directory. Visitors can open practical guides and consider the time, budget and household commitment involved. The readiness checklist updates its progress immediately. It supports reflection and preparation; completing it is not an adoption assessment or approval.

## 8. Member feedback — about 6:30–7:00

**Click / show**

1. In the footer, click **Our community**.
2. Show the explanation that feedback stays in this browser.
3. Leave **Your rating** at **5** and paste the sample member feedback.
4. Click **Share feedback**. Show the new entry and the saved confirmation.

**Say**

> Signed-in members can leave a rating and feedback about the demonstration website. This entry is my sample review created during the recording. Feedback is stored only in this browser and is not published to a shared server. The site does not use invented testimonials to imply real charity outcomes.

## 9. Logout and login — about 7:00–7:35

**Click / show**

1. Return to the top. Click **Log out** in the **upper-right account area**.
2. Click **Log in** in that same area.
3. Enter `demo@example.com` and the deliberately wrong password `WrongPets207!`. Click the form's **Log in** button and pause on the mismatch message.
4. Correct the password to `DemoPets207!` and click **Log in** again.
5. Show the return to the pet directory and the member controls.

**Say**

> Logout removes the active member session. A wrong password produces an error, while the account registered earlier in this same page visit can log back in. These credentials are not saved in localStorage and disappear on a full refresh. A real charity service would need secure authentication and server-side authorisation.

## 10. Mobile layout and SPA navigation — about 7:35–8:20

**Click / show**

1. Narrow the browser to approximately **390 pixels**, or use the browser's responsive device view. Rehearse the resizing before recording so the menu is easy to reach.
2. Click the hamburger button, labelled **Toggle navigation**. Show that **Saved pets**, **Community**, **Rehome a pet** and member **Log out** remain reachable.
3. Click **Our story** in the menu. Show the stacked mobile content. Use the browser's **Back**, then **Forward** buttons to demonstrate route history.
4. Restore desktop width. **Now that the login demonstration is finished**, refresh the About page. Its direct link is `https://leafyve.github.io/pet-heaven/#/about`.
5. Optionally show that Luna remains in **Saved pets** after refresh, while the member session has cleared. Do not attempt another login without registering again.

**Say**

> The layout adapts for smaller screens, with stacked content and a menu that retains important actions. The application uses URL hash routing, so browser history works and direct links can be refreshed on static GitHub Pages hosting. Saved pets persist in this browser, while the demonstration account clears on refresh. Visible focus indicators, labelled controls and reduced-motion support are also included.

## 11. Components, verification and acknowledgement — about 8:20–9:20

**Click / show**

1. Briefly show the local source in your editor, or use the repository's file browser. Prepare these files beforehand so you do not spend time searching:
   - `src/components.jsx`: point to `PetCard` and `Field` or `Modal`.
   - `src/pages.jsx`: point to `RequestForm` and the different adoption/release field definitions.
   - `src/context.jsx`: point to `AppProvider`, member state and browser-local saved/feedback state.
   - `TEST_RESULTS.md`: point to the six logic tests and five browser integration tests. Alternatively show a successful **Build and deploy Pet Heaven** run in GitHub Actions; open it before recording rather than waiting for a new build.
2. Return to the website. In the footer, open **Credits & privacy** and show **Implementation acknowledgement**.

**Say**

> The code separates reusable interface components, page components, pet data and shared state. Props pass pet details into cards, while Context shares the member session, saved pets and feedback. One configurable request component serves adoption, release and enquiries. Verification includes a production build, six logic tests and five browser integration tests, with responsive and accessibility checks documented in the project. There is no backend database or automatic email delivery. Photography, icons, course references and ChatGPT development assistance are acknowledged in the credits. Thank you for watching.

## If something interrupts the recording

| Situation | What to do |
|---|---|
| You refreshed after sign-up and login now fails | The demo account was cleared. Restart from a fresh private window and register again, or explain the reset and create a new sample account. Do not claim the password is stored permanently. |
| Luna's heart is already filled or the feedback feed contains old entries | Start a fresh private session before recording; close all existing private windows first if your browser shares storage between them. Do not refresh mid-recording to try to clear browser storage. |
| An invalid field blocks review | Correct the highlighted field, check that all required fields and the confirmation checkbox are complete, then click Review request again. Text areas need meaningful sample text, not just one word. |
| The mail app does not open | Use Download request and explain that a configured email handler is required. No message has been sent. |
| The browser asks where to save a download | Save the `.txt` file and continue. Rehearse this once to avoid a long pause on camera. |
| You accidentally leave a form before review | Unsaved form details are not persisted. Return and re-enter the sample data; do not describe them as saved on a server. |
| You need a shorter video | Keep the home, society information, directory/profile, membership gate, adoption review/edit/export and release flow. Shorten repeated typing or the code tour; retain the demo and assistance disclosures. Follow any lecturer-specified duration. |

## After recording

1. Play the video back. Check the voice, readable text, visible clicks and that the selected pet and validation messages can be seen.
2. Upload the actual video to Google Drive and set the lecturer's required viewer access. Test the shared link in a signed-out browser if access is link-based.
3. Open `ISIT207_LimEnLe_1036488.pdf` in the parent submission folder. Paste the real Drive URL into its page-1 **Google Drive screen-recording URL** field. Keep the website field as the GitHub Pages URL.
4. Save, close and reopen the PDF to check both links. Update the PDF inside your submission ZIP as well; adding a video link to the loose PDF does not change an existing ZIP.
5. Review the final report and acknowledgement, then submit the required files through Moodle. This script is not a recording or an upload; no video URL is invented.

---

**Guide verification:** button labels, sample adoption/release data, account flows, care checklist and mobile navigation were checked against the public GitHub Pages application on 14 November 2026. The timings are estimates, not a measured recording. Website code and hosting configuration were not changed for this guide.
