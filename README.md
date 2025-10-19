# Playwright Automation

[![Playwright Tests](https://github.com/pardinn/PlayWrightAutomation/actions/workflows/playwright.yml/badge.svg)](https://github.com/pardinn/PlayWrightAutomation/actions/workflows/playwright.yml)

This repo is created for study purposes. The code produced here is done by following along the Udemy course [Playwright JS Automation Testing from Scratch with Framework](https://www.udemy.com/course/playwright-tutorials-automation-testing/learn/lecture/31109880#overview)

## Installation

Follow these steps once for the project environment (Windows PowerShell examples). Adjust if you use a different shell/OS.

1. Install Node.js (LTS) and npm

   - Download and install from https://nodejs.org/. Confirm installation:

   ```powershell
   node -v
   npm -v
   ```

2. Install project dependencies

   From the repository root run:

   ```powershell
   npm install
   ```

3. Install Playwright browsers

   Playwright requires browser binaries; install them once after npm install:

   ```powershell
   npx playwright install
   ```

   If you only need specific browsers, add the browser name, e.g. `npx playwright install chromium`.

4. If you plan to run Cucumber with TypeScript step definitions

   - Install ts-node and typescript as dev-dependencies (if not already present):

   ```powershell
   npm install -D ts-node typescript
   ```

   - Run cucumber with TypeScript support:

   ```powershell
   npx cucumber-js --require-module ts-node/register --require ./features/step_definitions --exit
   ```

Now continue with usage instructions below.

## How to run?

The training includes different types of testing, such as typescript, javascipt and cucumber.
Here are some useful commands to execute the tests

### JavaScript / TypeScript

Run all tests

```powershell
npx playwright test
```

Run only tests with a specific tag

```powershell
npx playwright test --grep @Web
```

Specifiy the configuration file and the project to run

```powershell
npx playwright test --config playwright.config1.js --project=safari
```

Run only the tests that failed in the previous run

```powershell
npx playwright test --last-failed
```

Run Playwright tests headed (see browser UI):

```powershell
npx playwright test --headed
```

Re-run only the tests that failed in the last run (fast iteration):

```powershell
npx playwright test --last-failed
```

Generate detailed traces for debugging (save artifacts under `playwright-report/`):

```powershell
npx playwright test --trace on
```

### Cucumber

Run all cucumber tests in the suite. The `--exit` syntax closes the runner at the end so the test won't hang

```powershell
npx cucumber-js --exit
```

Run only a specific feature file

```powershell
npx cucumber-js features/ErrorValidations.feature --exit
```

Run tests with a specific tag

```powershell
npx cucumber-js --tags "@Regression" --exit
```

Run tests in parallel (example: run feature in parallel workers)

```powershell
npx cucumber-js features/Ecommerce.feature --parallel 2 --exit
```

Generate HTML report for the test

```powershell
npx cucumber-js --exit --format html:filename.html
```

## Reference

- [Playwright documentation](https://playwright.dev/docs/intro)
- [Udemy training: Playwright JS Automation Testing from Scratch with Framework](https://www.udemy.com/course/playwright-tutorials-automation-testing/learn/lecture/31109880#overview)
