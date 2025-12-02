import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutPage extends BasePage {
  // Customer Info/Address Section Locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator; // New locator for email
  readonly phoneInput: Locator; // New locator for phone
  readonly addressLine1Input: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipInput: Locator;
  readonly countrySelect: Locator;
  readonly continueToShippingButton: Locator;

  // Shipping Section Locators
  readonly shippingMethodRadio: (method: string) => Locator;
  readonly continueToPaymentButton: Locator;

  // Payment Section Locators
  readonly paymentMethodRadio: (method: string) => Locator;
  readonly cardNumberInput: Locator;
  readonly expiryDateInput: Locator;
  readonly cvvInput: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    // Customer Info/Address Section
    this.firstNameInput = page.locator('#first_name');
    this.lastNameInput = page.locator('#last_name');
    this.emailInput = page.locator('#email'); // Assuming id="email" for customer email
    this.phoneInput = page.locator('#phone'); // Assuming id="phone" for customer phone
    this.addressLine1Input = page.locator('#address_line_1');
    this.cityInput = page.locator('#city');
    this.stateInput = page.locator('#state');
    this.zipInput = page.locator('#zip');
    this.countrySelect = page.locator('#country');
    this.continueToShippingButton = page.getByRole('button', { name: 'Continue to Shipping' });

    // Shipping Section
    this.shippingMethodRadio = (method: string) => page.locator(`input[type="radio"][value="${method}"]`); // Robust, consider getByRole if accessible name exists
    this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to Payment' });

    // Payment Section
    this.paymentMethodRadio = (method: string) => page.locator(`input[type="radio"][value="${method}"]`); // Robust, consider getByRole if accessible name exists
    this.cardNumberInput = page.locator('#card_number');
    this.expiryDateInput = page.locator('#expiry_date');
    this.cvvInput = page.locator('#cvv');
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
  }

  // Customer Info/Address Section Methods
  async fillCustomerInfo(customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    addressLine1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }): Promise<void> {
    await this.firstNameInput.fill(customerInfo.firstName);
    await this.lastNameInput.fill(customerInfo.lastName);
    await this.emailInput.fill(customerInfo.email);
    await this.phoneInput.fill(customerInfo.phone);
    await this.addressLine1Input.fill(customerInfo.addressLine1);
    await this.cityInput.fill(customerInfo.city);
    await this.stateInput.fill(customerInfo.state);
    await this.zipInput.fill(customerInfo.zip);
    await this.countrySelect.selectOption(customerInfo.country);
  }

  async continueToShipping(): Promise<void> {
    await this.continueToShippingButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Shipping Section Methods
  async selectShippingMethod(method: string): Promise<void> {
    await this.shippingMethodRadio(method).check();
    await this.page.waitForLoadState('networkidle');
  }

  async continueToPayment(): Promise<void> {
    await this.continueToPaymentButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Payment Section Methods
  async selectPaymentMethod(method: string): Promise<void> {
    await this.paymentMethodRadio(method).check();
    await this.page.waitForLoadState('networkidle');
  }

  async fillPaymentDetails(paymentData: { cardNumber: string; expiryDate: string; cvv: string }): Promise<void> {
    await this.cardNumberInput.fill(paymentData.cardNumber);
    await this.expiryDateInput.fill(paymentData.expiryDate);
    await this.cvvInput.fill(paymentData.cvv);
  }

  async placeOrder(): Promise<void> {
    await this.placeOrderButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Validations (can be expanded)
  async verifyCustomerInfoPrepopulated(customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
  }): Promise<void> {
    await expect(this.firstNameInput).toHaveValue(customerInfo.firstName);
    await expect(this.lastNameInput).toHaveValue(customerInfo.lastName);
    await expect(this.emailInput).toHaveValue(customerInfo.email);
  }

  async verifyShippingMethodSelected(method: string): Promise<void> {
    await expect(this.shippingMethodRadio(method)).toBeChecked();
  }

  async verifyPaymentMethodSelected(method: string): Promise<void> {
    await expect(this.paymentMethodRadio(method)).toBeChecked();
  }
}
