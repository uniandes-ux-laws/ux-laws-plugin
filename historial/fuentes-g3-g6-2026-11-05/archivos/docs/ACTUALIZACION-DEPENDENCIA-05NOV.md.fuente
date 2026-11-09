# Actualización de una dependencia

5 de noviembre de 2026. Cambios locales para revisión de Juan.

## Qué se cambia

La entrega 0.2.1 usa fast-uri 3.1.9 en lugar de 3.1.7. Esta librería viene con Ajv,
que usamos para comprobar los archivos de entrada y los resultados. Sus autores
publicaron la corrección para problemas al interpretar direcciones manipuladas.
Fuentes: [aviso de seguridad](https://github.com/fastify/fast-uri/security/advisories/GHSA-w74x-v6f9-j3xg)
y [versión corregida](https://github.com/fastify/fast-uri/releases/tag/v3.1.9).

## Cómo se conserva el trabajo anterior

El archivo original de dependencias forma parte del registro sellado de G1. Por eso
se conserva y se prepara otro en `release/package-lock.json`. El preparador revisa
que solo se haya cambiado fast-uri y la versión de la entrega. Las demás librerías
conservan sus versiones. `release/dependencias.json` deja registrado qué se actualizó.

La entrega anterior 0.2.0, su ZIP y sus comprobaciones se mantienen. Las reglas de los
grupos y las respuestas de los pilotos tampoco se modifican. Las reglas en Word y
PDF se regeneran para indicar 0.2.1 y la fecha nueva; sus criterios son los mismos.

## Cómo usar la actualización

Descomprime `dist/ux-laws-0.2.1.zip` en una carpeta nueva y entra en esa carpeta:

```bash
npm ci
npx playwright install chromium
npm run link
npm run verify
npm test
```

La raíz del repositorio conserva las dependencias históricas. Para usar la corrección,
ejecuta desde la carpeta nueva; instalar en la raíz vuelve a usar el archivo anterior.

## Revisión

- Pasaron las **284 pruebas** del proyecto con fast-uri 3.1.9 en una copia temporal
  del código. La primera preparación de esa copia no incluía una carpeta de ejemplos;
  se añadió antes de repetir las pruebas completas. No se cambió el código por ese fallo.
- La revisión de dependencias terminó con **cero avisos conocidos**. También se
  comprobó que los ejemplos de direcciones manipuladas del aviso sean rechazados y
  que una dirección normal siga aceptándose.
- El paquete se instaló en una carpeta temporal fuera del repositorio, en este Mac.
  Se comprobaron captura local, medidas y preparación de 35 y 65 solicitudes.
- Los **5.159 archivos históricos y diez sellos de pilotos** siguen válidos. El ZIP
  0.2.0 y sus archivos conservan sus huellas anteriores.
- Word y PDF conservan las 42 páginas y los mismos criterios. Se contrastaron con la
  edición anterior: solo cambian la fecha, el número de entrega y los pies de página.

Las comprobaciones de esta actualización se guardan en
`dist/comprobacion-0.2.1/` y `dist/COMPROBACION-ENTREGA-0.2.1.json`.
Allí se distinguen las pruebas del código, la instalación del ZIP, la revisión de
dependencias y la conservación de los archivos anteriores. No se harán solicitudes
a modelos ni nuevas calificaciones como parte de esta actualización.

## Límites

Una revisión de dependencias sin avisos conocidos no demuestra que todo el programa
esté libre de problemas de seguridad. Siguen pendientes la instalación en otro equipo,
la prueba completa con modelos reales de ambos entornos y las respuestas de expertos.
G1 conserva su marca de no interpretable v1. No se publicó esta actualización en GitHub.
