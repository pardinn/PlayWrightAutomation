import { APIRequestContext } from "@playwright/test";

type LoginPayload = { userEmail: string; userPassword: string };

type OrderResponse = { token: string; orderId: string };

/**
 * Utility class for interacting with APIs.
 */
export class APIUtils {
  request: APIRequestContext;
  loginPayload: LoginPayload;

  /**
   * Creates an instance of APIUtils.
   * @param {APIRequestContext} request - The API request context.
   * @param {LoginPayload} loginPayload - The payload for login.
   */
  constructor(request: APIRequestContext, loginPayload: LoginPayload) {
    this.request = request;
    this.loginPayload = loginPayload;
  }

  /**
   * Authenticates the user and retrieves a token.
   * @returns {Promise<string>} The authentication token.
   */
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

  /**
   * Creates an order.
   * @param {Object} orderPayload - The payload for creating an order.
   * @param {Object[]} orderPayload.orders - The list of orders.
   * @param {string} [orderPayload.orders[].country] - The country for the order.
   * @param {string} [orderPayload.orders[].productOrderedId] - The ID of the product ordered.
   * @returns {Promise<OrderResponse>} The response containing the token and order ID.
   */
  async createOrder(orderPayload: {
    orders: { country?: string; productOrderedId?: string }[];
  }): Promise<OrderResponse> {
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
