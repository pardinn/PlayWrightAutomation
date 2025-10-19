import { test, expect } from "@playwright/test";
import APIUtils from "../../utils/APIUtils";
const loginPayload = {
  userEmail: "gqwewhdonyuqovmqud@ytnhy.com",
  userPassword: "Iamking@000",
};
const orderPayload = {
  // ID for ADIDAS ORIGINAL
  orders: [{ country: "Brazil", productOrderedId: "68a961719320a140fe1ca57c" }],
};
let response;

test.beforeAll(async ({ request }) => {
  const apiUtils = new APIUtils(request, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test("@API Client App login", async ({ page }) => {
  await page.addInitScript((value) => {
    // eslint-disable-next-line no-undef
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(response.orderId);

  // Homework: Navigate to the Orders tab, find the order and click on View
  await page.getByRole("button", { name: "Orders" }).click();
  await page
    .locator("tr")
    .filter({ hasText: response.orderId })
    .getByRole("button", { name: "View" })
    .click();
  await expect(page.getByText(`Order Id${response.orderId}`)).toBeVisible();
  await expect(page.getByText("Country - Brazil").first()).toBeVisible();
});
