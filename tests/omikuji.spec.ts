import { test, expect } from '@playwright/test';
import OmikujiPage from './Omikuji.page';
import * as path from 'path';
import * as fs from 'fs';

test("おみくじを引く", async ({ page }) => {
  const omikujiPage = new OmikujiPage(page);
  await omikujiPage.open();
  await omikujiPage.drawOmikuji();
  const result = await omikujiPage.getResult();
  expect(result).toMatch(/大吉|吉|中吉|小吉|末吉|凶|大凶/);
});

test.describe("おみくじを引いた後のダウンロード", () => {
  const savePath = path.join('tests', 'downloads');

  test.beforeAll(() => {
    try {
      fs.statSync(savePath);
    } catch {
      fs.mkdirSync(savePath);
    }
  })

  test("ブラウザに表示された結果がファイルに保存されること", async ({ page }) => {
    const omikujiPage = new OmikujiPage(page);
    await omikujiPage.open();

    const downloadPromise = page.waitForEvent('download');
    await omikujiPage.drawOmikuji();
    const download = await downloadPromise;
    await download.saveAs(path.join(savePath, download.suggestedFilename()));
  })
})
