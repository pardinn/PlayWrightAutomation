import { test, expect } from "@playwright/test";

test("Browser Context-Validating Error login", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});
