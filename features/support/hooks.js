import playwright from "@playwright/test";
import { POManager } from "../../pageobjects/POManager.js";
import { Before, After, Status, BeforeStep, AfterStep } from "@cucumber/cucumber";

Before({ tags: "@Validation" }, function () {
  console.log("This only runs for tests tagged with @Validation");
});

Before({ tags: "@Regression and @foo" }, function () {
  console.log("I don't run because there are no tests with @Regression and @foo");
});

Before({ tags: "@Regression or @bar" }, function () {
  console.log("I run for @Regression or for @bar");
});

Before({ timeout: 10 * 1000 }, async function () {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.pom = new POManager(this.page);
});

BeforeStep(function () {
  //This hook will be executed before each step in a scenario
});

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: "./test-results/CucumberFailedScreenshot.png" });
  }
});

After(function () {
  console.log("I am last to execute");
});
