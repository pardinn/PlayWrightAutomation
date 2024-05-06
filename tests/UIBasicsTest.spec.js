import { test, expect } from "@playwright/test";

test("Browser Context Playwright test", async ({ browser }) => {
  /**
   *  Use this when you have cookies, plugins or other settings that you want to pass to the context,
   *  otherwise, call the page directly.
   **/
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.getByLabel("Username:");
  const signIn = page.getByRole("button", { name: "Sign In" });
  const cardTitles = page.locator(".card-body a");
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

test("Page Playwright test", async ({ page }) => {
  // Same as above, but leveraging the default settings from Playwright
  await page.goto("https://google.com");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test.only("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.getByLabel("Username:");
  const signIn = page.getByRole("button", { name: "Sign In" });
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();

  await page.pause();
});
