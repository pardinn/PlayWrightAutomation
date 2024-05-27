Feature: Ecommerce validations

  @Validation
  Scenario: Placing the Order
    Given I log into the Ecommerce2 application with "rahulshetty" and "learning"
    Then I should see an error message displayed