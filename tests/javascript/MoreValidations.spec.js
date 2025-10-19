import { test, expect } from "@playwright/test";

/// test.describe.configure({mode: 'parallel'}) -- specific to this file
test.describe.configure({ mode: "serial" }); // interdependent mode. Will skip the next tests if a test fails

test.skip("Popup validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // await page.goto("https://google.com/");
  // await page.goBack();
  // await page.goForward();
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
  await page.getByRole("button", { name: "Hide" }).click();
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();

  page.on("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Confirm" }).click();
  await page.locator("#mousehover").hover();

  const framesPage = page.frameLocator("#courses-iframe");
  await framesPage.locator("li a[href*='lifetime-access']:visible").click();
  const textCheck = await framesPage
    .getByRole("heading", { name: "Happy Subscibers" })
    .textContent();
  console.log(textCheck.split(" ")[1]);
});

test("@Web Screenshot & Visual comparison", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
  await page
    .getByPlaceholder("Hide/Show Example")
    .screenshot({ path: "test-results/elementScreenshot.png" });
  await page.getByRole("button", { name: "Hide" }).click();
  await page.screenshot({
    path: "test-results/screenshot.png",
    fullPage: true,
  });
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
});

test.fixme("Visual testing - Flaky", async ({ page }) => {
  await page.goto("https://google.com/");
  await expect(page).toHaveScreenshot("landing.png", {
    animations: "disabled",
  });
});
