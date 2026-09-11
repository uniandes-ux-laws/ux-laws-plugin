/**
 * dismiss.js — descarte de interstitials antes de capturar.
 *
 * EL PROBLEMA. Seis de las treinta paginas del corpus presentan, al entrar, una
 * capa fija que tapa la pagina: muros de cookies, solicitudes de ubicacion,
 * avisos de suscripcion. Son G01, G04, H09, H10, L03 y L07, y entre las seis
 * encadenan siete capas, porque L03 trae dos. Capturar asi hace que G1 mida la
 * geometria del muro y que G3 cuente sus botones. La evaluacion seria del
 * interstitial y no de la pagina.
 *
 * DE DONDE SALE ESA CIFRA, que es lo que hay que poder decir de cualquier numero
 * que aparezca en un comentario. Sale del campo `consent` de los treinta
 * `meta.json` de la corrida sellada del 2026-09-10 --- sello
 * f9c0caaaa2eaec7793860e46c0bf78530489877af1e33a5ac417ee8490933437 ---, medida
 * con el detector `medirOverlay` de este mismo archivo, el que exige
 * elementFromPoint ademas de la geometria.
 *
 * Este comentario decia NUEVE y estaba mal por dos razones acumuladas, las dos
 * declaradas aqui para que la correccion no quede tan huerfana como la cifra:
 * la tabla del sondeo del que salio tenia ocho paginas con capa al 100%, no
 * nueve; y ese sondeo corrio ANTES del cambio de user agent --- con nueve
 * paginas devolviendo 403 o 500 --- y con un detector que todavia no tenia la
 * prueba de elementFromPoint, de modo que contaba como muro cualquier capa fija
 * y grande aunque no tapara nada. Corregido el 2026-09-10.
 *
 * POR QUE NO SE DEJA COMO ESTA. El argumento decisivo no es que se vea mal: es
 * que NO ES REPRODUCIBLE. Si el sitio recuerda el consentimiento, la siguiente
 * captura devuelve una pagina distinta. Un corpus sellado cuyo contenido depende
 * del estado de cookies del navegador no esta sellado.
 *
 * POR QUE NO SE CIERRA A MANO. Tampoco es reproducible, y ademas el lector que
 * instale el plugin no va a repetir esos clics. Todo lo que el protocolo no pueda
 * describir como una regla, no puede formar parte del metodo.
 *
 * QUE SE DESCARTA Y QUE NO. Solo interstitials: capas que se interponen ANTES de
 * la pagina y que el usuario atraviesa una vez. No se toca nada que sea parte del
 * diseno de la pantalla --- encabezados fijos, barras de navegacion pegajosas,
 * chats acoplados a una esquina, banners promocionales dentro del flujo --- porque
 * eso si es la interfaz que se evalua. La distincion es operativa y no de
 * criterio: una capa entra a este procedimiento solo si cubre al menos la mitad
 * del viewport o se declara `role="dialog"`, y solo se cierra si ademas ofrece un
 * control de descarte que este en el catalogo de abajo.
 *
 * EL CATALOGO ES CERRADO Y FECHADO. Igual que el de convenciones de G6. Se puede
 * ampliar, pero cada entrada nueva lleva su fecha y la ampliacion se registra en
 * corpus/DECISIONES-CORPUS.md. Un catalogo que crece en silencio mientras se mide
 * es una intervencion no declarada.
 *
 * VERSION DEL CATALOGO: 2026-09-10
 */

// Preferencia declarada: se ACEPTA en vez de rechazar. Rechazar deja a varios
// sitios en un estado degradado (sin mapas, sin video, sin recomendaciones) que
// no es el que ve un usuario corriente, y evaluar ese estado seria evaluar una
// pagina que casi nadie ve. Se declara porque es una eleccion con consecuencias.
const SELECTORES = [
  // Plataformas de consentimiento identificables por id o atributo propio
  '#onetrust-accept-btn-handler',
  '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
  '#CybotCookiebotDialogBodyButtonAccept',
  'button[data-testid="uc-accept-all-button"]',
  '.didomi-continue-without-agreeing',
  'button#didomi-notice-agree-button',
  '.osano-cm-accept-all',
  '.qc-cmp2-summary-buttons button[mode="primary"]',
  'button[aria-label="Consent"]',
  // Genericos por atributo
  '[id*="accept" i][id*="cookie" i]',
  '[class*="accept" i][class*="cookie" i]',
  'button[aria-label*="aceptar" i]',
  'button[aria-label*="accept" i]',
  'button[aria-label*="cerrar" i]',
  'button[aria-label*="close" i]',
  'button[aria-label*="dismiss" i]',
];

// Texto exacto del control, normalizado a minusculas y sin tildes.
const TEXTOS = [
  'aceptar', 'aceptar todo', 'aceptar todas', 'aceptar todas las cookies',
  'acepto', 'aceptar y continuar', 'permitir todas', 'permitir todas las cookies',
  'entendido', 'entiendo', 'de acuerdo', 'estoy de acuerdo', 'continuar',
  'accept', 'accept all', 'accept all cookies', 'i agree', 'got it', 'ok',
  'cerrar', 'close', 'no gracias', 'ahora no', 'mas tarde',
];

const FRACCION_INTERSTICIAL = 0.5;   // cubre al menos media pantalla
const ESPERA_TRAS_CERRAR = 900;      // ms para que la animacion termine
const MAX_RONDAS = 3;                // algunas paginas encadenan dos capas

/**
 * Cierra los interstitials de una pagina ya cargada. Devuelve un registro de lo
 * que hizo, que va entero a meta.json: sin ese registro, la captura seria una
 * intervencion invisible.
 */
async function dismissInterstitials(page, { log = () => {} } = {}) {
  const registro = { catalogVersion: '2026-09-10', rondas: [], overlayRestante: null };

  const reglasUsadas = [];
  for (let ronda = 0; ronda < MAX_RONDAS; ronda++) {
    const antes = await medirOverlay(page);
    if (!antes.hayInterstitial) {
      registro.overlayRestante = antes.mayorFraccion > 0 ? antes : null;
      break;
    }

    const cerrado = await page.evaluate(
      ({ selectores, textos, fraccion, usadas }) => {
        const norm = (s) => (s || '').trim().toLowerCase()
          .normalize('NFD').replace(/[̀-ͯ]/g, '');
        const vw = window.innerWidth, vh = window.innerHeight, area = vw * vh;

        // Capas candidatas: fixed/sticky que cubren media pantalla, o role=dialog
        const capas = [...document.querySelectorAll('*')].filter((el) => {
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') return false;
          const r = el.getBoundingClientRect();
          if (r.width <= 0 || r.height <= 0) return false;
          const esDialogo = el.getAttribute('role') === 'dialog' || el.tagName === 'DIALOG';
          const fija = cs.position === 'fixed' || cs.position === 'sticky';
          const cubre = (r.width * r.height) / area >= fraccion;
          // Un banner de cookies en una franja inferior no cubre media pantalla y
          // aun asi es un interstitial de consentimiento: se atraviesa una vez y
          // no forma parte de la interfaz evaluada. Entra por su texto.
          const textoCookies = /cookie|consentimiento|privacidad|acepta/i.test(el.textContent || '');
          const franja = fija && (r.width * r.height) / area >= 0.03 && textoCookies;
          return esDialogo || (fija && cubre) || franja;
        });
        if (!capas.length) return null;

        // Los controles no siempre estan DENTRO de la capa: la X de Exito esta
        // posicionada encima del modal, como hermana. Se buscan dentro de la capa
        // y ademas entre los clicables que se solapan con ella.
        const clicable = 'button, a, [role="button"], input[type="button"], input[type="submit"], [class*="close" i], [class*="cerrar" i], [id*="close" i]';
        const solapa = (el, r) => {
          const q = el.getBoundingClientRect();
          return q.width > 0 && q.height > 0 &&
                 q.left < r.right && q.right > r.left && q.top < r.bottom && q.bottom > r.top;
        };
        for (const capa of capas) {
          const rc = capa.getBoundingClientRect();
          const dentro = [...capa.querySelectorAll(clicable)];
          const encima = [...document.querySelectorAll(clicable)].filter((el) => !capa.contains(el) && solapa(el, rc));
          const controles = [...dentro, ...encima];

          for (const sel of selectores.filter((x) => !usadas.includes(x))) {
            const hit = controles.find((c) => { try { return c.matches(sel); } catch (_) { return false; } });
            if (hit) { hit.click(); return { via: 'selector', regla: sel, texto: norm(hit.textContent).slice(0, 40) }; }
          }
          const disponibles = textos.filter((t) => !usadas.includes(t));
          const hitTexto = controles.find((c) => disponibles.includes(norm(c.textContent)) ||
                                                 disponibles.includes(norm(c.getAttribute('aria-label'))));
          if (hitTexto) {
            hitTexto.click();
            return { via: 'texto', regla: norm(hitTexto.textContent).slice(0, 40) || norm(hitTexto.getAttribute('aria-label')), texto: null };
          }
        }
        return null;
      },
      { selectores: SELECTORES, textos: TEXTOS, fraccion: FRACCION_INTERSTICIAL, usadas: reglasUsadas }
    );

    if (!cerrado) {
      // Hay interstitial y el catalogo no lo cubre. No se improvisa: se registra.
      registro.rondas.push({ ronda: ronda + 1, cerrado: false, motivo: 'sin control de descarte en el catalogo' });
      registro.overlayRestante = antes;
      log(`  interstitial no cerrado: cubre ${(antes.mayorFraccion * 100).toFixed(0)}% del viewport`);
      break;
    }

    // Una regla que ya se aplico no se repite: en Exito el backdrop cubre toda
    // la pantalla, todos los botones de la pagina se solapan con el, y sin esto
    // el procedimiento pulsaba tres veces el mismo boton de cookies mientras el
    // modal seguia intacto.
    reglasUsadas.push(cerrado.regla);
    registro.rondas.push({ ronda: ronda + 1, cerrado: true, ...cerrado });
    log(`  interstitial cerrado por ${cerrado.via}: ${cerrado.regla}`);
    await page.waitForTimeout(ESPERA_TRAS_CERRAR);
  }

  const final = await medirOverlay(page);
  registro.overlayRestante = final.hayInterstitial ? final : null;
  registro.limpio = !final.hayInterstitial;
  return registro;
}

/**
 * Mide la capa fija mas grande que REALMENTE tapa la pagina.
 *
 * Que un elemento sea fixed y mida 95% del viewport no significa que tape nada:
 * el menu lateral oculto de Wingo (div.dropdown-mobile) cumple las dos cosas y
 * la pagina se ve intacta. La prueba definitiva no es la geometria sino quien
 * responde en la pantalla: se consulta elementFromPoint en cinco puntos y la
 * capa solo cuenta si es ella --- o un descendiente suyo --- lo que esta arriba.
 * Un detector que marca paginas buenas hace tanto dano como uno que deja pasar
 * las malas.
 */
async function medirOverlay(page) {
  return page.evaluate((fraccion) => {
    const vw = window.innerWidth, vh = window.innerHeight, area = vw * vh;
    const puntos = [
      [vw / 2, vh / 2],
      [vw * 0.25, vh * 0.3], [vw * 0.75, vh * 0.3],
      [vw * 0.25, vh * 0.7], [vw * 0.75, vh * 0.7],
    ];
    const arriba = puntos.map(([x, y]) => document.elementFromPoint(x, y)).filter(Boolean);

    const tapa = (el) => arriba.some((a) => a === el || el.contains(a));

    let mayor = 0, descripcion = null, puntosTapados = 0;
    for (const el of document.querySelectorAll('*')) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') continue;
      if (cs.pointerEvents === 'none') continue;
      const esDialogo = el.getAttribute('role') === 'dialog' || el.tagName === 'DIALOG';
      if (!(cs.position === 'fixed' || esDialogo)) continue;
      const r = el.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) continue;
      if (r.right <= 0 || r.bottom <= 0 || r.left >= vw || r.top >= vh) continue;  // fuera de pantalla
      if (!tapa(el)) continue;                                                      // no responde en ningun punto
      const f = (r.width * r.height) / area;
      if (f > mayor) {
        mayor = f;
        puntosTapados = arriba.filter((a) => a === el || el.contains(a)).length;
        descripcion = (el.tagName.toLowerCase() +
          (el.id ? '#' + el.id : '') +
          (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/)[0] : '')).slice(0, 60);
      }
    }
    return {
      mayorFraccion: +mayor.toFixed(3),
      elemento: descripcion,
      puntosTapados,
      hayInterstitial: mayor >= fraccion && puntosTapados >= 1,
    };
  }, FRACCION_INTERSTICIAL);
}

module.exports = { dismissInterstitials, medirOverlay, SELECTORES, TEXTOS, FRACCION_INTERSTICIAL };
