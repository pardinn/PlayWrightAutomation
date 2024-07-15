import { test as base } from "@playwright/test";

interface PaymentInfo {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvvCode: string;
  cardHolder: string;
  couponCode: string;
}

interface TestDataForOrder {
  username: string;
  password: string;
  productName: string;
  paymentInfo: PaymentInfo;
  country: string;
}

export const test = base.extend<{ testDataForOrder: TestDataForOrder }>({
  testDataForOrder: {
    username: "gqwewhdonyuqovmqud@ytnhy.com",
    password: "Iamking@000",
    productName: "ADIDAS ORIGINAL",
    paymentInfo: {
      cardNumber: "1234 5678 9012 3456",
      expiryMonth: "10",
      expiryYear: "24",
      cvvCode: "123",
      cardHolder: "Pardinn Hullkkan",
      couponCode: "FEELINGLUCKY",
    },
    country: "India",
  },
});
