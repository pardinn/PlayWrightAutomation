import { test, expect } from "@playwright/test";
import APIUtils from "../../utils/APIUtils";
const loginPayload = {
  userEmail: "gqwewhdonyuqovmqud@ytnhy.com",
  userPassword: "Iamking@000",
};
const fakePayloadOrders = { data: [], message: "No Orders" };
let response;
let productId;

test.beforeAll(async ({ request }) => {
  const apiUtils = new APIUtils(request, loginPayload);
  // Dynamically fetch the product ID instead of hardcoding it
  productId = await apiUtils.getProductId("ADIDAS ORIGINAL");
  const orderPayload = {
    orders: [{ country: "Brazil", productOrderedId: productId }],
  };
  response = await apiUtils.createOrder(orderPayload);
});

test("Client App login", async ({ page }) => {
  await page.addInitScript((value) => {
    // eslint-disable-next-line no-undef
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");

  // Mocking the API response
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request());
      await route.fulfill({
        response,
        body: JSON.stringify(fakePayloadOrders),
      });
      //intercepting the response - API response->{playwright fake response}->browser->render data on front end
    },
  );
  await page.getByRole("button", { name: "Orders" }).click();
  await expect(
    page.getByText("You have no orders to show at this time."),
  ).toBeVisible();
});
