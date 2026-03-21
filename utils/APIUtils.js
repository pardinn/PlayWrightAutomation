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
   * Fetches all available products from the API.
   * @returns {Promise<Array>} Array of product objects.
   */
  async getAllProducts() {
    const token = await this.getToken();
    const productsResponse = await this.request.post(
      "https://rahulshettyacademy.com/api/ecom/product/get-all-products",
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      },
    );
    const productsResponseJson = await productsResponse.json();
    console.log("Products fetched:", productsResponseJson.data.length);
    return productsResponseJson.data;
  }

  /**
   * Gets product ID by product name.
   * @param {string} productName - The name of the product to find.
   * @returns {Promise<string>} The product ID.
   * @throws {Error} If product not found.
   */
  async getProductId(productName) {
    const products = await this.getAllProducts();
    const product = products.find((p) => p.productName === productName);
    if (!product) {
      throw new Error(
        `Product "${productName}" not found. Available products: ${products.map((p) => p.productName).join(", ")}`,
      );
    }
    console.log(`Product ID for "${productName}": ${product._id}`);
    return product._id;
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
