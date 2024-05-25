export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = this.page.locator(".card-body");
    this.productsText = this.page.locator(".card-body b");
    this.cart = this.page.locator("[routerlink*='cart']");
    this.orders = this.page.getByRole("button", { name: "Orders" });
  }

  async addProductToCart(productName) {
    await this.products.first().waitFor();
    const titles = await this.productsText.allTextContents();
    console.log(titles);
    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      if ((await this.products.nth(i).locator("b").textContent()) === productName) {
        await this.products.nth(i).getByRole("Button", { name: "Add To Cart" }).click();
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
