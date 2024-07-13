import { test, expect } from "@playwright/test";

test("Security test request intercept", async ({ page }) => {
  // login and reach the orders page
  const email = "gqwewhdonyuqovmqud@ytnhy.com";
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  await page.locator(".card-body b").first().waitFor();
  await page.getByRole("button", { name: "Orders" }).click();

  // intercepting the request and sending something different to the server
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    async (route) => {
      await route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6",
      });
    },
  );
  await page.getByRole("button", { name: "View" }).first().click();
  await expect(
    page.getByText("You are not authorize to view this order"),
  ).toBeVisible();
});
