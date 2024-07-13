import { Page, Locator } from "@playwright/test";

export class DashboardPage {
  page: Page;
  products: Locator;
  productsText: Locator;
  cart: Locator;
  orders: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = this.page.locator(".card-body");
    this.productsText = this.page.locator(".card-body b");
    this.cart = this.page.locator("[routerlink*='cart']");
    this.orders = this.page.getByRole("button", { name: "Orders" });
  }

  async addProductToCart(productName: string) {
    await this.products.first().waitFor();
    const titles: string[] = await this.productsText.allTextContents();
    console.log(titles);
    const count: number = await this.products.count();
    for (let i: number = 0; i < count; i++) {
      if ((await this.products.nth(i).locator("b").textContent()) === productName) {
        await this.products.nth(i).getByRole("button", { name: "Add To Cart" }).click();
        break;
      }
    }
  }

  async navigateToCart() {
    await this.cart.click();
  }

  async navigateToOrders() {
    await this.orders.click();
  }
}
