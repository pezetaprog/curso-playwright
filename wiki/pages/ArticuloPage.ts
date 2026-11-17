import { Page, Locator } from '@playwright/test';

export class ArticuloPage {
  readonly page: Page;
  readonly tituloPrincipal: Locator;
  readonly infobox: Locator;
  readonly mensajeSinResultados: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tituloPrincipal = page.locator('#firstHeading');
    this.infobox = page.locator('.infobox, table.wikitable').first();
    this.mensajeSinResultados = page.locator('.mw-search-nonefound');
  }
}
