Feature: Ecommerce validations

  @Regression
  Scenario: Placing the Order
    Given I log into the Ecommerce application with "gqwewhdonyuqovmqud@ytnhy.com" and "Iamking@000"
    When I add "ADIDAS ORIGINAL" to Cart
    Then I should see "ADIDAS ORIGINAL" displayed in the Cart
    When I enter valid details and Place the Order
    Then I verify the order is present in the OrderHistory

  @Validation @bar
  Scenario Outline: Placing the Order
    Given I log into the Ecommerce2 application with "<username>" and "<password>"
    Then I should see an error message displayed

    Examples:
      | username                     | password    |
      | rahulshetty                  | learning    |
      | gqwewhdonyuqovmqud@ytnhy.com | Iamking@000 |
