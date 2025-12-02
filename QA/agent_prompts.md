Phase 1 — Kick-off Prompt (Project Setup + Structure)

Prompt 1:
Act as a senior QA Automation Engineer with strong Playwright expertise.

I must automate an end-to-end checkout flow for the website:

https://quadvelo.sparrowerp.com/en/

Assessment Requirements:
- Use Playwright (TypeScript/JavaScript)
- Implement Page Object Model (POM)
- Use playwright test runner (npx playwright test)
- Store base URL + credentials in .env
- Follow clean locator strategy (no XPaths unless needed)
- Use built-in waits (not waitForTimeout)
- Validate URLs, DOM elements, cart count, product details, order confirmation
- Logout validation at end

The full checkout flow includes:
1. Login
2. Browse products / select category
3. Open product detail
4. Add product to cart
5. Validate cart
6. Checkout (address, shipping, payment)
7. Validate order confirmation
8. Logout

First, provide:
- Project folder structure
- Required packages
- Env variable keys needed
- Test execution commands
- List of required Page Object files
- Common utilities (optional)

Do not write code yet. Just output the design and plan.



Phase 2 — Generate Base Playwright Project + Env Setup
Prompt 2:
Generate the base Playwright project structure as per your earlier plan.

Include:
- pages folder
- tests folder
- utils folder (if suggested)
- playwright.config file setup
- .env.example file

.env variables should include:
BASE_URL=
USER_EMAIL=
USER_PASSWORD=

Output only file + folder layout and any code stubs.
No sample test yet.


Phase 3 — Create POMs for Each Screen
🔸 Login Page
Prompt 3:

Now generate LoginPage.ts under /pages.

Implement:
- constructor(page)
- locators for email, password, login button
- login(email, password) method
- assertion method to validate successful login (URL or dashboard element)

Use Playwright locators, not xpath.
No waitForTimeout.

🔸 Product Page
Prompt 4:

Generate ProductPage.ts under /pages.

Methods must include:
- navigateToCategory(categoryName)
- selectFirstProduct()
- validateProductDetailLoaded (check name, price, image visible)

Use robust locators.

🔸 Cart Page
Prompt 5:

Generate CartPage.ts under /pages.

Methods must include:
- openCart()
- validateProductInCart()
- getCartCount()
- proceedToCheckout()

Assertions must check:
- product name
- product pric

🔸 Checkout Page
Prompt 6:
Generate CheckoutPage.ts.

Methods:
- fillCustomerInfo(fullName, email, phone, address...)
- selectShippingMethod()
- selectPaymentMethod()
- placeOrder()

Add validation after order placement (URL change or success element).


🔸 Order Confirmation Page
Prompt 7:

Generate OrderConfirmationPage.ts.

Methods:
- validateOrderConfirmationText()
- extractOrderNumber()

Assertions:
- order success message
- existence of order number/id

🟤 Phase 4 — Final Test File

Prompt 8:

Now generate test file:
tests/checkout.spec.ts

It must:
1. load env variables
2. launch browser
3. create page objects
4. perform full flow:
- login
- navigate category
- open product
- add to cart
- validate cart
- checkout
- validate order confirmation
- logout
5. include assertions throughout

Use:
test()
expect()

Assertions must include:
- URL checks
- visible elements
- product title
- cart item validation
- order confirmation message

Do NOT use waitForTimeout.
Use locators and built-in waits.

🟢 Phase 5 — API Validation (Bonus)

Prompt 9:

Add optional code snippet to fetch checkout API response after order confirmation using page.waitForResponse().

Extract any useful fields:
- order id
- status
- payment info

Add expect() validations for 200 code and correct fields.


🟣 Phase 6 — README Generator Prompt
Prompt 10:

Generate README.md with:
- how to install dependencies
- how to set up .env
- how to run playwright test
- how structure is organized
- any assumptions
- bonus validation (if API used)