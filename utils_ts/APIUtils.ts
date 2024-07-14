import { APIRequestContext } from "@playwright/test";

interface LoginPayload {
  userEmail: string;
  userPassword: string;
}

interface OrderResponse {
  token: string;
  orderId: string;
}

/**
 * Utility class for interacting with APIs.
 */
export class APIUtils {
  private readonly request: APIRequestContext;
  private readonly loginPayload: LoginPayload;

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
    try {
      const loginResponse = await this.request.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login",
        { data: this.loginPayload },
      );
      const loginResponseJson = await loginResponse.json();
      console.log(loginResponseJson.token);
      return loginResponseJson.token;
    } catch (error) {
      throw new Error("Failed to get token: " + error.message);
    }
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
    try {
      const token = await this.getToken();
      const orderResponse = await this.request.post(
        "https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
          data: orderPayload,
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        },
      );
      if (!orderResponse.ok()) {
        throw new Error(
          `The API responded with ${orderResponse.status()} - ${orderResponse.statusText()}`,
        );
      }
      const orderResponseJson = await orderResponse.json();
      console.log(orderResponseJson);
      return { token, orderId: orderResponseJson.orders[0] };
    } catch (error) {
      throw new Error("Failed to create order: " + error.message);
    }
  }
}
