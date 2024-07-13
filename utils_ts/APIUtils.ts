import { APIRequestContext } from "@playwright/test";

type LoginPayload = {
  userEmail: string;
  userPassword: string;
};

export class APIUtils {
  request: APIRequestContext;
  loginPayload: LoginPayload;

  constructor(request: APIRequestContext, loginPayload: LoginPayload) {
    this.request = request;
    this.loginPayload = loginPayload;
  }

  async getToken(): Promise<string> {
    // Login API
    const loginResponse = await this.request.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      },
    );
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);
    return token;
  }

  async createOrder(orderPayload: {
    orders: { country?: string; productOrderedId?: string }[];
  }) {
    // Create Order API
    const response = { token: "", orderId: "" };
    response.token = await this.getToken();
    const orderResponse = await this.request.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      },
    );
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    const orderId = orderResponseJson.orders[0];
    response.orderId = orderId;
    return response;
  }
}
