import { test, expect } from "@playwright/test";

test("Popup validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // await page.goto("https://google.com/");
  // await page.goBack();
  // await page.goForward();
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
  await page.getByRole("button", { name: "Hide" }).click();
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();

  await page.pause();
  page.on("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Confirm" }).click();
  await page.locator("#mousehover").hover();
});
