import { Page, expect, Response } from '@playwright/test';

/**
 * Waits for a specific API response, validates its HTTP status, and returns the parsed JSON body.
 * @param page The Playwright Page object.
 * @param urlPattern A string or RegExp to match the response URL.
 * @param method The HTTP method of the request (e.g., 'POST', 'GET').
 * @returns The parsed JSON body of the response.
 */
export async function waitForAPIResponse(
  page: Page,
  urlPattern: string | RegExp,
  method: string
): Promise<any> {
  let apiResponse: Response;

  try {
    apiResponse = await page.waitForResponse(
      (response) => response.url().match(urlPattern) && response.request().method() === method
    );
  } catch (error) {
    throw new Error(`Failed to wait for API response matching ${urlPattern} with method ${method}: ${error}`);
  }

  // Validate HTTP status code
  expect(apiResponse.status(), `Expected API response status to be 200 for ${urlPattern}`).toBe(200);

  // Return parsed JSON body
  const responseBody = await apiResponse.json();
  return responseBody;
}
