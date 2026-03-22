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
   * Fetches all available products from the API.
   * @returns {Promise<Array>} Array of product objects.
   */
  async getAllProducts(): Promise<
    {
      _id: string;
      productName: string;
      productPrice: number;
      [key: string]: string | number | boolean;
    }[]
  > {
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
  async getProductId(productName: string): Promise<string> {
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
