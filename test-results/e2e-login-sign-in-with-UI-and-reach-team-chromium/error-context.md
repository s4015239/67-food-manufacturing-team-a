# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/login.spec.ts >> sign in with UI and reach /team
- Location: e2e/login.spec.ts:9:5

# Error details

```
Error: DEPLOYED_URL environment variable is required
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | const BASE = process.env.DEPLOYED_URL;
  4  | const LOGIN_PATH = process.env.LOGIN_PATH || "/auth/signin";
  5  | const TEST_USERNAME = process.env.TEST_USERNAME;
  6  | const TEST_PASSWORD = process.env.TEST_PASSWORD;
  7  | const EXPECTED_PATH = process.env.EXPECTED_FINAL_PATH || "/team";
  8  | 
  9  | test("sign in with UI and reach /team", async ({ page }) => {
> 10 |   if (!BASE) throw new Error("DEPLOYED_URL environment variable is required");
     |                    ^ Error: DEPLOYED_URL environment variable is required
  11 |   if (!TEST_USERNAME || !TEST_PASSWORD)
  12 |     throw new Error("TEST_USERNAME and TEST_PASSWORD are required");
  13 | 
  14 |   await page.goto(`${BASE.replace(/\/$/, "")}${LOGIN_PATH}`, {
  15 |     waitUntil: "load",
  16 |   });
  17 | 
  18 |   await page.fill("#email", TEST_USERNAME);
  19 |   await page.fill("#password", TEST_PASSWORD);
  20 | 
  21 |   await Promise.all([
  22 |     page.click('button[type="submit"]'),
  23 |     page.waitForURL(`**${EXPECTED_PATH}`, { timeout: 15000 }),
  24 |   ]);
  25 | 
  26 |   // Assert the final path
  27 |   const final = new URL(page.url());
  28 |   expect(final.pathname).toBe(EXPECTED_PATH);
  29 | });
  30 | 
```