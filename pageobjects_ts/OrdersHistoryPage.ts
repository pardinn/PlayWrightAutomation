import { Page, Locator } from "@playwright/test";

export class OrdersHistoryPage {
  private readonly page: Page;
  private readonly ordersHistory: Locator;
  private readonly orderId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ordersHistory = this.page.locator("tr");
    this.orderId = this.page.getByText(/Order Id./);
  }

  async viewOrder(orderId: string): Promise<void> {
    const order = await this.findOrderById(orderId!);
    await order.getByRole("button", { name: "View" }).click();
  }

  private async findOrderById(orderId: string): Promise<Locator> {
    return this.ordersHistory.filter({ hasText: orderId });
  }

  async getOrderId(): Promise<Locator> {
    await this.page.getByText("Order Summary").waitFor();
    return this.orderId;
  }
}
