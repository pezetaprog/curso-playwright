import { Page, Locator, test } from '@playwright/test';
import path from 'path';

// Quita los caracteres que Windows no permite en nombres de archivo
function limpiar(texto: string): string {
  return texto.replace(/[\\/:*?"<>|]/g, '').trim();
}

// Numera las capturas de cada prueba: 01, 02, 03...
function siguienteNumero(): string {
  const capturas = test.info().attachments.filter(a => a.contentType === 'image/png');
  return String(capturas.length + 1).padStart(2, '0');
}

// Toma la captura, la adjunta al reporte y la guarda en evidencias/<nombre de la prueba>/
async function tomarCaptura(page: Page, descripcion: string) {
  const nombre = `${siguienteNumero()} - ${limpiar(descripcion)}`;
  const ruta = path.join('evidencias', limpiar(test.info().title), `${nombre}.png`);

  const imagen = await page.screenshot({ path: ruta, fullPage: true });
  await test.info().attach(nombre, { body: imagen, contentType: 'image/png' });
}

// Marca el elemento en rojo, toma la captura y luego quita la marca
async function capturarResaltado(locator: Locator, descripcion: string) {
  await locator.scrollIntoViewIfNeeded();

  const estiloPrevio = await locator.evaluate(el => {
    const previo = el.getAttribute('style');
    el.style.outline = '3px solid red';
    el.style.outlineOffset = '2px';
    return previo;
  });

  await tomarCaptura(locator.page(), descripcion);

  await locator.evaluate((el, previo) => {
    if (previo === null) el.removeAttribute('style');
    else el.setAttribute('style', previo);
  }, estiloPrevio);
}

// ------------------- Acciones con evidencia -------------------

export async function clic(locator: Locator, descripcion: string) {
  await test.step(descripcion, async () => {
    await capturarResaltado(locator, descripcion);   // captura ANTES: muestra dónde se hará clic
    await locator.click();
  });
}

export async function escribir(locator: Locator, texto: string, descripcion: string) {
  await test.step(descripcion, async () => {
    await locator.fill(texto);
    await capturarResaltado(locator, descripcion);   // captura DESPUÉS: muestra el dato digitado
  });
}

export async function seleccionar(locator: Locator, valor: string, descripcion: string) {
  await test.step(descripcion, async () => {
    await locator.selectOption(valor);
    await capturarResaltado(locator, descripcion);
  });
}

// Para el resultado esperado: marca el elemento que se verificó
export async function evidenciaElemento(locator: Locator, descripcion: string) {
  await test.step(descripcion, async () => {
    await capturarResaltado(locator, descripcion);
  });
}

// Para capturar la pantalla completa sin marcar nada (por ejemplo, al abrir una página)
export async function evidenciaPantalla(page: Page, descripcion: string) {
  await test.step(descripcion, async () => {
    await tomarCaptura(page, descripcion);
  });
}
