export class OrdersHistoryPage {
  constructor(page) {
    this.page = page;
    this.ordersHistory = page.locator("tr");
    this.orderId = page.getByText("Order Id");
  }

  async viewOrder(orderId) {
    const order = await this.findOrderById(orderId);
    await this.getViewButton(order).click();
  }

  async getViewButton(order) {
    return await order.getByRole("button", { name: "View" });
  }

  async findOrderById(orderId) {
    return await this.ordersHistory.filter({ hasText: orderId });
  }

  async getOrderId() {
    return await this.orderId.locator(".col-text").TextContent();
  }
}
