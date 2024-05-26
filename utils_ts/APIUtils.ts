import { APIRequestContext } from "@playwright/test";

export class APIUtils {
  request: APIRequestContext;
  loginPayload: any;

  constructor(request: APIRequestContext, loginPayload: any) {
    this.request = request;
    this.loginPayload = loginPayload;
  }

  async getToken(): Promise<string> {
    // Login API
    const loginResponse = await this.request.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
      data: this.loginPayload,
    });
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);
    return token;
  }

  async createOrder(orderPayload: any) {
    // Create Order API
    let response = { token: "", orderId: "" };
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
