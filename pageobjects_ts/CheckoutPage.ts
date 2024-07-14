import { expect, Page, Locator } from "@playwright/test";

export interface PaymentInfo {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvvCode: string;
  cardHolder: string;
  couponCode: string;
}

export class CheckoutPage {
  private readonly page: Page;
  private readonly cardNumber: Locator;
  private readonly expiryMonth: Locator;
  private readonly expiryYear: Locator;
  private readonly cvvCode: Locator;
  private readonly cardHolder: Locator;
  private readonly couponCode: Locator;
  private readonly applyCoupon: Locator;
  private readonly invalidCouponText: Locator;
  private readonly countrySelector: Locator;
  private readonly dropdown: Locator;
  private readonly username: Locator;
  private readonly placeOrderButton: Locator;
  private readonly thankYouMessage: Locator;
  private readonly orderId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cardNumber = this.page.locator('input[type="text"]').first();
    this.expiryMonth = this.page.getByRole("combobox").first();
    this.expiryYear = this.page.getByRole("combobox").nth(1);
    this.cvvCode = this.page
      .locator(".field")
      .filter({ hasText: "CVV Code" })
      .getByRole("textbox");
    this.cardHolder = this.page
      .locator(".field")
      .filter({ hasText: "Name on Card" })
      .getByRole("textbox");
    this.couponCode = this.page
      .locator(".field")
      .filter({ hasText: "Apply Coupon" })
      .getByRole("textbox");
    this.applyCoupon = this.page.getByRole("button", { name: "Apply Coupon" });
    this.invalidCouponText = this.page.getByText("* Invalid Coupon");
    this.countrySelector = this.page.getByPlaceholder("Select Country");
    this.dropdown = this.page.locator(".ta-results");
    this.username = this.page.locator(".user__name [type='text']").first();
    this.placeOrderButton = this.page.getByText("Place Order");
    this.thankYouMessage = this.page.locator(".hero-primary");
    this.orderId = this.page.locator(".em-spacer-1 .ng-star-inserted");
  }

  async fillCardInfo(paymentInfo: PaymentInfo): Promise<void> {
    await this.cardNumber.fill(paymentInfo.cardNumber);
    await this.expiryMonth.selectOption(paymentInfo.expiryMonth);
    await this.expiryYear.selectOption(paymentInfo.expiryYear);
    await this.cvvCode.fill(paymentInfo.cvvCode);
    await this.cardHolder.fill(paymentInfo.cardHolder);
    await this.couponCode.fill(paymentInfo.couponCode);
    await this.applyCoupon.click();
    await expect(this.invalidCouponText).toBeVisible();
  }

  async selectCountry(country: string): Promise<void> {
    const subCountry: string = country.slice(0, 3);
    await this.countrySelector.pressSequentially(subCountry);
    await this.dropdown.waitFor();
    const optionsCount: number = await this.dropdown.locator("button").count();
    for (let i: number = 0; i < optionsCount; i++) {
      const currentOption: string | null = await this.dropdown
        .locator("button")
        .nth(i)
        .textContent();
      console.log(currentOption);
      if (currentOption?.trim() === country) {
        await this.dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }

  async validateLoggedUser(username: string): Promise<void> {
    await expect(this.username).toHaveText(username);
  }

  async placeOrder(
    paymentInfo: PaymentInfo,
    country: string,
    username: string,
  ): Promise<string> {
    await this.fillCardInfo(paymentInfo);
    await this.selectCountry(country);
    await this.validateLoggedUser(username);
    await this.placeOrderButton.click();
    await expect(this.thankYouMessage).toHaveText("Thankyou for the order.");
    return this.getOrderId();
  }

  private async getOrderId(): Promise<string> {
    const orderId = await this.orderId.textContent();
    return orderId?.split("|")[1].trim() ?? "Failed to locate the order id";
  }
}
