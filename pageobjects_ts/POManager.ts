import { type Page } from "@playwright/test";

import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { OrdersHistoryPage } from "./OrdersHistoryPage";

export class POManager {
  private readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly dashboardPage: DashboardPage;
  private readonly cartPage: CartPage;
  private readonly checkoutPage: CheckoutPage;
  private readonly ordersHistoryPage: OrdersHistoryPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.ordersHistoryPage = new OrdersHistoryPage(this.page);
  }

  getLoginPage(): LoginPage {
    return this.loginPage;
  }

  getDashboardPage(): DashboardPage {
    return this.dashboardPage;
  }

  getCartPage(): CartPage {
    return this.cartPage;
  }

  getCheckoutPage(): CheckoutPage {
    return this.checkoutPage;
  }

  getOrdersHistoryPage(): OrdersHistoryPage {
    return this.ordersHistoryPage;
  }
}
