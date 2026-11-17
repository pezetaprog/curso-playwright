import { Page, Locator } from '@playwright/test';
import { clic, escribir, evidenciaPantalla } from '../../utils/acciones';

export class WikiHomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Selector estándar de MediaWiki / wiki.gg
    this.searchInput = page.locator('#searchInput');
    this.searchButton = page.locator('#searchButton');
  }

  async goto() {
    await this.page.goto('/');
    await evidenciaPantalla(this.page, 'Abrir pagina principal de Isaac Wiki');
  }

  async buscar(termino: string) {
    await escribir(this.searchInput, termino, `Escribir "${termino}" en el buscador`);
    await clic(this.searchButton, 'Clic en el boton Search');
  }
}
