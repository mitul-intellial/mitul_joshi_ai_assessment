import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductDetailPage extends BasePage {
  readonly productDescription: Locator; // Keeping generic class, consider data-testid for robustness
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productDescription = page.locator('.product-detail-description');
    this.quantityInput = page.locator('input[name="quantity"]'); // Good locator
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' }); // More robust locator
  }

  async getProductDescription(): Promise<string | null> {
    return await this.productDescription.textContent();
  }

  async setQuantity(quantity: number): Promise<void> {
    await this.quantityInput.fill(quantity.toString());
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
    // Wait for some indication that the item was added, e.g., a success message or cart count update
    await this.page.waitForLoadState('networkidle');
  }
}
