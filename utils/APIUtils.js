/**
 * Utility class for interacting with APIs.
 */
export class APIUtils {
  /**
   * Creates an instance of APIUtils.
   * @param {Object} request - The API request context.
   * @param {Object} loginPayload - The payload for login.
   */
  constructor(request, loginPayload) {
    this.request = request;
    this.loginPayload = loginPayload;
  }

  /**
   * Authenticates the user and retrieves a token.
   * @returns {Promise<string>} The authentication token.
   */
  async getToken() {
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
   * @returns {Promise<Object>} The response containing the token and order ID.
   */
  async createOrder(orderPayload) {
    // Create Order API
    let response = {};
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
export default APIUtils;
