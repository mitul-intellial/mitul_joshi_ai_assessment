import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  loginLink = this.page.getByRole('link', { name: /login or register/i });
  emailField = this.page.getByPlaceholder('E-mail address');
  passwordField = this.page.locator('#id_login_password'); // confirm this id
  loginButton = this.page.getByRole('button', { name: /login/i });
  dashboardHeader = this.page.getByRole('heading', { name: /my account/i });

  async gotoLoginPage(): Promise<void> {
    await this.navigate(process.env.BASE_URL!);
    await this.dismissCookieBanner();
    await this.loginLink.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL(/\/login/);
  }


  async fillUsername(username: string): Promise<void> {
    await expect(this.emailField).toBeVisible();
    await this.emailField.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await expect(this.passwordField).toBeVisible();
    await this.passwordField.fill(password);
  }

  async submitLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.gotoLoginPage();
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.submitLogin();

    // Validate Dashboard
    await expect(this.dashboardHeader).toBeVisible();
  }
}
