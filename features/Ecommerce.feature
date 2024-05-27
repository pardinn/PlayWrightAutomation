Feature: Ecommerce validations

  @Regression
  Scenario: Placing the Order
    Given I log into the Ecommerce application with "anshika@gmail.com" and "Iamking@000"
    When I add "ADIDAS ORIGINAL" to Cart
    Then I should see "ADIDAS ORIGINAL" displayed in the Cart
    When I enter valid details and Place the Order
    Then I verify the order is present in the OrderHistory