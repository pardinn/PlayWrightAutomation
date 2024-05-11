import { test, expect } from "@playwright/test";

test.only("Client App login", async ({ page }) => {
  const productName = "ADIDAS ORIGINAL";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  // method 1 for waiting (discouraged)
  // await page.waitForLoadState("networkidle");
  // method 2 for waiting
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; i++) {
    await page.pause();
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products
        .nth(1)
        .getByRole("Button", { name: "Add To Cart" })
        .click();
      break;
    }
  }
});
