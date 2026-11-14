import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

async function route(page, path) {
  await page.evaluate((path) => { location.hash = path; }, path);
  await expect(page).toHaveURL(new RegExp(`#${path.replace(/[?]/g, "\\?")}$`));
}
async function signup(page) {
  await page.getByLabel("Full name").fill("Demo Member");
  await page.getByLabel("Email address").fill("demo@example.com");
  await page.getByLabel(/^Password/).fill(" demo123 ");
  await page.getByLabel("Confirm password").fill(" demo123 ");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Create my account" }).click();
}
async function prepare(page) {
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Review request" }).click();
  await expect(page.getByRole("button", { name: "Edit details" })).toBeVisible();
  await expect(page.getByLabel("Review request", { exact: true })).toBeFocused();
  await page.getByRole("button", { name: "Edit details" }).click();
  await expect(page.getByLabel("Full name")).toBeFocused();
  await page.getByRole("button", { name: "Review request" }).click();
  await page.getByRole("button", { name: "Prepare email request" }).click();
  await expect(page.getByText("not sent an email", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Request prepared", { exact: true })).toBeFocused();
  // Exercise the real clipboard API, reading back only the sample just copied.
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "Copy request", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Request copied.");
  // Windows clipboard text uses CRLF; compare the request content across platforms.
  const copied = (await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, "\n");
  expect(copied).toContain("student demonstration request");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download request" }).click();
  const saved = await download;
  expect(saved.suggestedFilename()).toMatch(/^pet-heaven-.*\.txt$/);
  expect(await readFile(await saved.path(), "utf8")).toBe(copied);
  await page.getByRole("button", { name: "Open default email app" }).click();
  await expect(page.getByText("Enter a valid administrator email first.")).toBeVisible();
  const recipient = page.getByLabel("Administrator’s email (supplied by you)");
  await recipient.fill("invalid-email");
  await page.getByRole("link", { name: "Open Gmail draft" }).click();
  await expect(recipient).toBeFocused();
  await expect(recipient).toHaveAttribute("aria-invalid", "true");
  expect(page.context().pages()).toHaveLength(1);
  await recipient.fill(" staff+demo@example.com ");

  // Inspect the real popup URL while keeping synthetic requests out of Gmail.
  const gmailPattern = "https://mail.google.com/mail/**";
  await page.context().route(gmailPattern, (route) => route.fulfill({
    contentType: "text/html", body: "Gmail draft navigation intercepted for testing.",
  }));
  const newTab = page.context().waitForEvent("page");
  await page.getByRole("link", { name: "Open Gmail draft" }).click();
  const gmail = await newTab;
  await gmail.waitForURL((url) => url.hostname === "mail.google.com");
  const gmailDraft = new URL(gmail.url());
  expect(gmailDraft.protocol).toBe("https:");
  expect(gmailDraft.pathname).toBe("/mail/");
  expect(gmailDraft.searchParams.get("view")).toBe("cm");
  expect(gmailDraft.searchParams.get("to")).toBe("staff+demo@example.com");
  expect(gmailDraft.searchParams.get("body")).toBe(copied);
  await gmail.close();
  await page.context().unroute(gmailPattern);

  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Page.enable");
  const requested = new Promise((resolve) => cdp.on("Page.frameRequestedNavigation", resolve));
  await page.getByRole("button", { name: "Open default email app" }).click();
  const draft = new URL((await requested).url);
  expect(draft.protocol).toBe("mailto:");
  expect(decodeURIComponent(draft.pathname)).toBe("staff+demo@example.com");
  expect(draft.searchParams.get("subject")).toBe(gmailDraft.searchParams.get("su"));
  expect(draft.searchParams.get("body")).toBe(copied);
  await cdp.detach();
}

test("all routes, bundled images, clean console and responsive layouts", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/pets", "/saved", "/about", "/contact", "/care", "/community", "/credits", "/login", "/signup", "/adopt/buddy", "/release", "/missing", "/adopt/missing"]) {
      await page.goto(`./#${path}`);
      await expect(page.locator("h1")).toBeVisible();
      await page.locator("img").evaluateAll(async (images) => {
        for (const img of images) { img.loading = "eager"; await img.decode(); }
      });
      await page.evaluate(() => document.fonts.ready);
      const overflowing = await page.locator("body *").evaluateAll((elements) => elements
        .filter((e) => e.getBoundingClientRect().right > innerWidth + 1)
        .map((e) => ({ tag: e.tagName, class: String(e.className), right: e.getBoundingClientRect().right })));
      expect(overflowing, `${width} ${path} overflow`).toEqual([]);
    }
  }
  await page.goto("./#broken");
  await expect(page.getByRole("heading", { name: "This trail leads nowhere." })).toBeVisible();
  expect(errors).toEqual([]);
});

test("directory search, filters, sort, saved persistence and modal keyboard focus", async ({ page }) => {
  await page.goto("./#/pets");
  await page.getByRole("button", { name: "Cats", exact: true }).click();
  await page.getByRole("textbox", { name: "Search pets" }).fill(" Luna ");
  await expect(page.locator(".pet-card")).toHaveCount(1);
  const trigger = page.getByRole("button", { name: "Meet Luna", exact: true });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Meet Luna" })).toBeVisible();
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => !!document.activeElement.closest("dialog"))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.getByRole("button", { name: "Save Luna", exact: true }).click();
  await route(page, "/saved");
  await page.reload();
  await expect(page.locator(".pet-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Unsave Luna", exact: true }).click();
  await expect(page.getByText("Tap the heart on a pet card")).toBeVisible();
  await route(page, "/pets");
  await page.getByRole("textbox", { name: "Search pets" }).fill("no such pet");
  await expect(page.getByRole("heading", { name: "No little souls found." })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByLabel("Age").selectOption("Senior");
  await expect(page.locator(".pet-title h3")).toHaveText(["Daisy"]);
  await page.getByLabel("Age").selectOption("All");
  await page.getByLabel("Sort by").selectOption("Name A–Z");
  await expect(page.locator(".pet-title h3")).toHaveText(["Buddy", "Daisy", "Luna", "Milo", "Mochi", "Oliver"]);
});

test("member gate, sign-up, adoption review/edit/download, feedback and login", async ({ page }) => {
  await page.goto("./#/adopt/luna");
  await page.getByRole("link", { name: "Become a member", exact: true }).click();
  await page.getByRole("button", { name: "Create my account" }).click();
  await expect(page.getByLabel("Full name")).toBeFocused();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(4);
  await signup(page);
  await expect(page.getByRole("heading", { name: "A home for Luna." })).toBeVisible();
  await page.getByRole("button", { name: "Review request" }).click();
  await expect(page.getByLabel("Contact number")).toBeFocused();
  await page.getByLabel("Contact number").fill("81234567");
  await page.getByLabel("Your age").fill("20");
  await page.getByRole("button", { name: "Review request" }).click();
  await expect(page.getByText("Enter a whole number between 21 and 100.")).toBeVisible();
  await page.getByLabel("Your age").fill("23");
  await page.getByLabel("Home type").selectOption("HDB flat");
  await page.getByLabel("Household / landlord agreement").selectOption("Yes, all necessary agreement obtained");
  await page.getByLabel("Pet-care experience and daily routine").fill("Daily feeding, play and appropriate veterinary care.");
  await page.getByLabel("Why would your home suit Luna?").fill("A calm home with safe indoor space and daily company.");
  await prepare(page);
  await expect(page.locator(".form-card")).toContainText("Your request is prepared.");
  await route(page, "/community");
  await page.getByLabel("Your rating").selectOption("");
  await page.getByLabel("Your feedback").fill("Helpful profiles and useful care guidance.");
  await page.getByRole("button", { name: "Share feedback" }).click();
  await expect(page.getByText("Choose a rating from 1 to 5")).toBeVisible();
  await page.getByLabel("Your rating").selectOption("4");
  await page.getByRole("button", { name: "Share feedback" }).click();
  await expect(page.locator(".feedback-card")).toHaveCount(1);
  await page.setViewportSize({ width: 320, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Toggle navigation" }).click();
  await page.getByRole("button", { name: "Log out", exact: true }).click();
  await page.setViewportSize({ width: 1280, height: 900 });
  await route(page, "/login");
  await page.getByLabel("Email address").fill("demo@example.com");
  await page.getByLabel(/^Password/).fill("incorrect");
  await page.getByRole("button", { name: "Log in", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("does not match");
  await page.getByLabel(/^Password/).fill(" demo123 ");
  await page.getByRole("button", { name: "Log in", exact: true }).click();
  await expect(page).toHaveURL(/#\/pets$/);
  await page.reload();
  await route(page, "/adopt/luna");
  await expect(page.getByRole("heading", { name: "Let’s make it official." })).toBeVisible();
});

test("release and enquiry requests, care checklist and browser navigation", async ({ page }) => {
  await page.goto("./#/release");
  await page.getByRole("button", { name: "Review request" }).click();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(8);
  for (const [label, value] of [["Full name", "Demo Owner"], ["Email address", "owner@example.com"], ["Contact number", "81234567"], ["Pet name", "Sample Cat"], ["Pet age (years)", "0.5"], ["Health, vaccination and behaviour information", "Sample vaccination record and a gentle indoor routine."], ["Reason for release and current care arrangements", "Temporary care remains available while discussing rehoming."]]) {
    await page.getByLabel(label).fill(value);
  }
  await page.getByLabel("Pet type").selectOption("Cat");
  await prepare(page);
  await route(page, "/contact");
  await page.getByLabel("Full name").fill("Demo Visitor");
  await page.getByLabel("Email address").fill("visitor@example.com");
  await page.getByLabel("How can we help?").fill("Please explain adoption review & interview options.");
  await prepare(page);
  await route(page, "/care");
  await page.getByRole("button", { name: "Read the guide" }).first().click();
  await page.keyboard.press("Escape");
  for (const box of await page.getByRole("checkbox").all()) await box.check();
  await expect(page.getByText("4 of 4 things considered")).toBeVisible();
  await route(page, "/about");
  await page.goBack();
  await expect(page.getByText("4 of 4 things considered")).not.toBeVisible();
  await expect(page).toHaveURL(/#\/care$/);
  await page.goForward();
  await expect(page).toHaveURL(/#\/about$/);
  await page.reload();
  await expect(page.getByRole("heading", { name: "Second chances. Lasting love." })).toBeVisible();
});

test("mobile menu keyboard, reduced motion and malformed browser storage", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");
  const menu = page.getByRole("button", { name: "Toggle navigation" });
  await menu.click();
  await expect(page.getByRole("navigation").getByRole("link", { name: "Log in", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole("navigation").getByRole("link", { name: "Saved pets (0)", exact: true }).click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await page.locator("main").evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
  await page.evaluate(() => {
    localStorage.setItem("ph-saved", '{}');
    localStorage.setItem("ph-feedback", '[{"rating":999}]');
  });
  await page.reload();
  await expect(page.getByRole("heading", { name: "Your saved little souls." })).toBeVisible();
  await route(page, "/community");
  await expect(page.getByRole("heading", { name: "Be the first to share." })).toBeVisible();
});

test("blocked or unavailable clipboard offers selected manual copy text on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./#/contact");
  await page.getByLabel("Full name").fill("Demo Visitor");
  await page.getByLabel("Email address").fill("visitor@example.com");
  await page.getByLabel("How can we help?").fill("Please explain adoption review & interview options.");
  await prepare(page);
  await page.evaluate(() => Object.defineProperty(navigator.clipboard, "writeText", {
    configurable: true,
    value: () => Promise.reject(new DOMException("Clipboard blocked", "NotAllowedError")),
  }));
  await page.getByRole("button", { name: "Copy request", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Automatic copying is unavailable.");
  const manual = page.getByLabel("Prepared request text");
  await expect(manual).toHaveValue(/adoption review & interview options/);
  await expect(manual).toBeFocused();
  expect(await manual.evaluate((el) => el.selectionStart === 0 && el.selectionEnd === el.value.length)).toBe(true);
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", {
    configurable: true, value: undefined,
  }));
  await page.getByRole("button", { name: "Copy request", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Automatic copying is unavailable.");
  await expect(manual).toBeFocused();
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.getByRole("button", { name: "Back to review" }).click();
  await page.getByRole("button", { name: "Prepare email request" }).click();
  await expect(manual).toHaveCount(0);
  await expect(page.getByRole("status")).toHaveCount(0);
});
