import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
  readonly cartItems: Locator; // Keeping generic class, consider data-testid for robustness
  readonly cartTotalPrice: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart-item');
    this.cartTotalPrice = page.getByText(/Total/i); // More robust locator
    this.proceedToCheckoutButton = page.getByRole('button', { name: 'Proceed to Checkout' }); // More robust locator
    this.emptyCartMessage = page.getByText(/Your cart is empty/i); // More robust locator
  }

  // Helper to get a specific cart item's locator
  private getCartItemLocator(productName: string): Locator {
    return this.page.locator('.cart-item', { hasText: productName });
  }

  async getCartItemDetails(productName: string): Promise<{ name: string | null; quantity: string | null; price: string | null } | null> {
    const itemLocator = this.getCartItemLocator(productName);
    if (await itemLocator.isVisible()) {
      const name = await itemLocator.getByText(productName).textContent();
      const quantity = await itemLocator.getByRole('spinbutton', { name: /quantity/i }).inputValue();
      const price = await itemLocator.locator('.item-price').textContent(); // Keeping class for price as it might not have a role
      return { name, quantity, price };
    }
    return null;
  }

  async updateItemQuantity(productName: string, newQuantity: number): Promise<void> {
    const itemLocator = this.getCartItemLocator(productName);
    await itemLocator.getByRole('spinbutton', { name: /quantity/i }).fill(newQuantity.toString());
    await this.page.waitForLoadState('networkidle');
  }

  async removeItem(productName: string): Promise<void> {
    const itemLocator = this.getCartItemLocator(productName);
    await itemLocator.getByRole('button', { name: /remove/i }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyCartIsEmpty(): Promise<void> {
    await expect(this.emptyCartMessage).toBeVisible();
    await expect(this.cartItems).toHaveCount(0);
  }

  async verifyProductInCart(productName: string, quantity: number, price: string): Promise<void> {
    const itemDetails = await this.getCartItemDetails(productName);
    expect(itemDetails).not.toBeNull();
    expect(itemDetails?.name).toContain(productName);
    expect(itemDetails?.quantity).toBe(quantity.toString());
    expect(itemDetails?.price).toContain(price);
  }

  async verifyCartTotal(expectedTotal: string): Promise<void> {
    await expect(this.cartTotalPrice).toHaveText(expectedTotal);
  }
}
