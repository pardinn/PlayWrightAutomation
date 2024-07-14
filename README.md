# Playwright Automation

This repo is created for study purposes. The code produced here is done by following along the Udemy course [Playwright JS Automation Testing from Scratch with Framework](https://www.udemy.com/course/playwright-tutorials-automation-testing/learn/lecture/31109880#overview)

[![Playwright Tests](https://github.com/pardinn/PlayWrightAutomation/actions/workflows/playwright.yml/badge.svg)](https://github.com/pardinn/PlayWrightAutomation/actions/workflows/playwright.yml)

## How to run?

The training includes different types of testing, such as typescript, javascipt and cucumber.
Here are some useful commands to execute the tests

### JavaScript / TypeScript

Run all tests

```
$ npx playwright test
```

Run only tests with a specific tag

```
$ npx playwright test --grep @Web"
```

Specifiy the configuration file and the project to run

```
$ npx playwright test --config playwright.config1.js --project=safari
```

### Cucumber

Run all cucumber tests in the suite. The `--exit` syntax closes the runner at the end so the test won't hang

```node
$ npx cucumber-js --exit
```

Run only a specific feature file

```node
$ npx cucumber-js features/ErrorValidations.feature --exit
```

Run tests with a specific tag

```node
$ npx cucumber-js --tags "@Regression" --exit
```

Run tests in parallel. Provide the number of tests to run in parallel

```node
$ npx cucumber-js features/Ecommerce.feature --parallel 2 --exit
```

Generate HTML report for the test

```
$ npx cucumber-js --exit --format html:filename.html
```
