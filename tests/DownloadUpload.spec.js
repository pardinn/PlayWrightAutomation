import { test, expect } from "@playwright/test";
import writeExcel from "../utils/ExcelUtils";
import { faker } from "@faker-js/faker";

test("Download / Upload excel validation", async ({ page }) => {
  const fruitName = "Mango";
  const newPrice = faker.number.int({ max: 999 });

  await page.goto("https://rahulshettyacademy.com/upload-download-test/");
  // Start waiting for download before clicking. Note no await.
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  const download = await downloadPromise;

  // Wait for the download process to complete and save the downloaded file somewhere.
  await download.saveAs("test-data/" + download.suggestedFilename());

  // Modify the file
  writeExcel(
    fruitName,
    newPrice,
    { row: 0, column: 2 },
    "test-data/download.xlsx",
  );

  await page.locator("#fileinput").click();
  await page.locator("#fileinput").setInputFiles("test-data/download.xlsx");

  const desiredRow = page.getByRole("row").filter({ hasText: fruitName });
  const price = desiredRow.locator("#cell-4-undefined");
  await expect(price).toHaveText(String(newPrice));
});
