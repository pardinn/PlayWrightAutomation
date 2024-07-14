import { Page, Locator } from "@playwright/test";

export class DashboardPage {
  private readonly page: Page;
  private readonly products: Locator;
  private readonly productsText: Locator;
  private readonly cart: Locator;
  private readonly orders: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = this.page.locator(".card-body");
    this.productsText = this.page.locator(".card-body b");
    this.cart = this.page.locator("[routerlink*='cart']");
    this.orders = this.page.getByRole("button", { name: "Orders" });
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.products.first().waitFor();
    const titles = await this.productsText.allTextContents();
    console.log(titles);
    for (const product of await this.products.all()) {
      const title = await product.locator("b").textContent();
      if (title === productName) {
        await product.getByRole("button", { name: "Add To Cart" }).click();
        break;
      }
    }
  }

  async navigateToCart(): Promise<void> {
    await this.cart.click();
  }

  async navigateToOrders(): Promise<void> {
    await this.orders.click();
  }
}
