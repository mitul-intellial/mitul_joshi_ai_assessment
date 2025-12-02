import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class NavigationBar extends BasePage {
  readonly logoutButton: Locator;
  readonly userProfileLink: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutButton = page.getByRole('button', { name: 'Logout' }); // More robust locator
    this.userProfileLink = page.getByRole('link', { name: /profile/i }); // More robust locator, assuming a link with "profile" in its accessible name
    this.loginLink = page.getByRole('link', { name: 'Login' }); // More robust locator
  }

  async clickLogout(): Promise<void> {
    await this.logoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserLoggedIn(): Promise<void> {
    await expect(this.userProfileLink).toBeVisible();
    await expect(this.logoutButton).toBeVisible();
    await expect(this.loginLink).not.toBeVisible();
  }

  async verifyUserLoggedOut(): Promise<void> {
    await expect(this.userProfileLink).not.toBeVisible();
    await expect(this.logoutButton).not.toBeVisible();
    await expect(this.loginLink).toBeVisible();
  }
}
