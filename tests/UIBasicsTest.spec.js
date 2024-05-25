import { test, expect } from "@playwright/test";

test("@Web Browser Context Playwright test", async ({ browser }) => {
  /**
   *  Use this when you have cookies, plugins or other settings that you want to pass to the context,
   *  otherwise, call the page directly.
   **/
  const context = await browser.newContext();
  const page = await context.newPage();
  //aborting calls demonstration
  page.route("**/*.{jpg,png,jpeg}", (route) => route.abort());
  const userName = page.getByLabel("Username:");
  const signIn = page.getByRole("button", { name: "Sign In" });
  const cardTitles = page.locator(".card-body a");
  page.on("request", (request) => console.log("request: ", request.url()));
  page.on("response", (response) => console.log("response: ", response.url(), response.status()));
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());

  await userName.fill("rahulshetty");
  await page.getByLabel("Password:").fill("learning");
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(1).textContent());
  const allTitles = cardTitles.allTextContents();
  console.log(await allTitles);
});

test("@Web Page Playwright test", async ({ page }) => {
  // Same as above, but leveraging the default settings from Playwright
  await page.goto("https://google.com");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.getByLabel("Username:");
  const signIn = page.getByRole("button", { name: "Sign In" });
  const documentLink = page.locator("[href*='documents-request']");
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");
  const userType = page.locator(".radiotextsty").last();
  const terms = page.locator("#terms");
  await userType.click();
  await page.locator("#okayBtn").click();
  console.log(await userType.isChecked());
  await expect(userType).toBeChecked();
  await terms.click();
  await expect(terms).toBeChecked();
  await terms.uncheck();
  await expect(terms).toBeChecked({ checked: false });
  await expect(documentLink).toHaveAttribute("class", "blinkingText");

  // await page.pause();
});

test("Child windows handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const documentLink = page.locator("[href*='documents-request']");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  /**
   * A Promise can have 3 states: pending, rejected, fulfilled.
   * Promise.all waits until all events are fulfilled.
   */
  const [newPage] = await Promise.all([context.waitForEvent("page"), documentLink.click()]);

  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  await page.getByLabel("Username:").type(domain);
});
