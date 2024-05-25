export class APIUtils {
  constructor(request, loginPayload) {
    this.request = request;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    // Login API
    const loginResponse = await this.request.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
      data: this.loginPayload,
    });
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);
    return token;
  }

  async createOrder(orderPayload) {
    // Create Order API
    let response = {};
    response.token = await this.getToken();
    const orderResponse = await this.request.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
      data: orderPayload,
      headers: { Authorization: response.token, "Content-Type": "application/json" },
    });
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    const orderId = orderResponseJson.orders[0];
    response.orderId = orderId;
    return response;
  }
}
export default APIUtils;
