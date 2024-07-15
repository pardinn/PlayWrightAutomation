import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = this.page.locator("#userEmail");
    this.password = this.page.locator("#userPassword");
    this.signInButton = this.page.locator("[value='Login']");
  }

  async validLogin(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
    try {
      await this.page.waitForURL("**/dashboard/*");
    } catch (error) {
      throw new Error("Login failed. Please check your credentials.");
    }
  }

  async goTo(): Promise<void> {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }
}
