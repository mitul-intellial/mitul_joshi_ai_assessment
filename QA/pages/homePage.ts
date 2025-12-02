import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cartIcon: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('input[name="search"]'); // Assuming a search input with name="search"
    this.searchButton = page.locator('button[type="submit"][aria-label="Search"]'); // Assuming a search button
    this.cartIcon = page.getByRole('link', { name: /cart/i }); // More robust locator, assuming it's a link with "cart" in its accessible name
    this.cartCount = page.locator('.cart-icon .count'); // Assuming a count element within the cart icon
  }

  async searchProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getCartCount(): Promise<string | null> {
    return await this.cartCount.textContent();
  }

  async navigateToCart(): Promise<void> {
    await this.cartIcon.click();
    await this.page.waitForLoadState('networkidle');
  }
}
