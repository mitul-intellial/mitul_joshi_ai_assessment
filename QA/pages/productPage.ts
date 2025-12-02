import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductPage extends BasePage {
  // Locators for product listing
  readonly categoryLink: (categoryName: string) => Locator;
  readonly productCard: Locator; // Generic locator for any product card
  readonly firstProductCard: Locator; // Locator for the first product card

  // Locators for product detail view (initial validation)
  readonly productDetailName: Locator;
  readonly productDetailPrice: Locator;
  readonly productDetailImage: Locator;

  constructor(page: Page) {
    super(page);
    this.categoryLink = (categoryName: string) => page.getByRole('link', { name: categoryName });
    this.productCard = page.locator('.product-card'); // Keeping generic class, consider data-testid for robustness
    this.firstProductCard = page.locator('.product-card').first(); // Keeping generic class, consider data-testid for robustness

    this.productDetailName = page.getByRole('heading', { level: 1 }); // Assuming product name is an H1
    this.productDetailPrice = page.locator('.product-detail-price'); // Keeping generic class, consider data-testid or getByText for robustness
    this.productDetailImage = page.getByRole('img', { name: /product image/i }); // More robust locator
  }

  async navigateToCategory(categoryName: string): Promise<void> {
    await this.categoryLink(categoryName).click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL(new RegExp(`category=${categoryName.toLowerCase()}`));
  }

  async selectFirstProduct(): Promise<void> {
    await expect(this.firstProductCard).toBeVisible();
    await this.firstProductCard.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validateProductDetailLoaded(): Promise<void> {
    await expect(this.productDetailName).toBeVisible();
    await expect(this.productDetailName).not.toBeEmpty();
    await expect(this.productDetailPrice).toBeVisible();
    await expect(this.productDetailPrice).not.toBeEmpty();
    await expect(this.productDetailImage).toBeVisible();
    // Optionally, check if the image has a src attribute
    await expect(this.productDetailImage).toHaveAttribute('src', /.+/);
  }
}
