# capture/pages

Diagnostic pages. These are **not** fidelity fixtures: they declare no `exp_` or
`ink_` assertions and `verify-fidelity.js` does not read this directory.

They exist to measure the size of an effect, not to assert a value.

| Página | Para qué |
|---|---|
| `inkgap.html` | Reproduce, con geometría declarada en el propio archivo, el caso en que los contenedores son más anchos que su texto. `diagnose-grouping.js` calcula sobre ella la razón de agrupación con cajas de layout y con cajas de tinta. |
| `portal.html` | Página sintética con la estructura de marcado que usan la mayoría de los portales institucionales. Sirve para dar una magnitud agregada. **No es una página real ni una página del corpus.** |

```bash
node capture/diagnose-grouping.js                      # inkgap
node capture/diagnose-grouping.js capture/pages/portal.html
```
