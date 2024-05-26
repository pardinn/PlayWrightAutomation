import { expect } from "@playwright/test";
import playwright from "@playwright/test";
import { Given, When, Then } from "@cucumber/cucumber";
import { POManager } from "../../pageobjects/POManager.js";
import dataSet from "../../utils/placeOrderTestData.json" assert { type: "json" };
const data = JSON.parse(JSON.stringify(dataSet))[0];

Given(
  "I log into the Ecommerce application with {string} and {string}",
  { timeout: 20 * 1000 },
  async function (username, password) {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    this.pom = new POManager(page);
    const loginPage = this.pom.getLoginPage();

    await loginPage.goTo();
    await loginPage.validLogin(username, password);
  }
);

When("I add {string} to Cart", async function (productName) {
  this.dashboardPage = this.pom.getDashboardPage();
  await this.dashboardPage.addProductToCart(productName);
});

Then("I should see {string} displayed in the Cart", async function (productName) {
  this.cartPage = this.pom.getCartPage();
  await this.dashboardPage.navigateToCart();
  await this.cartPage.validateProductAddedToCart(productName);
});

When("I enter valid details and Place the Order", async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.cartPage.checkout();

  // Homework. Fill out the Credit Card information
  this.checkoutPage = this.pom.getCheckoutPage();
  this.orderId = await this.checkoutPage.placeOrder(data.paymentInfo, data.country, data.username);
});

Then("I verify the order is present in the OrderHistory", async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.dashboardPage.navigateToOrders();

  this.ordersHistoryPage = this.pom.getOrdersHistoryPage();
  this.ordersHistoryPage.viewOrder(this.orderId);
  expect(await this.ordersHistoryPage.getOrderId()).toContainText(this.orderId);
});
