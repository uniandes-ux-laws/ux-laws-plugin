# Captura de una pantalla

La captura usa Chromium de Playwright y guarda lo visible en 1440 × 900, sin scroll.
Desde la raíz del proyecto:

```bash
node capture/capture.js https://www.banrep.gov.co --out captures/ejemplo
```

Para verla junto al wireframe:

```bash
node scripts/demo.js https://www.banrep.gov.co
```

Abre la ruta de `demo.html` que indique la terminal. La demo no evalúa con un modelo.

## Archivos guardados

- `screenshot.png`: imagen de la pantalla.
- `wireframe.png`: representación de su estructura; las imágenes se marcan con una X.
- `nodes.json`: nodos que tocan el área visible, con cajas y atributos del navegador.
- `meta.json`: fecha, viewport, huellas de imágenes, sanidad y advertencias de captura.

`bounds` es la caja del elemento; `ink` es el espacio donde pinta algo visible.
G7 usa bounds porque mide el área del clic. Los otros grupos estructurales usan ink.
Un contenedor transparente no se dibuja como si tuviera borde y no tapa por sí solo
lo que hay debajo. Las cajas pueden rebasar el viewport, pero los nodos que quedan
completamente fuera no forman parte de la pantalla evaluada.

El descarte automático de avisos conserva el catálogo cerrado del 10 de septiembre.
El detector del 4 de noviembre revisa capas antes y después de guardar la pantalla.
Si queda un aviso o falta comprobar algo, se muestra la advertencia. Una marca antigua
de «limpio» o una buena coincidencia geométrica no garantiza que el contenido esté despejado.
Los marcos internos no se revisan como la página principal y se declaran como pendientes.

## Comprobar la geometría

```bash
node capture/verify-fidelity.js --tolerance 1
```

La prueba usa páginas locales en `fixtures/`, con cajas conocidas. Si falla, revisa
la captura antes de evaluar. Que pase solo comprueba esas cajas; no valida puntajes
ni detecta todos los posibles avisos de una página real.

Para instalar dependencias y Chromium, sigue [instalación](../docs/instalacion.md).
