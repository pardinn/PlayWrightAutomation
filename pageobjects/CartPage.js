import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartList = this.page.locator("div li");
    this.checkoutButton = this.page.getByRole("button", { name: "Checkout" });
  }

  async validateProductAddedToCart(productName) {
    await this.cartList.first().waitFor();
    await expect(this.getProductLocator(productName)).toBeVisible();
  }

  getProductLocator(productName) {
    return this.page.locator(`h3:has-text('${productName}')`);
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
