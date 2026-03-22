---
name: PlayWrightAutomation Workspace Instructions
description: "Domain knowledge for Playwright test automation framework. Use when: writing tests, implementing page objects, configuring test runs, or debugging test failures."
---

# Playwright Automation Testing Framework

This is a **Playwright JS test automation framework** for e-commerce UI testing, following the **Page Object Model (POM)** pattern. The project supports both JavaScript and TypeScript with Cucumber BDD capabilities.

## Quick Reference

- **Framework**: Playwright with TypeScript support
- **Primary Language**: JavaScript (some TypeScript implementations in parallel)
- **Test Types**: UI automation, Cucumber BDD, API testing
- **Report Formats**: HTML (default), Allure reports
- **CI Environment**: GitHub Actions (forbidOnly=true, 2 retries, 4 workers)
- **Key npm Scripts**: `regression`, `web-tests`, `api-ests`, `failed-tests`, `flakyness-check`, `safari-custom-config`, `cucumber-regression`

## Project Structure

```
tests/javascript/          → Test specs (*.spec.js, *.spec.ts)
pageobjects/              → JavaScript Page Object classes
pageobjects_ts/           → TypeScript Page Object classes (preferred)
features/                 → Cucumber feature files
  └─ step_definitions/    → Cucumber step implementations
  └─ support/             → Cucumber hooks and configuration
utils/                    → Test utilities, helpers, test data
test-data/               → JSON test data files (placeOrderTestData.json, etc.)
playwright-report/       → Generated HTML test reports
allure-report/           → Generated Allure reports
```

## Architecture & Patterns

### Page Object Model (POM)

**Pattern**: Each page = one class with locators + interaction methods.

**TypeScript is strongly preferred** (see `pageobjects_ts/`) over JavaScript because:

- Type safety catches locator/method refactoring errors
- POManager typed constructor prevents runtime page object errors
- Better IDE autocompletion for complex test flows

**Example structure** (`POManager.ts`):

```typescript
export class POManager {
  private readonly page: Page;
  private readonly loginPage: LoginPage; // Lazy-initialized
  private readonly dashboardPage: DashboardPage;
  // ... other pages ...

  constructor(page: Page) {
    /* ... */
  }
  getLoginPage(): LoginPage {
    return this.loginPage;
  }
}
```

**When implementing POM classes**:

1. Keep locators as private properties (constants or getters)
2. Expose user-facing methods (e.g., `validLogin()`, `addProductToCart()`)
3. Hide Playwright details—return meaningful values or void
4. Use types for method returns (e.g., `async viewOrder(id: string): Promise<void>`)

### Test Structure

Tests use **parameterized data** from JSON files:

```javascript
const testData = fs.readFileSync("./utils/placeOrderTestData.json", "utf8");
const dataset = JSON.parse(testData);

for (const data of dataset) {
  test(`@Web Description - ${data.productName}`, async ({ page }) => {
    const pom = new POManager(page);
    // ... test steps using pom and data ...
  });
}
```

**Tag-based filtering**:

- `@Web` → UI tests (run with `npm run web-tests`)
- `@API` → API tests (run with `npm run api-ests`)
- `@Regression` → Full regression suite

### Custom Test Fixtures (Base Test)

A custom `customtest` fixture (`utils/base-test`) provides:

- Project-specific fixtures (e.g., `testDataForOrder`)
- Shared setup/teardown logic
- Reusable test context

```javascript
import { test as customtest } from "../../utils/base-test";
customtest("Description", async ({ page, testDataForOrder }) => { ... });
```

## Configuration Files

### Playwright Config Files

**`playwright.config.js`** (primary):

- Applies to most test runs (`npx playwright test`)
- 30s test timeout, 5s expect timeout
- Parallel execution (fully parallel locally, 4 workers on CI)
- CI: forbidOnly=true, 2 retries, 4 workers

**`playwright.config1.js`**:

- Custom config for special scenarios (e.g., Safari-specific)
- Run with: `npx playwright test --config playwright.config1.js --project=safari`

**When configuring**:

- Match timeout to test complexity (API calls, UI waits)
- Use `retries: process.env.CI ? 2 : 0` for CI stability
- Set `workers` based on environment (local unlimited, CI 4)

### ESLint & Prettier

**Files**: `eslint.config.js`, `prettier-plugin-gherkin`

- Run: `npm run lint`
- Auto-fix: `npm run lint-fix`
- **Applies to**: `**/*.js`, `**/*.ts`, `**/*.feature` (Gherkin)

### Husky & Commitlint

**Git hooks** (via `husky`) enforce conventional commits:

- **File**: `commitlint.config.js`
- **Scope**: `test:`, `fix:`, `feat:`, etc. (conventional commits)

## Common Commands

| Command                        | Purpose              | Example                      |
| ------------------------------ | -------------------- | ---------------------------- |
| `npm run regression`           | All tests            | Full suite                   |
| `npm run web-tests`            | UI tests only        | `@Web` tagged tests          |
| `npm run api-ests`             | API tests only       | `@API` tagged tests          |
| `npm run failed-tests`         | Re-run failures      | Debug-friendly               |
| `npm run flakyness-check`      | Flaky test detection | Repeat each 10x, 6 workers   |
| `npm run safari-custom-config` | Safari testing       | Uses `playwright.config1.js` |
| `npm run cucumber-regression`  | Cucumber BDD tests   | With retry + HTML report     |

**Playwright CLI flags**:

- `--headed` → See browser UI
- `--trace on` → Save traces for debugging
- `--grep @Web` → Filter by tag
- `--last-failed` → Re-run only failures
- `--grep "test name pattern"` → Filter by test name

## Development Workflow

### Writing New Tests

1. **Create test data** (if needed) in `utils/` as `.json`
2. **Write/update POM** in `pageobjects_ts/` (TypeScript preferred)
3. **Write test spec** in `tests/javascript/`
   - Use parameterized data loops when testing multiple scenarios
   - Tag with `@Web`, `@API`, `@Regression` as appropriate
4. **Run locally**: `npm run web-tests -- --headed --trace on`
5. **Lint before commit**: `npm run lint-fix`

### Debugging

- **Test failure**: Run with `npm run failed-tests -- --headed`
- **Trace inspection**: Look in `playwright-report/trace/` after run
- **Allure reports**: Run `npm run regression` → check `allure-report/`
- **Flaky tests**: Run `npm run flakyness-check` to identify intermittent failures

## Cucumber (BDD)

**Location**: `features/` with `*.feature` files
**Step Definitions**: `features/step_definitions/` (TypeScript via `ts-node`)
**Hooks**: `features/support/` (setup, cleanup, fixtures)

**Run Cucumber**:

```powershell
npm run cucumber-regression              # @Regression tagged scenarios
npx cucumber-js --tags '@Regression'     # Direct CLI
npx cucumber-js --require-module ts-node/register --require ./features/step_definitions --exit
```

## Test Data

**Location**: `utils/` or `test-data/`
**Format**: JSON (e.g., `placeOrderTestData.json`)
**Usage**: Loaded in tests; parameterized loops for data-driven testing

```json
[
  {
    "username": "testuser",
    "password": "Test@123",
    "productName": "ADIDAS ORIGINAL",
    "paymentInfo": "...",
    "country": "United States"
  }
]
```

## Key Dependencies

| Package                              | Purpose              | Notes                       |
| ------------------------------------ | -------------------- | --------------------------- |
| `@playwright/test`                   | Main framework       | Latest version              |
| `@cucumber/cucumber`                 | BDD support          | With TypeScript feature     |
| `ts-node`                            | TypeScript execution | For Cucumber step defs      |
| `allure-playwright`                  | Allure reporting     | Integration with Playwright |
| `exceljs`                            | Excel test data      | For dynamic data generation |
| `@faker-js/faker`                    | Fake data generation | For test data creation      |
| `eslint` + `prettier-plugin-gherkin` | Code/feature linting | Pre-commit via Husky        |

## Common Pitfalls

1. **Mixing JS and TS POM**: Use `pageobjects_ts/` consistently; JS version is legacy.
2. **Timeout mismatch**: Set `timeout` > `expect.timeout` (30s > 5s).
3. **Flaky selectors**: Prefer data-attributes over text/XPath; use role-based locators.
4. **CI vs local**: CI has 2 retries and 4 workers; local has unlimited workers and 0 retries.
5. **Feature file formatting**: Run `npm run lint-fix` before commit (Prettier-Gherkin).
6. **Test data hardcoding**: Use parameterized JSON files, not inline literals.

## File Conventions

- **Test specs**: `*.spec.js` or `*.spec.ts` in `tests/javascript/`
- **POM classes**: `ClassName.ts` in `pageobjects_ts/`; lazy-initialize in POManager
- **Helper utils**: `utils/` for generic helpers, page-specific utils in POM
- **Feature files**: `*.feature` in `features/`; descriptive names with `@tag`
- **Test data**: `utils/*.json`; kebab-case filenames
- **Git commits**: Conventional commits (scope: `test:`, `fix:`, `feat:`)

## When to Ask Copilot

- ✅ "Write a POM class for the checkout page"
- ✅ "Review this test for best practices"
- ✅ "Why is this test flaky? (provide test + recent logs)"
- ✅ "Create a Cucumber step for login"
- ✅ "What's the best way to parameterize this data?"
- ✅ "Debug: test passes locally but fails in CI"

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Cucumber.js](https://github.com/cucumber/cucumber-js)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
