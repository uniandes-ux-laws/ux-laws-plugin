# G1: cierre con una limitación conocida

21 de octubre de 2026. **Estado: no interpretable en la versión 1.** Cerramos la
revisión técnica y dejamos documentado que G1 no distingue suficientemente entre
estas páginas. Esto no equivale a validar sus puntajes.

## Qué se revisó

El piloto técnico del 11 de septiembre contiene 24 páginas. Se ejecutó el mismo
script sobre copias temporales de sus nodos y metadatos: los **24 resultados de G1
coincidieron completos** con los originales, incluidos sus criterios y triggers.
El archivo histórico no se sobrescribió. Es código provisional; **no es un piloto
del modelo ni una ejecución de la skill publicada**. No hubo solicitudes al modelo.

| Grupo y estado | Nivel 0 | Nivel 1 | Nivel 2 | Nivel 3 | Nivel 4 | NA histórico |
|---|---:|---:|---:|---:|---:|---:|
| G1 — no interpretable v1 | 23 | 1 | 0 | 0 | 0 | 0 |

C04 fue la única página con nivel 1. Las demás recibieron 0: 23 de 24 (95,8 %).
Esta concentración limita su uso para comparar páginas. No demuestra que las
páginas tengan la misma calidad ni que los principios Gestalt fallen en general.
El alcance es esta rúbrica, su implementación provisional y estas capturas.

## Qué encontramos en las mediciones

| Criterio | Qué cuenta esta implementación | Sin base de cálculo | Proporción > 0,25 | Proporción > 0,50 |
|---|---|---:|---:|---:|
| C1 | Grupos cuya separación queda bajo el corte | 8 | 10 | 10 |
| C2 | Elementos que desbordan su contenedor visible | 0 | 2 | 0 |
| C3 | Bloques fuera de los ejes o anchos dominantes | 0 | 13 | 9 |
| C4 | Conjuntos con diferencias de altura o alineación | 0 | 24 | 20 |

C4 queda generalizado en las 24 páginas. En 20 supera 0,50 y basta por sí solo
para activar el nivel 0. Sus proporciones sí varían; lo que se concentra es el
nivel final. Usar la misma etiqueta HTML y el mismo padre para formar conjuntos
puede juntar elementos de funciones distintas. Es una limitación de la definición
operativa que merece revisión futura, no una causa única ya demostrada.

Se recalcularon las mediciones 1.0.6 en memoria, sin escribir sobre las capturas.
Coincidieron los afectados, denominadores y categorías de C1–C4 en las 24 páginas.
En 19 páginas hay diferencias de precisión: el histórico guarda tres decimales
y la capa actual cuatro. No se igualaron ni se convirtieron en puntajes nuevos.

Hay dos advertencias adicionales, registradas después del piloto:

- **C1 no se pudo calcular en ocho páginas:** C02, C03, C06, C12, C13, C18, R03, R07.
  Un valor nulo no significa que la separación sea correcta. El código histórico
  omite esa condición al combinar el nivel; no hay cobertura completa en esos casos.
- **C13 tiene un solo grupo.** Conservamos su 0 original, pero tanto el piloto
  provisional como la capa 1.0.6 usan NA solo si no hay grupos. La skill exige
  menos de dos. Por eso ese 0 no cumple la regla de aplicabilidad publicada.
  No se reemplazó por un NA. Al revisar por separado las otras 23 páginas siguen
  apareciendo 22 ceros y un uno: la concentración no depende solo de C13.

En C04, C4 vale exactamente 0,50 y C3 vale 0,25. Por eso no activa el corte
estricto > 0,50 y conserva nivel 1 con trigger C4. Esto explica el cálculo;
no demuestra que su evaluación sea correcta frente a expertos.

## Cómo queda cerrado

Juan confirmó el 21 de octubre que el cierre debe conservar esta limitación,
según lo acordado con Camilo. Registramos ese alcance; no se atribuye al asesor
una aprobación experta de los puntajes ni reglas adicionales.

Se conserva la rúbrica sin mover cortes para repartir resultados. En el perfil
de resultados G1 debe figurar **no interpretable v1**, en la misma tabla.
Si más adelante se calcula acuerdo global con expertos, se reportará con y sin
G1, como exige el [protocolo](../../docs/protocolo.md). No hay datos humanos para
calcularlo ahora. Proximidad, Prägnanz, Región común y Similitud siguen sin un
resultado interpretable en esta versión; tampoco se resolvió su correspondencia
con el juicio experto. La reproducción local no prueba la hipótesis H1 del modelo.

Los cortes son convenciones del proyecto, no umbrales derivados de esas leyes.
Prägnanz se aproxima mediante regularidad geométrica; no equivale al principio
original. La similitud se evalúa sin color. Estas restricciones se mantienen.

El 21/3 descrito para una corrida anterior solo tiene respaldo narrativo en el
informe histórico. El artefacto versionado reproduce 23/1. No se reconstruyeron
datos ausentes ni se separó el efecto de correcciones publicadas juntas.

Una futura versión tendría que resolver aplicabilidad, C1 sin base y equivalencia
de conjuntos, registrar las reglas antes de evaluar y conservar esta versión.
La validación experta y el consenso siguen pendientes; el panel depende de ética.
No son necesarios para reconocer y documentar la limitación observada, pero sí
para afirmar correspondencia con el juicio humano.

## Archivos y comprobación

- [Datos y mediciones por página](resultados.json) y [tabla CSV](paginas.csv).
- [Comprobaciones](VERIFICACION.json) y [fuentes por hash](FUENTES-SHA256.tsv).
- [Resumen del cierre](../../docs/CIERRE-G1-21OCT.md).

Se conservaron 5159 archivos anteriores frente a 2313903 y se verificaron los
diez sellos de pilotos (4.160 archivos protegidos), sin regenerarlos. Los sellos
de corpus, calibración y dorados se comprueban también con sus comandos existentes.
El sello de este cierre usa rutas relativas a la raíz del repositorio.

Para repetir la revisión sin solicitar respuestas ni sobrescribir resultados:

```bash
node scripts/g1-closure.js verificar
```
