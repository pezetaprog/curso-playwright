import { test, expect } from '@playwright/test';
import { WikiHomePage } from '../pages/WikiHomePage';
import { ArticuloPage } from '../pages/ArticuloPage';
import { evidenciaElemento } from '../../utils/acciones';

test.describe('The Binding of Isaac Wiki - Busqueda y Articulos', () => {
  let wikiHome: WikiHomePage;
  let articulo: ArticuloPage;

  test.beforeEach(async ({ page }) => {
    await page.addLocatorHandler(
      page.getByRole('button', { name: /Accept|Agree|Consent/i }),
      async (boton) => { await boton.click(); }
    );
    wikiHome = new WikiHomePage(page);
    articulo = new ArticuloPage(page);
    await wikiHome.goto();
  });

  test('CP-01 Busqueda exitosa de item existente', {
    tag: ['@smoke', '@wiki'],
    annotation: { type: 'HU', description: 'HU-01 Busqueda de items en la wiki' },
  }, async ({ page }) => {
    await wikiHome.buscar('R Key');

    await expect(page).toHaveURL(/\/wiki\/R_Key/);
    await expect(articulo.tituloPrincipal).toHaveText('R Key');
    await evidenciaElemento(articulo.tituloPrincipal, 'Resultado: titulo R Key visible');
  });

  test('CP-02 Busqueda sin resultados', {
    tag: ['@wiki'],
    annotation: { type: 'HU', description: 'HU-01 Busqueda de items en la wiki' },
  }, async () => {
    await wikiHome.buscar('iteminexistente999xyz');

    await expect(articulo.mensajeSinResultados).toContainText('There were no results matching the query');
    await evidenciaElemento(articulo.mensajeSinResultados, 'Resultado: mensaje sin coincidencias');
  });

  test('CP-03 Verificar ficha tecnica de Brimstone', {
    tag: ['@smoke', '@wiki'],
    annotation: { type: 'HU', description: 'HU-02 Consulta de ficha tecnica de un item' },
  }, async ({ page }) => {
    await wikiHome.buscar('Brimstone');

    await expect(page).toHaveURL(/\/wiki\/Brimstone/);
    await expect(articulo.infobox).toContainText('118');
    await evidenciaElemento(articulo.infobox, 'Resultado: infobox de Brimstone con ID 118');
  });
});
