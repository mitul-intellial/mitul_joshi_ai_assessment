// utils/dataGenerator.ts
// This file will contain functions to generate test data.

export function generateRandomString(length: number = 10): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateRandomEmail(): string {
  return `testuser_${generateRandomString(5)}@example.com`;
}

export function generateAddress(): {
  firstName: string;
  lastName: string;
  addressLine1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
} {
  return {
    firstName: generateRandomString(5),
    lastName: generateRandomString(7),
    addressLine1: `${Math.floor(Math.random() * 1000)} ${generateRandomString(8)} St`,
    city: generateRandomString(6),
    state: 'CA', // Example state
    zip: '90210', // Example zip
    country: 'US', // Example country
  };
}

// Add more data generation functions as needed for payment, product names, etc.
