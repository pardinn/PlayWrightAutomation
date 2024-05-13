import { test, expect } from "@playwright/test";
const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderPayload = { orders: [{ country: "Brazil", productOrderedId: "6581ca979fd99c85e8ee7faf" }] };
let token;
let orderId;

test.beforeAll(async ({ request }) => {
  // Login API
  const loginResponse = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
    data: loginPayload,
  });
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
  console.log(token);

  // Create Order API
  const orderResponse = await request.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
    data: orderPayload,
    headers: { Authorization: token, "Content-Type": "application/json" },
  });
  const orderResponseJson = await orderResponse.json();
  console.log(orderResponseJson);
  orderId = orderResponseJson.orders[0];
});

test("Client App login", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(orderId);

  // Homework: Navigate to the Orders tab, find the order and click on View
  await page.getByRole("button", { name: "Orders" }).click();
  await page.locator("tr").filter({ hasText: orderId }).getByRole("button", { name: "View" }).click();
  await expect(page.getByText(`Order Id${orderId}`)).toBeVisible();
  await expect(page.getByText("Country - Brazil").first()).toBeVisible();
});
