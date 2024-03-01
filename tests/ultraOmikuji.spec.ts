import { test, expect, Download } from '@playwright/test';
import OmikujiPage from './Omikuji.page';
import * as path from 'path';
import * as fs from 'fs';

test.describe.configure({ mode: "serial" })

test.describe("おみくじを引いた後のダウンロード", () => {
  const savePath = path.join('tests', 'downloads');

  test.beforeAll(() => {
    try {
      fs.statSync(savePath);
    } catch {
      fs.mkdirSync(savePath);
    }
  })

  test.beforeEach(() => {
    // savePathの中身を削除
    const files = fs.readdirSync(savePath);
    for (const file of files) {
      fs.unlinkSync(path.join(savePath, file));
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

    const fileContents = readFilesInDirectory(savePath);
    expect(fileContents).toHaveLength(5);

    // ブラウザに表示された結果と比較
    const result = await omikujiPage.getResult();
    expect(fileContents.join(", ")).toBe(result);

    for (const fileContent of fileContents) {
      console.log(fileContent); // 大吉出るかな...?
      expect(fileContent).toMatch(/大吉|吉|中吉|小吉|末吉|凶|大凶/);
    }
  })
})

function readFilesInDirectory(directoryPath: string) {
  try {
    const files = fs.readdirSync(directoryPath);
    const fileContents =
      files
        .filter(file => fs.statSync(path.join(directoryPath, file)).isFile())
        .map(file => {
          const filePath = path.join(directoryPath, file);
          return fs.readFileSync(filePath, 'utf8');
        })
    return fileContents;
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
}
