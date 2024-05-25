export class OrdersHistoryPage {
  constructor(page) {
    this.page = page;
    this.ordersHistory = this.page.locator("tr");
    this.orderId = this.page.getByText(/Order Id./);
  }

  async viewOrder(orderId) {
    const order = await this.findOrderById(orderId);
    await order.getByRole("button", { name: "View" }).click();
  }

  async findOrderById(orderId) {
    return await this.ordersHistory.filter({ hasText: orderId });
  }

  async getOrderId() {
    await this.page.getByText("Order Summary").waitFor();
    return await this.orderId;
  }
}
