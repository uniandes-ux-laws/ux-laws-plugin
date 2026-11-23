# Aislamiento y permisos

David sustituyó el clon y la compuerta de acceso por trabajo en el repositorio original y acceso de lectura declarado. Cada subagente recibe la instrucción: «lee solo tu carpeta de entrada; no abras panel/, resultados/ ni historial Git». El acceso de lectura al repositorio es un límite de la corrida: el encargo no es una barrera técnica.

P1 se repitió con un token fijado después de un primer intento inválido. Un subagente nuevo con `fork_turns=none` respondió que no conocía el token. En P3, otro subagente con el mismo mecanismo respondió que no conocía resultados numéricos de acuerdo, sin consultar archivos. Esas observaciones no demuestran aislamiento del disco.

En la comprobación anterior a la decisión de David, otro subagente pudo abrir un archivo del panel original para lectura y cerrarlo sin leer bytes ni revelar nombres o contenidos. El HEAD contenía archivos de panel y resultados en Git. La nueva decisión registra esa posibilidad como límite y ya no la trata como compuerta. Esta sesión no lee ni usa panel/ y no ejecuta la comparación con el panel.

## Rama bloqueada

Comando, ejecutado en el repositorio original:

```text
git switch -c canales-codex
```

Código de salida: 1. Error exacto:

```text
fatal: cannot lock ref 'refs/heads/canales-codex': Unable to create 'C:/Users/d.hernandeza2/Downloads/ux-laws-plugin/.git/refs/heads/canales-codex.lock': Permission denied
```

No se cambió el modo de permisos. Más adelante la rama `canales-codex` apareció por una acción externa a este proceso, y el commit `b2d730a00648dbdf110cb2c048b5c36b3af9db3a` contiene la regla de análisis sin diferencias respecto al archivo de trabajo. Se verificó antes de iniciar solicitudes del estudio.

Se intentó registrar las pruebas previas mediante:

```text
git add -- 'resultados/canales-codex-2026-11-20/registros/aislamiento.md' 'resultados/canales-codex-2026-11-20/registros/pruebas-previas.md'
```

Código de salida: 1. Error exacto:

```text
fatal: Unable to create 'C:/Users/d.hernandeza2/Downloads/ux-laws-plugin/.git/index.lock': Permission denied
```

Desviación registrada el 20 de noviembre: las pruebas P1, P3 y P6 están documentadas en el árbol de trabajo, pero su commit previo previsto quedó bloqueado. David indicó continuar lo que fuera posible cuando el sandbox bloquee un comando. La regla de análisis sí está commiteada antes de las solicitudes; se reintentará el commit de los registros cuando sea posible.

Tras cerrar H01, el índice no tenía archivos preparados y se intentó `git add -- 'scripts/orchestrate.js' 'scripts/execution-options.js' 'scripts/perfil-legible.js' 'scripts/resumen-claro.js' 'scripts/orchestrate-series.test.js'`. Salió con código 128 y repitió exactamente: `fatal: Unable to create 'C:/Users/d.hernandeza2/Downloads/ux-laws-plugin/.git/index.lock': Permission denied`. El avance permanece en archivos de trabajo y se conservará para el commit local posterior.

## Ejecutor de pruebas de Node

Comando: `node --test scripts/orchestrate-series.test.js`. Error del ejecutor de pruebas:

```text
Error: spawn EPERM
errno: -4048
code: 'EPERM'
syscall: 'spawn'
```

La ejecución directa `node scripts/orchestrate-series.test.js`, con salida heredada para los procesos hijos, sí pudo comprobar el cambio sin cambiar permisos; su resultado se registra en pruebas-previas.md. En una comprobación separada, `spawnSync` con `stdio:pipe` devolvió `spawnSync C:\Program Files\nodejs\node.exe EPERM`, mientras que con `stdio:inherit` devolvió código 0.
