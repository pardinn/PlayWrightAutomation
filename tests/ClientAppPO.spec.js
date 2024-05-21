import { test, expect } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";
const dataset = JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json")));

for (const data of dataset) {
  test(`Client App login - ${data.productName}`, async ({ page }) => {
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
    const orderId = await checkoutPage.placeOrder(data.paymentInfo, data.country, data.username);
    console.log(orderId);

    // Homework: Navigate to the Orders tab, find the order and click on View
    await dashboardPage.navigateToOrders();

    await ordersHistoryPage.viewOrder(orderId);
    expect(await ordersHistoryPage.getOrderId()).toContainText(orderId);
  });
}
