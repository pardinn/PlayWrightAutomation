import { test, expect } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";

test("Client App login", async ({ page }) => {
  const pom = new POManager(page);
  const username = "anshika@gmail.com";
  const password = "Iamking@000";
  const productName = "ADIDAS ORIGINAL";
  const loginPage = pom.getLoginPage();
  const dashboardPage = pom.getDashboardPage();
  const cartPage = pom.getCartPage();
  const checkoutPage = pom.getCheckoutPage();
  const ordersHistoryPage = pom.getOrdersHistoryPage();
  const paymentInfo = {
    cardNumber: "1234 5678 9012 3456",
    expiryMonth: "10",
    expiryYear: "24",
    cvvCode: "123",
    cardHolder: "Pardinn Hullkkan",
    couponCode: "FEELINGLUCKY",
  };
  const country = "India";

  await loginPage.goTo();
  await loginPage.validLogin(username, password);
  await dashboardPage.addProductToCart(productName);
  await dashboardPage.navigateToCart();
  await cartPage.validateProductAddedToCart(productName);
  await cartPage.checkout();

  // Homework. Fill out the Credit Card information
  const orderId = await checkoutPage.placeOrder(paymentInfo, country, username);
  console.log(orderId);

  // Homework: Navigate to the Orders tab, find the order and click on View
  await dashboardPage.navigateToOrders();

  await ordersHistoryPage.viewOrder(orderId);
  expect(await ordersHistoryPage.getOrderId()).toContainText(orderId);
});
