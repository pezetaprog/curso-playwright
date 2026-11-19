# Automatización de Wiki: The Binding of Isaac con Playwright

Proyecto de automatización de pruebas End-to-End (E2E) sobre la wiki oficial [The Binding of Isaac: Rebirth Wiki (wiki.gg)](https://bindingofisaacrebirth.wiki.gg/) utilizando **Playwright**, **TypeScript** y el patrón **Page Object Model (POM)**, con generación automática de evidencias fotográficas resaltadas.

---

## 1. Diseño Funcional

### Historias de Usuario (HU)

- **HU-01 Búsqueda de ítems en la wiki:** Como jugador, quiero buscar ítems por su nombre en el buscador principal para consultar sus efectos y estadísticas.
- **HU-02 Consulta de ficha técnica (Infobox) de un ítem:** Como jugador, quiero verificar la ficha técnica de un ítem (ID, calidad o descripción) dentro de su artículo para confirmar sus propiedades en el juego.

---

### Casos de Prueba (CP)

| ID | HU | Nombre del caso | Datos de entrada | Resultado esperado |
| :--- | :--- | :--- | :--- | :--- |
| **CP-01** | HU-01 | Busqueda exitosa de item existente | `R Key` | Redirige a `/wiki/R_Key` y muestra el encabezado principal `R Key`. |
| **CP-02** | HU-01 | Busqueda sin resultados | `iteminexistente999xyz` | Muestra la página de resultados con el mensaje `"There were no results matching the query."`. |
| **CP-03** | HU-02 | Verificar ficha tecnica de Brimstone | `Brimstone` | Abre el artículo de Brimstone y muestra su ID (`118`) y calidad visibles en la ficha técnica (Infobox). |

---

## 2. Arquitectura del Proyecto

El proyecto sigue una estructura limpia y modular bajo el patrón **Page Object Model (POM)**:

```text
curso-playwright/
├── evidencias/                                # Capturas con resaltado en rojo generadas automáticamente
│   ├── CP-01 Busqueda exitosa de item existente/
│   ├── CP-02 Busqueda sin resultados/
│   └── CP-03 Verificar ficha tecnica de Brimstone/
├── wiki/
│   ├── pages/
│   │   ├── WikiHomePage.ts                   # Page Object: portada y buscador global
│   │   └── ArticuloPage.ts                   # Page Object: título, infobox y mensajes
│   └── tests/
│       └── wiki.spec.ts                      # Suite de pruebas E2E con tags y anotaciones
├── utils/
│   └── acciones.ts                           # Helper de acciones (clic, escribir, evidencia con recuadro rojo)
├── playwright.config.ts                      # Configuración de Playwright
└── package.json
```

---

## 3. Instrucciones de Ejecución

Para ejecutar la suite de pruebas de automatización de la wiki:

```bash
# Ejecución completa
npm test

# Ejecución con navegador visible (headed)
npm run test:headed

# Modo interactivo con interfaz gráfica (UI Mode)
npm run test:ui

# Ver el reporte interactivo en HTML
npm run report
```

O directamente con Playwright:

```bash

```

---

## 4. Evidencias de Ejecución

Todas las capturas se generaron automáticamente durante la ejecución mediante el módulo `utils/acciones.ts`, aplicando un recuadro rojo (`outline: 3px solid red`) sobre el elemento inspeccionado antes de cada acción o verificación.

### CP-01: Busqueda exitosa de item existente

1. **Apertura de la página:**  
   ![01 - Abrir pagina principal](evidencias/CP-01%20Busqueda%20exitosa%20de%20item%20existente/01%20-%20Abrir%20pagina%20principal%20de%20Isaac%20Wiki.png)

2. **Escritura del término:**  
   ![02 - Escribir R Key](evidencias/CP-01%20Busqueda%20exitosa%20de%20item%20existente/02%20-%20Escribir%20R%20Key%20en%20el%20buscador.png)

3. **Clic en Search:**  
   ![03 - Clic en Search](evidencias/CP-01%20Busqueda%20exitosa%20de%20item%20existente/03%20-%20Clic%20en%20el%20boton%20Search.png)

4. **Resultado esperado (Título visible):**  
   ![04 - Titulo R Key visible](evidencias/CP-01%20Busqueda%20exitosa%20de%20item%20existente/04%20-%20Resultado%20titulo%20R%20Key%20visible.png)

---

### CP-02: Busqueda sin resultados

1. **Apertura de la página:**  
   ![01 - Abrir pagina principal](evidencias/CP-02%20Busqueda%20sin%20resultados/01%20-%20Abrir%20pagina%20principal%20de%20Isaac%20Wiki.png)

2. **Escritura del término inexistente:**  
   ![02 - Escribir termino](evidencias/CP-02%20Busqueda%20sin%20resultados/02%20-%20Escribir%20iteminexistente999xyz%20en%20el%20buscador.png)

3. **Clic en Search:**  
   ![03 - Clic en Search](evidencias/CP-02%20Busqueda%20sin%20resultados/03%20-%20Clic%20en%20el%20boton%20Search.png)

4. **Resultado esperado (Mensaje sin coincidencias):**  
   ![04 - Mensaje sin coincidencias](evidencias/CP-02%20Busqueda%20sin%20resultados/04%20-%20Resultado%20mensaje%20sin%20coincidencias.png)

---

### CP-03: Verificar ficha tecnica de Brimstone

1. **Apertura de la página:**  
   ![01 - Abrir pagina principal](evidencias/CP-03%20Verificar%20ficha%20tecnica%20de%20Brimstone/01%20-%20Abrir%20pagina%20principal%20de%20Isaac%20Wiki.png)

2. **Escritura del término Brimstone:**  
   ![02 - Escribir Brimstone](evidencias/CP-03%20Verificar%20ficha%20tecnica%20de%20Brimstone/02%20-%20Escribir%20Brimstone%20en%20el%20buscador.png)

3. **Clic en Search:**  
   ![03 - Clic en Search](evidencias/CP-03%20Verificar%20ficha%20tecnica%20de%20Brimstone/03%20-%20Clic%20en%20el%20boton%20Search.png)

4. **Resultado esperado (Infobox con ID 118):**  
   ![04 - Infobox Brimstone ID 118](evidencias/CP-03%20Verificar%20ficha%20tecnica%20de%20Brimstone/04%20-%20Resultado%20infobox%20de%20Brimstone%20con%20ID%20118.png)
