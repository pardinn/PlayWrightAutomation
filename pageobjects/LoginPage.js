export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = this.page.locator("#userEmail");
    this.password = this.page.locator("#userPassword");
    this.signInButton = this.page.locator("[value='Login']");
  }

  async validLogin(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }
}
