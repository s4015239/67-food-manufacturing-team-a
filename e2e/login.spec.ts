import { test, expect } from "@playwright/test";

const BASE = process.env.DEPLOYED_URL;
const LOGIN_PATH = process.env.LOGIN_PATH || "/auth/signin";
const TEST_USERNAME = process.env.TEST_USERNAME;
const TEST_PASSWORD = process.env.TEST_PASSWORD;
const EXPECTED_PATH = process.env.EXPECTED_FINAL_PATH || "/team";

test("sign in with UI and reach /team", async ({ page }) => {
  if (!BASE) throw new Error("DEPLOYED_URL environment variable is required");
  if (!TEST_USERNAME || !TEST_PASSWORD)
    throw new Error("TEST_USERNAME and TEST_PASSWORD are required");

  await page.goto(`${BASE.replace(/\/$/, "")}${LOGIN_PATH}`, {
    waitUntil: "load",
  });

  await page.fill("#email", TEST_USERNAME);
  await page.fill("#password", TEST_PASSWORD);

  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForURL(`**${EXPECTED_PATH}`, { timeout: 15000 }),
  ]);

  // Assert the final path
  const final = new URL(page.url());
  expect(final.pathname).toBe(EXPECTED_PATH);
});
