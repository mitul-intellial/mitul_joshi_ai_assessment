import { Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async verifyUrl(expectedUrl: string): Promise<void> {
    await expect(this.page).toHaveURL(expectedUrl);
  }

  async verifyTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Handles cookie consent modal on homepage.
   * Automatically clicks Allow or Deny if visible.
   * Silently ignores if banner does not exist.
   */
  async dismissCookieBanner(): Promise<void> {
    const allowButton = this.page.getByRole('button', { name: /allow/i });
    const denyButton = this.page.getByRole('button', { name: /deny/i });

    try {
      if (await allowButton.isVisible({ timeout: 2000 })) {
        await allowButton.click();
        await this.waitForPageLoad();
        return;
      }

      if (await denyButton.isVisible({ timeout: 2000 })) {
        await denyButton.click();
        await this.waitForPageLoad();
        return;
      }
    } catch {
      // modal did not appear - ignore and continue
    }
  }
}
