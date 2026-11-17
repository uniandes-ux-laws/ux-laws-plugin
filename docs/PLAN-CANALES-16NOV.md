# Corrida de canales: procedimiento

16 de noviembre de 2026. Describe cómo se ejecuta y cómo se reanuda la corrida de canales.
Se escribe antes de la primera solicitud. La regla de análisis está en
`docs/ANALISIS-CANALES-16NOV.md`. No hay fecha límite: el equipo decidió que el tiempo no
restringe esta corrida.

## Tamaño

30 páginas, modo `comparacion`, `--repeticiones 1`. Son 13 solicitudes por página: seis
grupos en dos canales y G4 en screenshot. En total, **390 solicitudes**, cada una en un
subagente nuevo.

Salida: `resultados/canales-claude-code-2026-11-16/<página>/`, con el mismo esquema que
`resultados/corpus-claude-code-2026-11-13/`. Registros en `registros/` de esa carpeta.

## Orden

Se intercalan los estratos, para que lo cerrado quede equilibrado si la corrida se detiene:

H01, G01, L01, H02, G02, L02, … H10, G10, L10.

Las cinco páginas con `sanity_ok=false` (G01, G04, L01, L02, L03) se preparan con
`--aceptar-sanidad-fallida`, como decidió el equipo el 15 nov.

## Preparación (una vez, antes de evaluar)

```bash
node scripts/orchestrate.js preparar --captura captures/<ID> \
  --out resultados/canales-claude-code-2026-11-16/<ID> --modo comparacion --repeticiones 1 \
  --runtime claude-code-vscode --model-id claude-opus-5-5 \
  --decoding '{"declarado":"no expuesto por el runtime"}' [--aceptar-sanidad-fallida]
node scripts/orchestrate.js verificar --corrida resultados/canales-claude-code-2026-11-16/<ID>
```

`model-id` es el que declaró cada subagente de la corrida del 13 nov. Se comprueba de
nuevo con la línea (b) del reporte de cada subagente. Si algún subagente declara otro
modelo, se registra en su invocación y el informe separa esas páginas.

## Ciego respecto del panel

Antes de la primera solicitud se sacan del repositorio, a una carpeta temporal de la
sesión:

- `panel/respuestas/`, `panel/entregas/` y `panel/descripcion-panel.json`;
- `resultados/corpus-claude-code-2026-11-13/comparacion-panel.json`, que tiene el nivel
  del panel por unidad.

**El `CLAUDE.md` que heredan los subagentes resume ahora la comparación con el panel**
(κ, y que el sistema puntúa por debajo del panel salvo en G2). En la corrida del 13 nov.
ese texto no existía. Durante la corrida, ese pasaje se quita de la copia de trabajo de
`CLAUDE.md`; el original se guarda aparte, y el cambio nunca entra a un commit. Un
subagente de sondeo, sin herramientas, comprueba qué ve el contexto antes de empezar.

Todo se restaura al cerrar la última página o al detenerse la corrida. Las horas quedan en
`registros/ciego-panel.log`.

## Ejecución de una página

1. Se lanzan los 13 subagentes de la página, con a lo sumo 20 activos a la vez: herramienta
   Agent, tipo por defecto, sin fork, `model=opus`.
2. El encargo es el mismo de la corrida del 13 nov., con la ruta de la solicitud: leer solo
   la solicitud, su prompt y sus imágenes; escribir solo `resultado_esperado`; no ejecutar
   comandos, no usar la web, no delegar. Cada subagente reporta la ruta escrita, el modelo
   que dice ser y si alguna línea le llegó cortada.
3. Las líneas de reporte se guardan en `registros/reportes-<ID>.md`.
4. Cuando la página tiene sus 13 respuestas, y los archivos llevan 120 s sin cambiar, se
   escribe en cada invocación del libro `contexto_limpio: true` y el mecanismo, con su
   límite. Luego se cierra con `recoger --conservar-invalidas`. La salida queda en
   `registros/recoger-<ID>.log`.

Ninguna respuesta se corrige ni se repite. Una inválida queda inválida.

## Límite de uso y reanudación

En la corrida del 13 nov., cada ventana de 5 horas admitió unas 40 evaluaciones con opus,
y hubo un tope de 20 subagentes simultáneos. Con 390 solicitudes, se esperan del orden de
diez ventanas. **No se abrevia** para llegar antes.

- **Estado reanudable.** Una página está cerrada si tiene `perfil.json`. Una solicitud
  está hecha si existe su archivo en `resultados/`. No hay otro estado.
- **Un subagente detenido por el límite sin escribir respuesta** se reanuda con su propio
  contexto (SendMessage) cuando el límite se libera. Si ese contexto ya no está disponible,
  se lanza un subagente nuevo para esa solicitud y queda anotado: no hubo respuesta que
  repetir.
- **Un subagente detenido después de escribir su respuesta, sin enviar reporte,** deja su
  respuesta como está. Se anota en el informe, como los 26 casos del 13 nov.
- **Commits del avance:** cada pocas páginas cerradas, con sus carpetas y registros. Nunca
  `CLAUDE.md` mientras dure la corrida.
- **Si la sesión se detiene,** se retoma leyendo este documento y el estado del disco.

## Al terminar

Se restaura lo que se sacó y se corre el análisis:

```bash
node scripts/comparar-canales.js --corrida resultados/canales-claude-code-2026-11-16 \
  --anterior resultados/corpus-claude-code-2026-11-13
```

Después se corren `seal:verify`, `validate` y `node --test`, y `git diff --stat` contra el
commit previo para mostrar que ningún archivo sellado cambió. Por último se escribe
`INFORME.md`.
