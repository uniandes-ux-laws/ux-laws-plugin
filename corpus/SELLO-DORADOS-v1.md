# Sello del corpus dorados-v1

Generado por `scripts/seal-corpus.js`. No se edita a mano.

**Hash del sello: `08d4088679ec8dfde8326599c9941537e2efbf4fd10dcf15b53b71ef2c00a771`**

Este es el numero que citan el protocolo y el documento de tesis. Certifica *que paginas*
se evaluaron, *que se capturo de ellas* y *en que condiciones*.

Sellado el **2026-09-13T22:51:30.808Z**, que son las 2026-09-13 17:51 en Bogota (UTC-5). Todas las marcas de tiempo de este documento estan en UTC, incluida la
de captura, que es la fila "Capturadas entre" de la tabla de abajo.

| | |
|---|---|
| Manifiesto | `corpus/dorados-v1.csv` · sha256 `cd61d73ebeadf1426c9d17063d04f627ba3100dfbf233cd3f89fbdfea0c15e35` |
| Paginas | 10 · 40 archivos sellados |
| Capturadas entre | 2026-09-12T20:05:35.388Z y 2026-09-13T06:46:29.678Z |
| Chromium | 153.0.8010.12 |
| Viewport | 1440x900@1 |
| Modo de wireframe | perceptual |
| Catalogo de descarte | 2026-09-10 |
| User agent | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36` |

Que las cinco primeras filas tengan un solo valor es parte de lo que se certifica: las
10 paginas se capturaron con la misma configuracion. Un conjunto capturado con dos
configuraciones distintas no es un conjunto: cualquier diferencia entre sus paginas podria
venir de que unas se sirvieron a un navegador y otras a otro.

## Lo que queda declarado

Un sello que solo dijera «todo bien» no serviria. Lo que lo hace util es que nombra las
paginas que no estan limpias, para que su puntaje se lea con la advertencia puesta.

- **Interstitial cerrado por el catalogo:** ninguna.
- **Capa sin cerrar al capturar:** ninguna.
- **Control de sanidad fallido:** ninguna.

## Como se verifica

```bash
npm run seal:verify
```

Recalcula los hashes de los 40 archivos, los compara contra este sello y
contra el sha256 que cada `meta.json` guardo de su propio screenshot y su wireframe, y sale
con codigo 1 si algo cambio. La receta del hash esta en `SELLO-v1.json`, de modo que se
puede reproducir sin este repositorio:

> sha256 del bloque canonico: la linea "MANIFEST <sha del csv>" seguida de una linea por pagina "<id> <screenshot> <wireframe> <nodes> <meta>", ordenadas por id, cada una terminada en LF. Los PNG se hashean byte a byte; los archivos de texto con CRLF normalizado a LF y sin BOM.

## Las 10 paginas

| id | url | http | capturada (UTC) | nodos | sanidad | screenshot | wireframe |
|---|---|---|---|---|---|---|---|
| U03 | https://www.minjusticia.gov.co/ | 200 | 2026-09-12 20:05:35Z | 116 | ok | `ead2fe738353` | `a898883ad33d` |
| U04 | https://www.minambiente.gov.co/ | 200 | 2026-09-12 20:05:39Z | 183 | ok | `9f2e75bf1d20` | `de35cade0cdf` |
| U33 | https://www.bancocajasocial.com/ | 200 | 2026-09-12 20:05:59Z | 206 | ok | `4e068230aa9e` | `e9e0938fa410` |
| U43 | https://www.bluradio.com/ | 200 | 2026-09-12 20:06:07Z | 174 | ok | `406d6e20086d` | `faba65682ad9` |
| U44 | https://www.senalcolombia.tv/ | 200 | 2026-09-12 20:06:09Z | 173 | ok | `3ca9c32b9261` | `94d24467033c` |
| U47 | https://www.museonacional.gov.co/ | 200 | 2026-09-12 20:06:16Z | 173 | ok | `428d586b11b8` | `45c4d4ae9865` |
| U48 | https://www.banrepcultural.org/ | 200 | 2026-09-12 20:06:19Z | 208 | ok | `cc5b9609a73e` | `1efbd69e868a` |
| U58 | https://www.cruzverde.com.co/checkout | 200 | 2026-09-13 06:46:17Z | 67 | ok | `c322ed8d9d73` | `2ad071e9f5cd` |
| U60 | https://www.ccb.org.co/tramites-y-consultas/renovaciones | 200 | 2026-09-13 06:46:20Z | 211 | ok | `2ea050742394` | `9b1373ee5637` |
| U63 | https://www.homecenter.com.co/homecenter-co/cart | 200 | 2026-09-13 06:46:29Z | 348 | ok | `715bb2d44a9a` | `54124423b5de` |

Los hashes van truncados a doce caracteres por legibilidad. Los completos, y los de
`nodes.json` y `meta.json` de cada pagina, estan en `SELLO-v1.json`.

## Bloque canonico

Es exactamente lo que se hashea para obtener el hash del sello:

```
MANIFEST cd61d73ebeadf1426c9d17063d04f627ba3100dfbf233cd3f89fbdfea0c15e35
U03 ead2fe7383539fe0ace618982b09f6518cee2a536527a96cbd0b3da82da6a89d a898883ad33dc610134baa79a9912c28836f367fb89ebb58670ee6a86d680fe2 011dcc78e1eba68a33cf6d535331512f858473a70a73eddf2aea2dc3d69be741 8a065d08f8a4464eedec7d7076ab1f9673fa33b872a7f281358794cba88760ae
U04 9f2e75bf1d20ef6a79109d7a7046edc39d543532afe3c895ebc74c08f1b415a0 de35cade0cdf0fae0faa6f20c186df2c4a69e4a11730f9affed21c868197c893 87aa45fd995a55d0a3391db5f2722f1b12cfcd87bd32e99218c8bac29717f572 1efa60b5ab82806912f1337155ec12173e6edf0ae6669432235e3d797fa9a1a4
U33 4e068230aa9e5903279319b681f25f80b90884e0c9e7b1c01e8e956f24aed407 e9e0938fa410ed332d49dbefec70f48ad28021a7ae06f90deb5089e8e767a459 3e54cfd8e4966accfd19f6eae0748b3c70985c9a84390906c0b4265d9dae5ab7 f4651577976c2a02012903150ad8638508b6115010f7ae75319f6c1e8ed5923a
U43 406d6e20086dae42c72db8f1201f01063eb44e4cdea4c3a313661127e342ae98 faba65682ad9d370eb61b9a00f5416c72fe4f72a40cde675a8d62f7f2e2af09b 9228ab6455d2baf5be6b97c1ee94f43154f78ef35a740e6e9a5aad277de2f45e 207e9f122967dfbc500b70b02c0598f4c5ac4015e53b0dc48dda524781646c39
U44 3ca9c32b9261184a8492ef2c477fadd16212aafe2079258fdd4f168415b1e3c0 94d24467033c64c80b5635689c5899474aabb583be5821732bad262cfe79e7bf d374a323fdebf37bf17b55b8d4db4f2a9fd148d77dcdb3219a7f1bdc4c6035d2 c623ab450de1868a261130cd417ed71333027c0fb557f31bf33e3d45dae8592a
U47 428d586b11b8709cc6bf32c70ad58cde9f252802bc3fd86a42c497b36a319718 45c4d4ae98650bd55d7457f212711c630629e51d53401dca53c1c7dcf718df6b 5e3d2c632953dde81ab037db4040959f6094cda233f32cb63b0dea74eeaf213c bd93ac30a7cd567e8bd3dbce142eea716bf15570a6bfc1a10b437498e5327261
U48 cc5b9609a73e1c1142ec9cc9f4b6c269bdb5f9df91c589d5d1048e5e8741644f 1efbd69e868a5a5a90e2a4c708fdf91673da4fbda33651f1cf010ced8bf0b02c a4541c8c13bb8096b920fd19bcc42e39ca2ef1b3c9cbe12c2aa3a089757696cc 836eb551d69541070d8e19db687f108f5800a53b5969039102ac960b5868cb5d
U58 c322ed8d9d73bdb5877a07eb9d059780de77a302be06cd97d65a691262a65f63 2ad071e9f5cd710fda7515869422eb7a2441a39076600ba0bb3c072554242b4c af623cd26de53a656b4e99867a8543872c52ae8cd61fcc10b250d43e8c8e3d8f 462db46320b36ecaaab49b056e4755e5b014c029452aaed53b276d4ed8f674a5
U60 2ea050742394990803ac165afa351ddf0995b4f76da0529f4326133478b7429f 9b1373ee56370f7b84b41e4f91429cc433ecef4b41bb94952ffd1acdb7ef7eed c5b7c23a287f6343e68dc88f90addc41ffae3556b87b503fe1359b0466ef1d7f 3564333e22ef7376a0b1037bf4c6401d43481abad8cfa38b1e5ceb5d49daadc4
U63 715bb2d44a9afd6037f99a466e8bfeb5ac9301d77b8a1bf9c0e89600376e10ec 54124423b5de5a216ec9b7cde189174b3e9386ef75c28948b62097a635e1b2fe fea7cbb0f1d0a07d0daf055d9cbd5ec58e589ec67995a719bb2c8aab65831c61 4a0b1ffe377d6baaa493674f4cb73b30580273f0849fa2210776ce3c89a64032
```

## Lo que este sello no dice

No dice que las 10 paginas sigan hoy como estaban: dice que estos bytes son los que
se midieron. Una recaptura futura sobre las mismas URLs va a diferir, y esa diferencia es un
dato sobre la web, no un fallo del sello.

Tampoco dice que la captura sea una buena representacion de la pagina. Eso lo miden los
niveles 1a a 1e de `docs/contexto/13-PLAN-DE-PRUEBAS.md`, y para L03 la respuesta esta
declarada arriba.
