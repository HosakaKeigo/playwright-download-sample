import { test, Download } from '@playwright/test';
import OmikujiPage from './Omikuji.page';
import * as path from 'path';
import * as fs from 'fs';

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
    const downloads: Download[] = [];
    page.on('download', (download: Download) => {
      downloads.push(download);
    });

    const omikujiPage = new OmikujiPage(page);
    await omikujiPage.open();

    await omikujiPage.drawUltraOmikuji();
    await page.waitForTimeout(500);

    for await (const download of downloads) {
      await download.saveAs(path.join(savePath, download.suggestedFilename()));
    }
  })
})
