import { expect } from "@playwright/test";

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.cardNumber = page.locator('input[type="text"]').first();
    this.expiryMonth = page.getByRole("combobox").first();
    this.expiryYear = page.getByRole("combobox").nth(1);
    this.cvvCode = page.locator(".field").filter({ hasText: "CVV Code" }).getByRole("textbox");
    this.cardHolder = page.locator(".field").filter({ hasText: "Name on Card" }).getByRole("textbox");
    this.couponCode = page.locator(".field").filter({ hasText: "Apply Coupon" }).getByRole("textbox");
    this.applyCoupon = page.getByRole("button", { name: "Apply Coupon" });
    this.invalidCouponText = page.getByText("* Invalid Coupon");
    this.countrySelector = page.getByPlaceholder("Select Country");
    this.dropdown = page.locator(".ta-results");
    this.username = page.locator(".user__name [type='text']").first();
    this.placeOrderButton = page.getByText("Place Order");
    this.thankYouMessage = page.locator(".hero-primary");
    this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  async fillCardInfo(paymentInfo) {
    await this.cardNumber.fill(paymentInfo.cardNumber);
    await this.expiryMonth.selectOption(paymentInfo.expiryMonth);
    await this.expiryYear.selectOption(paymentInfo.expiryYear);
    await this.cvvCode.fill(paymentInfo.cvvCode);
    await this.cardHolder.fill(paymentInfo.cardHolder);
    await this.couponCode.fill(paymentInfo.couponCode);
    await this.applyCoupon.click();
    await expect(this.invalidCouponText).toBeVisible();
  }

  async selectCountry(country) {
    const subCountry = country.slice(0, 3);
    await this.countrySelector.pressSequentially(subCountry);
    await this.dropdown.waitFor();
    const optionsCount = await this.dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; i++) {
      const currentOption = await this.dropdown.locator("button").nth(i).textContent();
      console.log(currentOption);
      if (currentOption.trim() === "India") {
        await this.dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }

  async validateLoggedUser(username) {
    await expect(this.username).toHaveText(username);
  }

  async placeOrder(paymentInfo, country, username) {
    await this.fillCardInfo(paymentInfo);
    await this.selectCountry(country);
    await this.validateLoggedUser(username);
    await this.placeOrderButton.click();
    await expect(this.thankYouMessage).toHaveText("Thankyou for the order.");
    return this.getOrderId();
  }

  async getOrderId() {
    const orderId = await this.orderId.textContent();
    return orderId.split("|")[1].trim();
  }
}
