import { expect } from "@playwright/test";
import { Given, When, Then } from "@cucumber/cucumber";
import dataSet from "../../utils/placeOrderTestData.json" assert { type: "json" };
const data = JSON.parse(JSON.stringify(dataSet))[0];

Given(
  "I log into the Ecommerce application with {string} and {string}",
  { timeout: 10 * 1000 },
  async function (username, password) {
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

When("I enter valid details and Place the Order", { timeout: 10 * 1000 }, async function () {
  await this.cartPage.checkout();

  this.checkoutPage = this.pom.getCheckoutPage();
  this.orderId = await this.checkoutPage.placeOrder(data.paymentInfo, data.country, data.username);
});

Then("I verify the order is present in the OrderHistory", async function () {
  await this.dashboardPage.navigateToOrders();

  this.ordersHistoryPage = this.pom.getOrdersHistoryPage();
  this.ordersHistoryPage.viewOrder(this.orderId);
  expect(await this.ordersHistoryPage.getOrderId()).toContainText(this.orderId);
});

Given("I log into the Ecommerce2 application with {string} and {string}", async function (email, password) {
  const userName = this.page.getByLabel("Username:");
  const signIn = this.page.getByRole("button", { name: "Sign In" });
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await this.page.title());

  await userName.fill(email);
  await this.page.getByLabel("Password:").fill(password);
  await signIn.click();
});

Then("I should see an error message displayed", async function () {
  console.log(await this.page.locator("[style*='block']").textContent());
  await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});
