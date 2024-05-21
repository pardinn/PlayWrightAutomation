import { test as base } from "@playwright/test";

exports.test = base.test.extend({
  testDataForOrder: {
    username: "anshika@gmail.com",
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
