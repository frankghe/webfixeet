/**
 * Screenshot helper — captures the current state of any page at multiple viewports.
 *
 * Usage:
 *   npx playwright test e2e/screenshot.ts                     # screenshots of /
 *   SCREENSHOT_PATH=/products npx playwright test e2e/screenshot.ts  # screenshots of /products
 *
 * Output: e2e/screenshots/<path>-<viewport>.png
 */
import { test } from "@playwright/test"
import path from "path"
import fs from "fs"

const targetPath = process.env.SCREENSHOT_PATH || "/"
const screenshotDir = path.join(__dirname, "screenshots")

test.beforeAll(() => {
  fs.mkdirSync(screenshotDir, { recursive: true })
})

function slugify(urlPath: string): string {
  return urlPath === "/" ? "home" : urlPath.replace(/^\//, "").replace(/\//g, "-")
}

test(`screenshot ${targetPath}`, async ({ page }, testInfo) => {
  await page.goto(targetPath, { waitUntil: "networkidle" })
  // Small delay for any CSS transitions to settle
  await page.waitForTimeout(500)

  const slug = slugify(targetPath)
  const viewport = testInfo.project.name // "desktop" or "mobile"
  const filePath = path.join(screenshotDir, `${slug}-${viewport}.png`)

  await page.screenshot({ path: filePath, fullPage: true })
})
