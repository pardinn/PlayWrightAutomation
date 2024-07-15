import { test, expect } from "@playwright/test";
import { test as customtest } from "../../utils/base-test";
import { POManager } from "../../pageobjects/POManager";
import fs from "fs";
const testData = fs.readFileSync("./utils/placeOrderTestData.json", "utf8");
const dataset = JSON.parse(testData);

for (const data of dataset) {
  test(`@Web Client App login - ${data.productName}`, async ({ page }) => {
    const pom = new POManager(page);
    const loginPage = pom.getLoginPage();
    const dashboardPage = pom.getDashboardPage();
    const cartPage = pom.getCartPage();
    const checkoutPage = pom.getCheckoutPage();
    const ordersHistoryPage = pom.getOrdersHistoryPage();

    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    await dashboardPage.addProductToCart(data.productName);
    await dashboardPage.navigateToCart();
    await cartPage.validateProductAddedToCart(data.productName);
    await cartPage.checkout();

    // Homework. Fill out the Credit Card information
    const orderId = await checkoutPage.placeOrder(
      data.paymentInfo,
      data.country,
      data.username,
    );
    console.log(orderId);

    // Homework: Navigate to the Orders tab, find the order and click on View
    await dashboardPage.navigateToOrders();

    await ordersHistoryPage.viewOrder(orderId);
    await expect(await ordersHistoryPage.getOrderId()).toContainText(orderId);
  });
}

customtest("Custom Client App login", async ({ page, testDataForOrder }) => {
  const pom = new POManager(page);
  const loginPage = pom.getLoginPage();
  const dashboardPage = pom.getDashboardPage();
  const cartPage = pom.getCartPage();

  await loginPage.goTo();
  await loginPage.validLogin(
    testDataForOrder.username,
    testDataForOrder.password,
  );
  await dashboardPage.addProductToCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();
  await cartPage.validateProductAddedToCart(testDataForOrder.productName);
  await cartPage.checkout();
});
