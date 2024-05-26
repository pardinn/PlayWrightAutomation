import { Page, Locator } from "@playwright/test";

export class OrdersHistoryPage {
  page: Page;
  ordersHistory: Locator;
  orderId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ordersHistory = this.page.locator("tr");
    this.orderId = this.page.getByText(/Order Id./);
  }

  async viewOrder(orderId: string) {
    const order: Locator = await this.findOrderById(orderId!);
    await order.getByRole("button", { name: "View" }).click();
  }

  async findOrderById(orderId: string): Promise<Locator> {
    return await this.ordersHistory.filter({ hasText: orderId });
  }

  async getOrderId(): Promise<Locator> {
    await this.page.getByText("Order Summary").waitFor();
    return await this.orderId;
  }
}
