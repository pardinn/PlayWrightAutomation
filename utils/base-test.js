import { test as base } from "@playwright/test";

const test = base.extend({
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

export { test };
