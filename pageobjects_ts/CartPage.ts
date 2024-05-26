import { expect, Page, Locator } from "@playwright/test";

export class CartPage {
  page: Page;
  cartList: Locator;
  checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartList = this.page.locator("div li");
    this.checkoutButton = this.page.getByRole("button", { name: "Checkout" });
  }

  async validateProductAddedToCart(productName: string) {
    await this.cartList.first().waitFor();
    await expect(this.getProductLocator(productName)).toBeVisible();
  }

  getProductLocator(productName: string) {
    return this.page.locator(`h3:has-text('${productName}')`);
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
