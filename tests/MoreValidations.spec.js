import { test, expect } from "@playwright/test";

test("Popup validations", async ({ page }) => {
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
  const textCheck = await framesPage.getByRole("heading", { name: "Happy Subscibers" }).textContent();
  console.log(textCheck.split(" ")[1]);
});
