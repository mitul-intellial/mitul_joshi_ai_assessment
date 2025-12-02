# QuadVelo E2E Checkout Automation

This project provides an end-to-end (E2E) test automation suite for the QuadVelo website's checkout flow, built using Playwright and TypeScript. It follows the Page Object Model (POM) design pattern for maintainability and reusability.

## Table of Contents

-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Environment Setup](#environment-setup)
-   [Project Structure](#project-structure)
-   [How to Run Tests](#how-to-run-tests)
-   [Assumptions](#assumptions)
-   [API Validation (Bonus)](#api-validation-bonus)

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/en/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1.  **Clone the repository (if applicable) or navigate to the project directory:**
    ```bash
    cd quadvelo-e2e-tests
    ```

2.  **Install project dependencies:**
    ```bash
    npm install
    ```

3.  **Install Playwright browsers:**
    ```bash
    npx playwright install
    ```

## Environment Setup

Sensitive information like base URLs and user credentials are managed via a `.env` file.

1.  **Create a `.env` file:**
    Copy the `.env.example` file to `.env` in the project root:
    ```bash
    cp .env.example .env
    ```

2.  **Populate `.env` with your credentials:**
    Open the newly created `.env` file and fill in the actual values:
    ```dotenv
    BASE_URL=https://quadvelo.sparrowerp.com/en/
    USER_EMAIL=your_valid_email@example.com
    USER_PASSWORD=your_valid_password
    ```
    *Replace `your_valid_email@example.com` and `your_valid_password` with actual login credentials for the QuadVelo website.*

## Project Structure

The project is organized using the Page Object Model (POM) to separate test logic from page interactions, enhancing readability and maintainability.

```
quadvelo-e2e-tests/
├── .env                     # Environment variables
├── .env.example             # Example environment variables
├── playwright.config.ts     # Playwright test runner configuration
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tests/
│   └── checkout.spec.ts     # Main end-to-end checkout flow test
├── pages/                   # Page Object Model files
│   ├── basePage.ts          # Base class for common page actions/elements
│   ├── loginPage.ts         # Handles login page interactions
│   ├── homePage.ts          # Handles home page elements (e.g., search, cart icon)
│   ├── productPage.ts       # Handles product listing and initial product detail view
│   ├── productDetailPage.ts # Handles specific product detail interactions (e.g., add to cart)
│   ├── cartPage.ts          # Handles shopping cart interactions and validations
│   ├── checkoutPage.ts      # Handles checkout steps (address, shipping, payment)
│   ├── orderConfirmationPage.ts # Handles order confirmation page validations
│   └── navigationBar.ts     # Handles common navigation elements (e.g., logout)
└── utils/                   # Helper functions and utilities
    └── dataGenerator.ts     # For generating random test data (e.g., addresses, emails)
```

## How to Run Tests

Use the Playwright test runner commands from your terminal in the project root directory.

*   **Run all tests:**
    ```bash
    npx playwright test
    ```

*   **Run tests in headed mode (browser UI visible):**
    ```bash
    npx playwright test --headed
    ```

*   **Run tests with UI mode (interactive debugger):**
    ```bash
    npx playwright test --ui
    ```

*   **Run a specific test file:**
    ```bash
    npx playwright test tests/checkout.spec.ts
    ```

*   **Generate and open HTML report:**
    ```bash
    npx playwright show-report
    ```

## Assumptions

*   **Locators:** All locators (`#id`, `.class`, `button:has-text()`, `input[name="..."]`) are based on common web element patterns. If the website's DOM structure changes, these locators may need to be updated.
*   **User Flow:** The test assumes a standard, uninterrupted checkout flow. Any unexpected pop-ups, CAPTCHAs, or alternative flows are not currently handled.
*   **Test Data:** Dummy data is used for customer information (address, email, phone) and payment details (card number, expiry, CVV). For real-world scenarios, consider using more sophisticated test data management.
*   **API Endpoint:** The API validation in `checkout.spec.ts` assumes a POST request to an endpoint like `/api/order` for order confirmation. This endpoint and its expected JSON response structure (`orderId`, `status`) are placeholders and **must be verified against the actual application's API**.

## API Validation (Bonus)

The `checkout.spec.ts` includes an optional step to validate the backend API response after placing an order. This provides an additional layer of confidence in the checkout process beyond just UI validation.

The test:
1.  Waits for a specific API response (e.g., `POST /api/order`) after the `placeOrder()` action.
2.  Asserts that the API response status code is `200`.
3.  Extracts and validates key fields from the JSON response, such as `orderId` and `status`.

**Important:** You must update the `page.waitForResponse()` URL pattern (`resp.url().includes('/api/order')`) in `tests/checkout.spec.ts` to accurately match the actual order confirmation API endpoint of the QuadVelo website. You can identify this endpoint using your browser's developer tools (Network tab) during a manual checkout.
