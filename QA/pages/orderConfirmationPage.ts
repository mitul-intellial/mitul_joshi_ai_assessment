import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class OrderConfirmationPage extends BasePage {
  readonly orderConfirmationHeader: Locator;
  readonly orderNumber: Locator;
  readonly orderStatus: Locator; // Keeping generic class, consider data-testid or getByText for robustness
  readonly orderTotal: Locator;
  readonly continueShoppingButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.orderConfirmationHeader = page.getByRole('heading', { name: 'Order Confirmation' }); // More robust locator
    this.orderNumber = page.getByText(/Order #/i); // More robust locator
    this.orderStatus = page.locator('.order-status');
    this.orderTotal = page.getByText(/Total:/i); // More robust locator
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' }); // More robust locator
    this.successMessage = page.getByText(/Your order has been placed/i); // More robust locator, assuming this text
  }

  async extractOrderNumber(): Promise<string | null> {
    return await this.orderNumber.textContent();
  }

  async getOrderTotal(): Promise<string | null> {
    return await this.orderTotal.textContent();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validateOrderConfirmationText(): Promise<void> {
    await expect(this.orderConfirmationHeader).toBeVisible();
    await expect(this.successMessage).toBeVisible(); // Assert generic success message
  }

  async verifyOrderNumberPresent(): Promise<void> {
    await expect(this.orderNumber).toBeVisible();
    await expect(this.orderNumber).not.toBeEmpty();
  }

  async verifyOrderTotal(expectedTotal: string): Promise<void> {
    await expect(this.orderTotal).toHaveText(expectedTotal);
  }
}
