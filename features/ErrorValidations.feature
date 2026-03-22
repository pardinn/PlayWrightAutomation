Feature: Ecommerce validations

  @Validation
  @bar
  Scenario Outline: Placing the Order
    Given I log into the Ecommerce2 application with "<username>" and "<password>"
    Then I should see an error message displayed

    Examples:
      | username                     | password          |
      | rahulshetty                  | Learning@830$3mK2 |
      | gqwewhdonyuqovmqud@ytnhy.com | Iamking@000       |
