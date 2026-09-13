# Sello del corpus calibracion-v1

Generado por `scripts/seal-corpus.js`. No se edita a mano.

**Hash del sello: `82cb74b67c3d9ea977d3b246867a2c23b89408a6871582e322cc38dd2a9c6c68`**

Este es el numero que citan el protocolo y el documento de tesis. Certifica *que paginas*
se evaluaron, *que se capturo de ellas* y *en que condiciones*.

Sellado el **2026-09-13T22:51:27.322Z**, que son las 2026-09-13 17:51 en Bogota (UTC-5). Todas las marcas de tiempo de este documento estan en UTC, incluida la
de captura, que es la fila "Capturadas entre" de la tabla de abajo.

| | |
|---|---|
| Manifiesto | `corpus/calibracion-v1.csv` · sha256 `16df1f6926602dbf268cf3abaab9d29e31ece522947f6c5ecac5278373a7d749` |
| Paginas | 24 · 96 archivos sellados |
| Capturadas entre | 2026-09-11T00:37:05.549Z y 2026-09-11T00:41:59.554Z |
| Chromium | 153.0.8010.12 |
| Viewport | 1440x900@1 |
| Modo de wireframe | perceptual |
| Catalogo de descarte | 2026-09-10 |
| User agent | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36` |

Que las cinco primeras filas tengan un solo valor es parte de lo que se certifica: las
24 paginas se capturaron con la misma configuracion. Un conjunto capturado con dos
configuraciones distintas no es un conjunto: cualquier diferencia entre sus paginas podria
venir de que unas se sirvieron a un navegador y otras a otro.

## Lo que queda declarado

Un sello que solo dijera «todo bien» no serviria. Lo que lo hace util es que nombra las
paginas que no estan limpias, para que su puntaje se lea con la advertencia puesta.

- **Interstitial cerrado por el catalogo:** C21.
- **Capa sin cerrar al capturar:** ninguna.
- **Control de sanidad fallido:** ninguna.

## Como se verifica

```bash
npm run seal:verify
```

Recalcula los hashes de los 96 archivos, los compara contra este sello y
contra el sha256 que cada `meta.json` guardo de su propio screenshot y su wireframe, y sale
con codigo 1 si algo cambio. La receta del hash esta en `SELLO-v1.json`, de modo que se
puede reproducir sin este repositorio:

> sha256 del bloque canonico: la linea "MANIFEST <sha del csv>" seguida de una linea por pagina "<id> <screenshot> <wireframe> <nodes> <meta>", ordenadas por id, cada una terminada en LF. Los PNG se hashean byte a byte; los archivos de texto con CRLF normalizado a LF y sin BOM.

## Las 24 paginas

| id | url | http | capturada (UTC) | nodos | sanidad | screenshot | wireframe |
|---|---|---|---|---|---|---|---|
| C02 | https://www.argentina.gob.ar/ | 200 | 2026-09-11 00:37:05Z | 141 | ok | `419355d537a1` | `14ef6e665d8c` |
| C03 | https://www.gov.uk/ | 200 | 2026-09-11 00:37:06Z | 100 | ok | `257d066ef71a` | `94adf83b816a` |
| C04 | https://www.usa.gov/ | 200 | 2026-09-11 00:37:10Z | 117 | ok | `c7bd871d3e36` | `e56e4675e73f` |
| C06 | https://www.mercadolibre.com.co/ | 200 | 2026-09-11 00:37:23Z | 304 | ok | `438e6904bec4` | `d1b365e0e324` |
| C07 | https://www.alkosto.com/ | 200 | 2026-09-11 00:37:31Z | 362 | ok | `50994faae9a1` | `3503bc5967a2` |
| C09 | https://www.panamericana.com.co/ | 200 | 2026-09-11 00:37:56Z | 245 | ok | `f4cab483e9d9` | `99cbf987bccc` |
| C10 | https://www.ikea.com/co/es/ | 200 | 2026-09-11 00:38:04Z | 313 | ok | `1af4daaa3588` | `59dce0880364` |
| C11 | https://stripe.com/ | 200 | 2026-09-11 00:38:12Z | 224 | ok | `c649b4e165a4` | `179231ef7cb9` |
| C12 | https://vercel.com/ | 200 | 2026-09-11 00:38:17Z | 133 | ok | `3ea88045e02c` | `cd6ad6c79d16` |
| C13 | https://linear.app/ | 200 | 2026-09-11 00:38:22Z | 87 | ok | `9ed81914e977` | `c3f59c7d1a47` |
| C14 | https://www.notion.com/ | 200 | 2026-09-11 00:38:27Z | 140 | ok | `ad052acc20c7` | `77456894dc7d` |
| C15 | https://slack.com/intl/es-co/ | 200 | 2026-09-11 00:38:38Z | 95 | ok | `3d182de8af80` | `600e8071add2` |
| C16 | https://www.semana.com/ | 200 | 2026-09-11 00:38:42Z | 368 | ok | `bf66d8db088e` | `cdc91e50a5ce` |
| C17 | https://www.elespectador.com/ | 200 | 2026-09-11 00:39:06Z | 188 | ok | `c0218cc58d37` | `994b2a4bdc6c` |
| C18 | https://www.bbc.com/mundo | 200 | 2026-09-11 00:39:14Z | 186 | ok | `c8bd9816b810` | `08ada79d9a75` |
| C20 | https://www.larepublica.co/ | 200 | 2026-09-11 00:39:30Z | 300 | ok | `1a17e6acfd81` | `5b1772a26c2c` |
| C21 | https://unal.edu.co/ | 200 | 2026-09-11 00:40:00Z | 223 | ok | `3f14a0addba2` | `a685ae4f27c6` |
| C22 | https://www.javeriana.edu.co/ | 200 | 2026-09-11 00:40:09Z | 192 | ok | `4d0c1200b77f` | `289de2a08ab8` |
| C23 | https://www.eafit.edu.co/ | 200 | 2026-09-11 00:40:14Z | 150 | ok | `951643f1d868` | `b24da70f1980` |
| C24 | https://www.udea.edu.co/ | 200 | 2026-09-11 00:40:20Z | 204 | ok | `c16778f3fe1b` | `6aea3741cf64` |
| C25 | https://www.utp.edu.co/ | 200 | 2026-09-11 00:40:24Z | 222 | ok | `b7103bbc8796` | `747077666f9e` |
| R02 | https://www.canada.ca/en.html | 200 | 2026-09-11 00:41:39Z | 157 | ok | `10c0f1a4cc47` | `ba9206c4eef7` |
| R03 | https://www.mercadolibre.com.mx/ | 200 | 2026-09-11 00:41:44Z | 303 | ok | `2f58ff2171e8` | `cb63e2a7e6ba` |
| R07 | https://www.elpais.com.co/ | 200 | 2026-09-11 00:41:59Z | 191 | ok | `fa8bcea582ea` | `93fc46f3f6eb` |

Los hashes van truncados a doce caracteres por legibilidad. Los completos, y los de
`nodes.json` y `meta.json` de cada pagina, estan en `SELLO-v1.json`.

## Bloque canonico

Es exactamente lo que se hashea para obtener el hash del sello:

```
MANIFEST 16df1f6926602dbf268cf3abaab9d29e31ece522947f6c5ecac5278373a7d749
C02 419355d537a10c02ebeb3ade8643c6ec91843219325c27c571bcc6c1779de3a1 14ef6e665d8ce19dfd69612f9cd7425ec0a9abfbe8fafba60d9ca27126942d1c 39e06ea9b4c897793cdf09d99f6558b80037e4ed5f0ece6c6d9b84a73decb8fc 42384b65178076a905bc6d7903f36d6ed80172bc35fcf9e3f846bdac27e6991c
C03 257d066ef71a07d85ab2a141eb51aec06fbd9ec15b71e8ca1ed62b134e4431fc 94adf83b816af03808770558a4cd3d3485439ef5306f86f36b9264d043f33221 82861d53a9b7d467a3d4b01478259ae92ba8dab932a8bce993d838be0c3aea47 b7ce48d1a43937ed3084433a131281177af5d2a967524d652a2f16cc2cd69ae1
C04 c7bd871d3e36f84e2b8d768b3795321053af5c1fb26c76759de9730e15704c6c e56e4675e73f59bdb9fc910e740a14d116ed0d7e73012a98dc1f5d0aedf5b820 fe582744810e07b00f8cd3fe3f8abdb525d20482dd5548c14228a58c3b019a53 dea451df5a0b9c5106cb04e6137e894071591aad6cb5f845a3eda061dd832383
C06 438e6904bec44fa35b020ec3636a54e057e85b8e888348d33bef9e71cdb17858 d1b365e0e324e780790da47d82fa857eb87c3fd05d4c91a2ca5136074553ed24 e0824d7d460008976e5cdb2676b94c94f1b1b2b9799c5891597093631cfb3c83 1862fdf715acbd82217c4872742ca00274ac41ab760e58f83acb6bf43777a935
C07 50994faae9a1f7cfad60e4bf8d633d2a5927fdb858b4df9df74cf9daaae80c9f 3503bc5967a284d5eab3946dbd6f125049845ef208f6899e410de23121f004f6 d45975173bbb7493303b4476f72353acd3938d92f900f91bfff90551b92411b2 c04296735e8f24ef532231cfce59b6b3b6000d2225bf21baad214fe3503e3df3
C09 f4cab483e9d9d645530227e692be49a0ceeecdc10f11cbeb3aadf0bf415e1b96 99cbf987bcccd9d8d84849a7a5030dbb114191cf9638f32fbc678a47b022f64d 00c1b618e89019e0f2de7fec0dc162b1bad89de695d706fc2359e009a3ea2d76 8e5cd9d0e8c39ba5164c0a9365a3565a6072110ca6560758cd251e7c94da7db4
C10 1af4daaa35886f5991b64a5c176711d88974844b920bdb71e47c84e09c364558 59dce088036431258ba767b0ebbccc379dd11213a535cc9e0dcdeec8ada6ff95 75db5274d4ed007e567f6d06fc0b1a66eaf0677e573e36b4840643ce9c0b3a83 b27a85d06d6c1855124e7f64b804a2da6ddd0f34181b7f600a5c1f0a7fdc727a
C11 c649b4e165a43440e77243946332ec13106e58b2985f120fd2f1f3ed71eccfeb 179231ef7cb913040376ae2a7b3c1ace5c12847fe31557bc1fe8f39d7d95424e dde87ad33311dab36e66c7bf8f247712a13da207816ca8d7601a83e8fbacec55 9e4229c768804475bae7005e799d6e203c945f568284197e39f6bdbe6119258c
C12 3ea88045e02c3047ba3c482fa46ad73f8d7e694677874037c52ea1f52cfa2b88 cd6ad6c79d16c613f45cdb1d9f39d3685d0e6315f606c5a1d50c73c6207ee26c 5e82c0072da53e768ce5b3f213d32656eab93b586b6eebfbd8dac14a3f8ea2f3 3daf2e199fde00a79ad80fab6d65ac4cbdb93e5f33aa31954e2d74ffd97b0d65
C13 9ed81914e9774c8bdbeda0fba7cf8eac6ad9a7eb6a02ab764e3b16660e8793bd c3f59c7d1a473f2ddf07c794fd643612b33ba986e5d04021a4cf2ad707af2be0 749058a217322afd5359d64da27fda401813e47a6335aa48998fdbc8049d0a70 fe6750c99d2438618940411e7bbd0d44021a90a1a8341f99b50ca0ad791b2da8
C14 ad052acc20c744a2206da3b5a9a08ccd39f9628486a1334417fff8c53b0f0848 77456894dc7dd766c6561eb564ff69b50349876a3190dbcda24e681e7a00ba1f c02c63286d8692a7aebb192914d22764a55c9309961f1e0bb2233ec4c083a3ac 6ed4e804881755f116fcecd92bcab71eae4df63b80d1ac8e2f81ae77665ec1d3
C15 3d182de8af80b8c8f5018f7c14e35c68f00a7da0f0adc9bbc72b7cd1a9364b67 600e8071add24b8c8340c32b231840ca7843735a8a138efb84a05869dc5b48d6 7ab4e5ba9ce5960cfa970aa93cce298e1bbadff41f3703ceb3d1cc326bfde400 32896cbbbe0a75b361ecbfc15f8e71ffddd7f3cefbd558f8f7bac961b0880e10
C16 bf66d8db088e76f099077c7d710ae856d33feff9c91b339a1e651a4990b9a81c cdc91e50a5ce082787f6664283fb6852b8f69cdc5903ea6c32bf2d4770c6eaa5 b65e3b8157e8ad59f87736c89fc1cabc2aee3599e0bd41245a18c7eba49dfdae 0ce877c3205b6c523e640c620dbf2f03bf12032d1e77a565bd00d8e60ccf4411
C17 c0218cc58d37ade71f15a8e2ce577f826a92be42c76e32e9615bb02d440fdc08 994b2a4bdc6c180c8f0c0f10e22f22eae8c5a3a81b46be46d5afec0ddd7bbf0c 88428abdebcd5586b91d04a3d9b4398ac374901797c40c8399eeb2975c9ce1d9 5d004ae0ea51dd04eb0a599e142947473b6d61480c3d1e07e4fb98897337cb61
C18 c8bd9816b8108589fe0ba78c42730732c31d0338b668863bd8a5476ba9ce714f 08ada79d9a75d665b87df5ebb825e80e80a8ea393ac396fbb5cec7ab8dc3b71e efb87a63e3e02ae2385c209857d665d973a46274aad3b0e98e5986ca3c7ba9f3 1a5c5a1d4867061b4c97fb8b3058939828f897281f43a7e724ae2c921413a369
C20 1a17e6acfd810d4d829538c4535acb039dbad7605924f1c6a18a456b5f186b20 5b1772a26c2cea2d4393392d79b3c1da5b6dcb22c863a40e184854d52f58c076 c8c2a48262e2c57a4aea7f79ec07030e77e4b6c841e68110d57b4d8bc3e6acd6 63ba2bc8cf615421eba3211eb76f4cd67304f405d9ca1f9b3b9699a8309b877f
C21 3f14a0addba2740bfbf3fd16c5bf20845484fe33e4525d6b0b654de395b18b5d a685ae4f27c62dc0d872c3803b9020af58e1fde973d6792dc634722e74106ec9 47b1f3e01a28a87ebd29a46dbf09559ef10db588b859f00639d9909e64bde164 9c140c23deb53b3b1eced97403a50270236ac622d84163d2a93966167d115f44
C22 4d0c1200b77ff46bb3f792d205f3621a8370716ee2f74785e91bedd655e3326d 289de2a08ab8039e39d93ef1a3b3aeff993136c50a3c5255d26865477c149c41 391a934234f3b3c04685b3cf31d6476b48213c1a74120ae3c09435f01445c4d2 5623201766f7c26eab0c12d6a46d58ffd10204c11d059a750d4980966723e6ad
C23 951643f1d8683f129ff59b4c4d74a56bb7c28c304d06fe11af123ae24ea5d621 b24da70f1980e54d043c8b9fded9dbb76336acf2c28ac912f909978510ae4e3b 3c961e30fb2a138d35b9a4e171b4c140aa1fc0676bfbf7a419fc41382218b509 c0dbb93ee04f640b7b7533a5b2b0610b9d450c2b782d7459b983d800a59824b3
C24 c16778f3fe1b83f99a7288ec4b814006e6c45cf07685281e85041d7f0f73697a 6aea3741cf64cab40b431a1f768eb85301eea79ae0ec1ebc0a6c52e7b42dc983 59bd45e1ee8413fbc702e3a931e292fa0072f0dd55945483d113ff5df27a3bad b27165452f919c1f7ee0e85096e92045471c9e90213c2bf3bab5ba4bdf5406b6
C25 b7103bbc87961a95100365941e7269eacece16c1c8ff0efad052c5da26c1ec8b 747077666f9eee54a2f8258517ba374ec8460d111cd2882f0594ca28f64dffdf 6f0669d07e91c3bb5e038b927bbf74b24f5fbf1727e73ca3bb749b24f1ae2599 2e27781fff4b2813f49c7b96bece8f196e759402e635e30fa807290a3d966ef7
R02 10c0f1a4cc47fd9878c208e3998b3ae1a1fb919c28ded972a9fe81b85b3e39a0 ba9206c4eef7654248f45da32a8c3f5e64269a86df9074a77ad7865d99e2d425 fbc6473c7cbb3820cccf294337589d629fa48b52af49fdbdc331f5a9690d08c2 96a7fd6e5ab3267e4c418d58b6910222f28bcf45f4d5430fe12c4cb8a6eeaae4
R03 2f58ff2171e8d8dbbffe1437d39e1cbcec68473810d62a17c648b8b4134d2428 cb63e2a7e6ba3e7dc529469b96ddce01937e51846c7a2a7f240b7f3ada5090f8 4448d3a0cc6501d3a7b496620e209bd3e64e6c59ffa40480b20165a6f7585eba 121421a21aca874a83d842a91489bc2eb44a092c827353190bd2793cce5690af
R07 fa8bcea582ea5b8321ca92ad1875aed7a6126eba1d84801ac2413167c7f1edeb 93fc46f3f6ebdd8c108030f42967dc7654eb86cdefb7de4a25e66e050ecfe959 4d09bcfaf5786b9f6e54ab4d501437de70f9bcf477694f0beaf641b21f0a1d2e fd9a8a92ef913ee029ec45322a65e480238bcb9d05039aa408c5fecdb2deced3
```

## Lo que este sello no dice

No dice que las 24 paginas sigan hoy como estaban: dice que estos bytes son los que
se midieron. Una recaptura futura sobre las mismas URLs va a diferir, y esa diferencia es un
dato sobre la web, no un fallo del sello.

Tampoco dice que la captura sea una buena representacion de la pagina. Eso lo miden los
niveles 1a a 1e de `docs/contexto/13-PLAN-DE-PRUEBAS.md`, y para L03 la respuesta esta
declarada arriba.
