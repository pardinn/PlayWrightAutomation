import { test, expect } from "@playwright/test";

test("Calendar validations", async ({ page }) => {
  const monthNumber = "6";
  const day = "15";
  const year = "2027";
  const expectedDate = [monthNumber, day, year];

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.getByText(year).click();
  await page
    .locator("button.react-calendar__tile")
    .nth(monthNumber - 1)
    .click();
  await page.getByRole("button").filter({ hasText: day }).click();
  const inputs = await page.locator(".react-date-picker__inputGroup input");

  for (let i = 0; i < inputs.length; i++) {
    expect(inputs[i].inputValue()).toEqual(expectedDate[i]);
  }
});
