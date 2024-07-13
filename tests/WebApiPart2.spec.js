import { test, expect } from "@playwright/test";

// Login from the UI, then save the storageState for future sessions
let webContext;
const email = "gqwewhdonyuqovmqud@ytnhy.com";
const authPath = ".auth/state.json";

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  // method 1 for waiting (discouraged)
  // await page.waitForLoadState("networkidle");
  // method 2 for waiting
  await page.locator(".card-body b").first().waitFor();
  await context.storageState({ path: authPath });
  webContext = await browser.newContext({ storageState: authPath });
});

test("@API Client App login", async () => {
  const page = await webContext.newPage();

  const productName = "ADIDAS ORIGINAL";
  const products = page.locator(".card-body");

  await page.goto("https://rahulshettyacademy.com/client");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products
        .nth(1)
        .getByRole("Button", { name: "Add To Cart" })
        .click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();

  await page.locator("div li").first().waitFor();
  const isVisible = await page
    .locator(`h3:has-text('${productName}')`)
    .isVisible();
  expect(isVisible).toBeTruthy();
  await page.getByRole("button", { name: "Checkout" }).click();

  // Homework. Fill out the Credit Card information
  await page.locator('input[type="text"]').first().fill("1234 5678 9012 3456");
  await page.getByRole("combobox").first().selectOption("10");
  await page.getByRole("combobox").nth(1).selectOption("24");
  await page
    .locator(".field")
    .filter({ hasText: "CVV Code" })
    .getByRole("textbox")
    .fill("123");
  await page
    .locator(".field")
    .filter({ hasText: "Name on Card" })
    .getByRole("textbox")
    .fill("Pardinn Hullkkan");
  await page
    .locator(".field")
    .filter({ hasText: "Apply Coupon" })
    .getByRole("textbox")
    .fill("FEELINGLUCKY");
  await page.getByRole("button", { name: "Apply Coupon" }).click();
  await expect(page.getByText("* Invalid Coupon")).toBeVisible();

  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; i++) {
    const currentOption = await dropdown.locator("button").nth(i).textContent();
    console.log(currentOption);
    if (currentOption.trim() === "India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  await expect(page.locator(".user__name [type='text']").first()).toHaveText(
    email,
  );
  await page.getByText("Place Order").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    "Thankyou for the order.",
  );
  let orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  orderId = orderId.split("|")[1].trim();
  console.log(orderId);

  // Homework: Navigate to the Orders tab, find the order and click on View
  await page.getByRole("button", { name: "Orders" }).click();
  await page
    .locator("tr")
    .filter({ hasText: orderId })
    .getByRole("button", { name: "View" })
    .click();
  await expect(page.getByText(`Order Id${orderId}`)).toBeVisible();
});

test("@API Test Case 2", async () => {
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});
