import { Page } from '@playwright/test';

export default class OmikujiPage {
  constructor(private page: Page) { }

  async open() {
    await this.page.goto('http://localhost:5173');
  }

  async drawOmikuji() {
    const omikujiButton = this.page.getByRole("button", { name: "おみくじを引く" }).first();
    await omikujiButton.click();
  }

  async drawUltraOmikuji() {
    const ultraOmikujiButton = this.page.getByRole("button", { name: "おみくじを引く" }).last();
    await ultraOmikujiButton.click();
  }

  async getResult() {
    const result = await this.page.getByText(/おみくじの結果: .*/).textContent();
    return result?.replace('おみくじの結果: ', '');
  }
}