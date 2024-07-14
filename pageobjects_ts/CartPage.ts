import { expect, Page, Locator } from "@playwright/test";

export class CartPage {
  private readonly page: Page;
  private readonly cartList: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartList = this.page.locator("div li");
    this.checkoutButton = this.page.getByRole("button", { name: "Checkout" });
  }

  async validateProductAddedToCart(productName: string): Promise<void> {
    await this.cartList.first().waitFor();
    await expect(this.getProductLocator(productName)).toBeVisible();
  }

  private getProductLocator(productName: string): Locator {
    return this.page.locator(`h3:has-text('${productName}')`);
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
