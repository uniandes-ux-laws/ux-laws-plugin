# Sello del corpus v1

Generado por `scripts/seal-corpus.js`. No se edita a mano.

**Hash del sello: `f9c0caaaa2eaec7793860e46c0bf78530489877af1e33a5ac417ee8490933437`**

Este es el numero que citan el protocolo y el documento de tesis. Certifica *que paginas*
se evaluaron, *que se capturo de ellas* y *en que condiciones*.

Sellado el **2026-09-11T00:09:58.421Z**, que son las 2026-09-10 19:09 en Bogota (UTC-5). Todas las marcas de tiempo de este documento estan en UTC, incluida la
de captura: el corpus se capturo la noche del 10 de septiembre hora de Bogota.

| | |
|---|---|
| Manifiesto | `corpus/corpus-v1.csv` · sha256 `70e31ac57ac31fbb30a8fb158dd4e72972584b8ef0f0cf3773ce1fa3124ec5a3` |
| Paginas | 30 · 120 archivos sellados |
| Capturadas entre | 2026-09-10T23:15:58.170Z y 2026-09-10T23:19:46.711Z |
| Chromium | 153.0.8010.12 |
| Viewport | 1440x900@1 |
| Modo de wireframe | perceptual |
| Catalogo de descarte | 2026-09-10 |
| User agent | `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36` |

Que las cinco primeras filas tengan un solo valor es parte de lo que se certifica: las
treinta paginas se capturaron con la misma configuracion. Un corpus capturado con dos
configuraciones distintas no es un corpus.

## Lo que queda declarado

Un sello que solo dijera «todo bien» no serviria. Lo que lo hace util es que nombra las
paginas que no estan limpias, para que su puntaje se lea con la advertencia puesta.

- **Interstitial cerrado por el catalogo:** G01, G04, H09, H10, L03, L07.
- **Capa sin cerrar al capturar:** L03.
- **Control de sanidad fallido:** L03.

## Como se verifica

```bash
npm run seal:verify
```

Recalcula los hashes de los 120 archivos, los compara contra este sello y
contra el sha256 que cada `meta.json` guardo de su propio screenshot y su wireframe, y sale
con codigo 1 si algo cambio. La receta del hash esta en `SELLO-v1.json`, de modo que se
puede reproducir sin este repositorio:

> sha256 del bloque canonico: la linea "MANIFEST <sha del csv>" seguida de una linea por pagina "<id> <screenshot> <wireframe> <nodes> <meta>", ordenadas por id, cada una terminada en LF. Los PNG se hashean byte a byte; los archivos de texto con CRLF normalizado a LF y sin BOM.

## Las treinta paginas

| id | url | http | capturada (UTC) | nodos | sanidad | screenshot | wireframe |
|---|---|---|---|---|---|---|---|
| G01 | https://www.gov.co/ | 200 | 2026-09-10 23:16:55Z | 261 | ok | `b202e20e1de7` | `04161531c6f2` |
| G02 | https://www.dian.gov.co/ | 200 | 2026-09-10 23:16:58Z | 76 | ok | `a43f298a53dd` | `b7efc702cd74` |
| G03 | https://www.registraduria.gov.co/ | 200 | 2026-09-10 23:17:01Z | 107 | ok | `0175f4cb0f5e` | `23f6367511a3` |
| G04 | https://www.colpensiones.gov.co/ | 200 | 2026-09-10 23:17:05Z | 201 | ok | `7a8dbd1937a6` | `8ca4bd49a964` |
| G05 | https://www.icbf.gov.co/ | 200 | 2026-09-10 23:17:09Z | 143 | ok | `610317c89efe` | `a80080277ba9` |
| G06 | https://www.runt.gov.co/ | 200 | 2026-09-10 23:17:11Z | 177 | ok | `f1003f913213` | `9b00f96246b9` |
| G07 | https://bogota.gov.co/ | 200 | 2026-09-10 23:17:16Z | 146 | ok | `6bdc886351dc` | `db2e310614d8` |
| G08 | https://www.policia.gov.co/ | 200 | 2026-09-10 23:17:29Z | 270 | ok | `b776a7adeeab` | `73ff4586b2cc` |
| G09 | https://www.transmilenio.gov.co/ | 200 | 2026-09-10 23:17:33Z | 161 | ok | `0afaeb8ae24c` | `84fec68a1882` |
| G10 | https://www.mineducacion.gov.co/ | 200 | 2026-09-10 23:17:43Z | 143 | ok | `8143c943f0e5` | `0c5b5d2fbcfc` |
| H01 | https://www.minsalud.gov.co/ | 200 | 2026-09-10 23:15:58Z | 138 | ok | `7cebc09ac4f1` | `58394332b025` |
| H02 | https://www.ins.gov.co/ | 200 | 2026-09-10 23:16:03Z | 147 | ok | `fcaad1a2e706` | `f67c56c7aaff` |
| H03 | https://www.invima.gov.co/ | 200 | 2026-09-10 23:16:10Z | 160 | ok | `06bad67181f4` | `99127b61a4a7` |
| H04 | https://www.adres.gov.co/ | 200 | 2026-09-10 23:16:13Z | 189 | ok | `b914a2d93c47` | `19ea4cb3ca5f` |
| H05 | https://www.supersalud.gov.co/ | 200 | 2026-09-10 23:16:18Z | 179 | ok | `0c66a7859fe9` | `e410b146fe00` |
| H06 | https://www.nuevaeps.com.co/ | 200 | 2026-09-10 23:16:23Z | 87 | ok | `ec06c1c9214b` | `3d74265f2f1e` |
| H07 | https://www.saludtotal.com.co/ | 200 | 2026-09-10 23:16:26Z | 332 | ok | `3bffb53f0009` | `748fb7ef9da7` |
| H08 | https://www.epssura.com/ | 200 | 2026-09-10 23:16:36Z | 195 | ok | `c0bc9e98fee5` | `4f1c2d696793` |
| H09 | https://www.famisanar.com.co/ | 200 | 2026-09-10 23:16:45Z | 173 | ok | `126226517ead` | `abe2a8093e87` |
| H10 | https://www.cruzrojacolombiana.org/ | 200 | 2026-09-10 23:16:50Z | 196 | ok | `45757ceafd54` | `4d153a37267a` |
| L01 | https://uniandes.edu.co/ | 200 | 2026-09-10 23:17:52Z | 163 | ok | `dc3727f6a619` | `c5211f6c7ea8` |
| L02 | https://www.bancolombia.com/personas | 200 | 2026-09-10 23:18:00Z | 249 | ok | `e03c05e9bf94` | `65910d21c6df` |
| L03 | https://www.exito.com/ | 200 | 2026-09-10 23:18:08Z | 140 | **revisar** | `2835cfbb71c3` | `293bf55dd396` |
| L04 | https://www.wingo.com/ | 200 | 2026-09-10 23:18:17Z | 261 | ok | `8dbba523869e` | `7f05c40dd2d5` |
| L05 | https://www.eltiempo.com/ | 200 | 2026-09-10 23:18:51Z | 177 | ok | `63c659dfbccb` | `f17630d1dc98` |
| L06 | https://www.falabella.com.co/falabella-co | 200 | 2026-09-10 23:19:00Z | 216 | ok | `0745a6f15948` | `3288c18f30a7` |
| L07 | https://www.claro.com.co/personas/ | 200 | 2026-09-10 23:19:15Z | 210 | ok | `8ae125fa0c80` | `ec8c745e4134` |
| L08 | https://www.homecenter.com.co/homecenter-co/ | 200 | 2026-09-10 23:19:27Z | 262 | ok | `2ba458d1143f` | `82bbd8965aaf` |
| L09 | https://www.rappi.com.co/ | 200 | 2026-09-10 23:19:33Z | 162 | ok | `2edf81b37a76` | `6ca8954c7e78` |
| L10 | https://www.sura.co/seguros | 200 | 2026-09-10 23:19:46Z | 197 | ok | `de3bc039bafe` | `7345dd87bb8a` |

Los hashes van truncados a doce caracteres por legibilidad. Los completos, y los de
`nodes.json` y `meta.json` de cada pagina, estan en `SELLO-v1.json`.

## Bloque canonico

Es exactamente lo que se hashea para obtener el hash del sello:

```
MANIFEST 70e31ac57ac31fbb30a8fb158dd4e72972584b8ef0f0cf3773ce1fa3124ec5a3
G01 b202e20e1de752c6f7ef644245a37c6792741ab3c620126b2cf5d1a0c2d2dd7c 04161531c6f284defd41b24fa043b2747c9908ebd27a4f623c1a4ed8706af8cc 1aa1601bb5068ca0ae261e53a573b2c0bd390305b0a70389055bf574c0b96a6b 01c9793bf0853869a387b84b0bc33b7d8d2c94b1c3184374a380aec58ebb6076
G02 a43f298a53dd2624d10a1a579dfd34a4a728e21fa9604c7f780aa7748075f488 b7efc702cd74bdd303a0e2b027aeb3cb824cb5dde13ff06c8baab728d5f85ffb 19bc70c6730ca6ea03e50963ef230d6ced8967721aa82eac4d0f1dbb6a8e14b7 7e057730da91541f5d1c039a8daf03d72afea44f2c7f724f1b649a1a463e377f
G03 0175f4cb0f5e5b73c44a547c22a9cf5997ee58c12bee69489fc1d0325c2f912b 23f6367511a3ca28752ea39d8811c93acd2f8a6b430b9a481cc64c4e24c9e5be 88c77227753b9e95137be33ec56646bbec31b1190ea177a3d1adcb2d2194e7a4 b101233620b911f4ebb937afb765cb9c25d461448663481806817c1b50440b3b
G04 7a8dbd1937a6f6c501820f4d339fc707c4255a06c3ce5abf517edf88a6dc2c29 8ca4bd49a96488de44286d1f69da812e42650b701e352c82a9cfc72c73db2377 98e6d76ac8c25257c2b28e9734d71d1204b399038ba19d6039db147ed22e2cbd 78ad92f487bc3f252daca77d2d5339e926d9a391b4e7e893ed7cc83dcb9affea
G05 610317c89efe7124b0b2343ea10ac9dd90fe4abefbc938b57adb120d1047b0d0 a80080277ba92e824a5467eaea3d4e0c03b71b00e989592aaaa710afab97a516 476e7bb0ee4bc44f604c934130c2c9e3e86f9956bff6e94a6406a2c066040814 eea66f7fadb2e3a8e43f913be5c11d5bdbad21604fa076844f1c5a4472b4941f
G06 f1003f91321366168e57298b53af651e53ae705cb851e6d4ddfc9128525487a9 9b00f96246b9578d854b496d4f850ed29a6935eda4aed491ba7f8f1036450cb2 c5c1850e02637c3faeabc4fa9904b6a0d39ccebb72c74b9fb602f86794d210e1 4154d4895f110795d8e8cd139ed7f06d0a9b22db3cdd786cbe0ed65a1ba4fe9c
G07 6bdc886351dc5a9c63ced3b7189ffe38481c436e4d77f8ba500bb5eef434ac32 db2e310614d8cf97cf03294731aca26dff7f32c772ac7b17ee864040ccb3b646 4fa0606f206344177a68b883d718f32ab8c804bbb7318339530b685bd1390479 581488b13cd247a5a2d7b945d2f22f45f7257bacc48c83afcdea3a78244166f2
G08 b776a7adeeab15fd13848d16289f83d5d25221e038fe090120a9f906c91b01ae 73ff4586b2cc910da16c4c5d4fcbf5ab39f11298f4077f5844915bd3b317ca9f dd7981da8df51518d6cd0363ed7a9dfc6e061cc8cc4d6e2c44916ce59da9c4ff 1bb9434cccd80db6105ae04628d48884c162c9f8592049bdc080d857df802ae6
G09 0afaeb8ae24cdc1c5d265b76c44c3ac251a713f19d10f61266067855e0a9a27d 84fec68a1882fad1b8ecb145d0e9e292cedee6f1456266d9c965c539824674e7 d7c4f009f82ce08395e6ceaa81068f17ff71a9b005a794bf491d6ef41a75db3e b3f759ae447b07509850a15c52ebcff99b0e32d664fda825e260f38ebc0dcbfd
G10 8143c943f0e516ec254ccda7f6b6028b22dcbcef4d625298487b84d7014d4d3d 0c5b5d2fbcfce6826a4f0306e573fc03d3697fbbc124b309ffb11220cb39e858 491a85275c3825daebb430fdeacff10de095b558b32855ab58327ffe38ea7a17 7cbf6ffd27173719ef1e4284f6c52627c68f41c988b4637206d3a144e0488387
H01 7cebc09ac4f18cdde48b28366b6b60af1a41d70bec7e236bdb45434f970a2e95 58394332b025c64405a5dda27deeb9139ea674f1a09303792157a3619472818f 393764bb1c10a678c933c5c1863f779d2f27cd3efc29cc7597c9ec55d02ea724 adcfb73cc67d2501e529d5c628305244d596452b6ce449c6a64a02363b6a76a5
H02 fcaad1a2e706e1b5aefe6b86908381afc8a5548bd7b8eb8985061f7ca745d0ca f67c56c7aaff9e330fab3187d610615f93111658ab04f35ab5410b9c4e004641 fa7e299335d4725362b7bb31ecf8b0938654312cc60ee2629c1bab8a7cd99302 99010a79e07743877c0f96732ad9db00ad9a3dffdc8243d3964189dc4dc6d85d
H03 06bad67181f4e39623e8711bf3d69e0ed666ac179791217db03a8290b0d1d144 99127b61a4a7b4dc6392924f80c06586d78ca61900d6573bae63005bc710df20 e690184b1e047e498cd51e0c599009d9e6c1a0a419d04ace6eb7bcdfa2534726 afc7d11379a53b2474b8e937286bed7d9e1e09d2f9b8892184d594d407f8cfc8
H04 b914a2d93c476a01f0bc8d52e6abed6ba34e6bd8016e1c1686401415715c3b57 19ea4cb3ca5fa2ab5016c8aaea1d0bd7ebcd48d0869334750a2f983c7eb16c8c 798c8d0a7c45cb6654c5e8d59ea1cc735883f6bcd439b48d0e37a5f3061edc68 01e4de227fa79de0c11092d810dd3983a0f56766f3a1cc09c8086f3d3f94e5be
H05 0c66a7859fe9018524464e8785b25362c0bb9bfb0c60e0857097b8d805c157c6 e410b146fe00b5bf469e5299a30e79195749770eed5171023b22bcfa4c5c0669 18475700cd5b22a8cb416abaccc159efd2caa302cdbdfa5633a68df1efe57885 ddde03889f540df504f336279afcb3e91dfaee011bdb0f725607b59b8d2febfa
H06 ec06c1c9214b3731f92cd1447c2734544cfdccb4f7325b8c3534d7ca4196e5b5 3d74265f2f1e7937c90848ab4bf9bd240ccd8a340bd60e8bcfe1295ccd2d0b42 852c3173ccbe3693a6f8c7a1301f4d695c0bed1e7bf36e6b01ba0a6f13ed2b6a 26a5027a2a6d9aa2b5013bb7be6fff1e7ded0bb4b3a492d59395f73e923cb841
H07 3bffb53f00095140a19430bb3a6e71eb00da5a27256b32b2c0eedf7ff882a63a 748fb7ef9da791c7b3a594b1f8d8e08693937b6b20ec3d9aa1b3f15cdf16ca49 5d2d5a99cfb84106c8f69d1ee2c0e463339eb8f0ecddd4624ab1ce86060074ff 97903ac134e5d12fc37ac264ffcab68c081ebed0f7653c2595da1487810f7689
H08 c0bc9e98fee55db80e187000fd7e520b67df5ce206e245bce9b1b19624489dfa 4f1c2d6967934c96e88a73d1212ea2e28df8ff914666de2d039bdaffb75a38bd 9421941971c38a0a4c85d165ecad85256cbb58f454ed7f7c277b5d81adc1c0be 6a34eb0ada939ce631dca944ba5d52e5ad22869d3b5162ce89dcc9006ee5e9e5
H09 126226517ead1202ac1b5b9e9184ea108d30ddc180eea1cdf44306f8b69ddf4e abe2a8093e8766424c443a40a18688d3271a4854966a06d7996d1e83d7021b25 57f2903dca71a35784380e4899ec5ef188cadc65fa30ddbe96807340308a58be 94733fc9f27b6d023cc6b21719801cc0e60df0ee325186073636cc3eef55c677
H10 45757ceafd54135292f42c4f070935ff0b49030eedb005a150ca5d64f9c46664 4d153a37267a60477fab132aa0cd010d830a1fe4741d7f5fe9e947ef166cee84 96a8a0e0762ccaa6c29be030393257cda16937fff2c44632bcabb6bac13e5992 026e293df3a1af8215eb76700402b27ee17a806fc123374283cf0badc686b141
L01 dc3727f6a61912b1ef1fc02328917c1cc65d22a2a9f7f392dfcf7ae7b57003dc c5211f6c7ea8a3cc9b89a3055265b5e1e0a61d3d361c83b928586b5b916463f0 5edc2fb0bf1ed2826ee7f48ff182ce1a698d760f2be1d5858e599b0f1e920edb d099d1fc77e60d25a0f5eca88446195a8bf209c3ceb99e54bb8b91a4e85c9d66
L02 e03c05e9bf942ea9f733faf495b9be74770e14fb33fae323d239ddc8748b7ff8 65910d21c6dfa7953fa15d27bab7751083b31375bb04c39053a985e6065c24db 02bc87adbaacb988ab70683d04820cd4981679088689d9042525672a893990bb 931e2d38b6e378afd83dcdca28ec075702fa8f03a098ed0ab481338ef9f72db1
L03 2835cfbb71c3795bf682eac99d5e5044c50fffd222cd4bdbd53de06c057dc6a1 293bf55dd3966c567408a91cad78ee759e79d4631d9a05d764a2013a39a381ec 6c0dd7253463003b144d4487ffe5ba97c80a80738cf3ad389c2e8a49886da517 49438ab6d9c8f586cc7f6b10eb5254c5705a3aaaf2e21ac41984f5c8cf21f2b9
L04 8dbba523869e2a98e037bae9b7e3775c016fdd2d255966440a00eb2ba9e1ec9b 7f05c40dd2d51e24a00b34c9eb87c21268c9f7316f9a91d1904a732e8d94e774 9054d7897865c1478f99d867928e512716d0b35eaac92a7009146488d9ad02c6 054143f2cb7aa8ae05a67245e9143be05e7d9c75aabc1c2552275b74f9b69fbf
L05 63c659dfbccb9a4d34e13f8529ead27a09d05ef31fa3634a32992b9b793b5d78 f17630d1dc9875f20a36b8a11b6b1feb1a6d39d135f58108295984892f250867 fc8fe8ed347b8bf13473f385351ca7e75e603927a4d0973c9085abfbbb4a9c84 28f951246bf2d621e0d7e904cd80defd2cfe10a705b779356074055d09df2b2a
L06 0745a6f1594898a7ac7c3e57cb7a0f775d6888dd14ce34abe35e514d78ed3e9f 3288c18f30a7382ebb8a0ecf1820e5e6fc0949c7eb7cb9110e95ab2e5fb9fc89 2e0b5ee9e8ef6e26cb28820fcefdb8eb6f8202f804ff72995b36bc9436d9e02c b16e131eb737688d3caf48c5bc0917edda816773160c7cc0286f7553296a126c
L07 8ae125fa0c8044a73b660f2efaf0fe5d92d488118bf5b6680ab6166b444afbab ec8c745e413403243ea6f91a9e69e798bcaea66ccef5109fb3d26c730f2690ca dd76d67f82d852b3b258e34dba53354ab622e9d3e28a32e587c83d44c9b49029 a4e9f74782dad81c568b5677248b91674b4456ee73add1a18a192910cb9793c4
L08 2ba458d1143f102eb5b2694a1c0daa7bb1dfe49a61a9ba39289c8a9dd2168087 82bbd8965aafde8867bd535b663f43dbb5bd722b7cee4da352253b36bf303c52 5d89a36cf7c8ed7e4bd2af51d1b47eb3f33dd866544d65edc4d039f113a4cc70 3fcc23a79696fb8e59e0d1e4b6efbc00ae42013768920239d4e088cdcbd4bfb8
L09 2edf81b37a76b586ac09f8553d77a0b50be89d2564ea906e2a6883a5742e576a 6ca8954c7e788071809303d7431107d90bc62bdc3681a47afa468f0b0b326612 d39464e195e94f9f1621ecc824551b3f1a1e827e2ccf623a048cb67903a2bb2b 552cc1a640244e428af3274e9e21eac07fd06bc105f0e564435fd7143e3c3a38
L10 de3bc039bafeb69a0ca89b554d417035ff95a5a3bbed44d13e3f52873fbd6db6 7345dd87bb8a09155ff0dded6c658d5ba6f03d41c2930f0aca80a925837deaaa dfd93be4f56acf7d5e0307fd753c692763f47eab0a99bde90053f2da81b2e04f 6b0794f493e63754d5736b1598100f71c2a7cf60e387d1c82e793c2da3aa8a4c
```

## Lo que este sello no dice

No dice que las treinta paginas sigan hoy como estaban: dice que estos bytes son los que se
midieron. Una recaptura futura sobre las mismas URLs va a diferir, y esa diferencia es un
dato sobre la web, no un fallo del sello.

Tampoco dice que la captura sea una buena representacion de la pagina. Eso lo miden los
niveles 1a a 1e de `docs/contexto/13-PLAN-DE-PRUEBAS.md`, y para L03 la respuesta esta
declarada arriba.
