'use strict';

// Inventario operativo, no inferencia de la intención de los manejadores JS.
// Las decisiones y los límites están fechados en docs/CORRECCIONES-G2-G7-06OCT.md.
const VERSION = '1.0.0';
const RAICES = new Set(['#DOCUMENT', 'HTML', 'BODY']);
const NATIVOS = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']);
const ROLES = new Set(['button', 'link', 'checkbox', 'radio', 'switch', 'tab',
  'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'combobox', 'listbox',
  'slider', 'spinbutton', 'textbox', 'searchbox', 'treeitem']);
const COMPUESTOS = new Set(['combobox', 'listbox']);
const propia = (obj, clave) => Object.prototype.hasOwnProperty.call(obj, clave);
const nombre = (n) => String(n.nodeName || '').toUpperCase();
const attrs = (n) => n.attributes || {};
const cajaValida = (b) => b && ['x', 'y', 'w', 'h'].every(k => Number.isFinite(b[k])) && b.w > 0 && b.h > 0;
const tocaViewport = (b, v) => !v || (b.x < v.width && b.y < v.height && b.x + b.w > 0 && b.y + b.h > 0);

function evidencia(n) {
  const tag = nombre(n), a = attrs(n);
  if (NATIVOS.has(tag)) return 'control_nativo';
  if ((tag === 'A' || tag === 'AREA') && typeof a.href === 'string') return 'enlace';
  const role = String(a.role || '').toLowerCase().split(/\s+/).find(r => ROLES.has(r));
  if (role) return COMPUESTOS.has(role) ? 'control_compuesto' : 'rol_interactivo';
  return n.isClickable === true ? 'clic_del_motor' : null;
}

function construirInventario(nodos, { viewport, atributosEstadoRegistrados = false } = {}) {
  const porId = new Map();
  for (const n of nodos) {
    if (!Number.isInteger(n.id) || n.id < 0) throw new Error('Inventario accionable: id de nodo inválido: ' + n.id);
    const anterior = porId.get(n.id);
    if (anterior) {
      // CDP puede proyectar varios fragmentos de layout del mismo pseudoelemento.
      // No son controles ni nuevos ids DOM. Repeticiones idénticas de un registro
      // también representan el mismo nodo; un control contradictorio sí se rechaza.
      const decorativo = nombre(n).startsWith(':') || nombre(n) === '#TEXT';
      if ((decorativo && nombre(anterior) === nombre(n) && anterior.parentId === n.parentId) || JSON.stringify(anterior) === JSON.stringify(n)) continue;
      throw new Error('Inventario accionable: id de nodo duplicado con registros contradictorios: ' + n.id);
    }
    porId.set(n.id, n);
  }
  const registros = [...porId.values()].sort((a, b) => a.id - b.id);
  const cadenas = new Map();
  function ancestros(n) {
    if (cadenas.has(n.id)) return cadenas.get(n.id);
    const ids = new Set([n.id]), resultado = [];
    let p = porId.get(n.parentId);
    while (p) {
      if (ids.has(p.id)) throw new Error('Inventario accionable: ciclo de ancestros en ' + n.id);
      ids.add(p.id); resultado.push(p); p = porId.get(p.parentId);
    }
    cadenas.set(n.id, resultado);
    return resultado;
  }

  const candidatos = [], excluidos = [], ambiguos = [];
  const primeraLeyenda = new Map();
  for (const n of registros) {
    if (nombre(n) === 'LEGEND' && nombre(porId.get(n.parentId) || {}) === 'FIELDSET' && !primeraLeyenda.has(n.parentId)) primeraLeyenda.set(n.parentId, n.id);
  }
  const descartar = (n, motivo, extra = {}) => excluidos.push({ id: n.id, nodeName: n.nodeName, motivo, ...extra });
  for (const n of registros) {
    const tipo = evidencia(n);
    if (!tipo) continue;
    const tag = nombre(n), a = attrs(n);
    if (RAICES.has(tag)) { descartar(n, 'raiz_del_documento'); continue; }
    if (tag.startsWith('#') || tag.startsWith(':')) { descartar(n, 'contenido_no_elemento'); continue; }
    if (!cajaValida(n.bounds)) { descartar(n, 'caja_sin_area_valida'); continue; }
    if (!tocaViewport(n.bounds, viewport)) { descartar(n, 'fuera_del_viewport'); continue; }
    if (tag === 'INPUT' && String(a.type || '').toLowerCase() === 'hidden') { descartar(n, 'input_oculto'); continue; }
    const cadena = ancestros(n);
    const inactivo = [n, ...cadena].find(x => {
      if (propia(attrs(x), 'inert') || String(attrs(x)['aria-disabled'] || '').trim().toLowerCase() === 'true') return true;
      if (!propia(attrs(x), 'disabled')) return false;
      if (NATIVOS.has(nombre(x))) return true;
      if (nombre(x) === 'FIELDSET') {
        const legend = primeraLeyenda.get(x.id);
        return ![n, ...cadena].some(p => p.id === legend);
      }
      return false;
    });
    if (inactivo) { descartar(n, 'estado_inactivo', { estado_en: inactivo.id }); continue; }
    candidatos.push({ nodo: n, tipo });
  }

  const porCandidato = new Map(candidatos.map(c => [c.nodo.id, c]));
  const descendientes = new Map(candidatos.map(c => [c.nodo.id, []]));
  for (const c of candidatos) for (const p of ancestros(c.nodo)) {
    if (descendientes.has(p.id)) descendientes.get(p.id).push(c);
  }
  const semanticos = new Set(candidatos.filter(c => c.tipo !== 'clic_del_motor').map(c => c.nodo.id));
  // Un combo/listbox que contiene controles explícitos no añade otra opción al
  // conjunto de sus componentes. Un compuesto sin ellos sí es un control.
  for (const c of candidatos) if (c.tipo === 'control_compuesto' &&
    descendientes.get(c.nodo.id).some(d => semanticos.has(d.nodo.id))) semanticos.delete(c.nodo.id);

  const hojas = new Map(candidatos.map(c => [c.nodo.id,
    [c, ...descendientes.get(c.nodo.id)].filter(d => descendientes.get(d.nodo.id).length === 0)]));
  const objetivos = [], tipos = new Map();
  const genericoUnico = (c) => !semanticos.has(c.nodo.id) &&
    !descendientes.get(c.nodo.id).some(d => semanticos.has(d.nodo.id)) && hojas.get(c.nodo.id).length === 1;

  for (const c of candidatos) {
    const n = c.nodo;
    if (semanticos.has(n.id)) { objetivos.push(n); tipos.set(n.id, c.tipo); continue; }
    const semanticoPadre = ancestros(n).find(p => semanticos.has(p.id));
    if (semanticoPadre) {
      descartar(n, 'contenido_de_control', { representado_por: semanticoPadre.id });
      continue;
    }
    const hijosSemanticos = descendientes.get(n.id).filter(d => semanticos.has(d.nodo.id));
    if (hijosSemanticos.length || hojas.get(n.id).length > 1) {
      const relacionados = hijosSemanticos.length ? hijosSemanticos : hojas.get(n.id);
      descartar(n, 'contenedor_con_controles', { controles: relacionados.map(d => d.nodo.id) });
      if (c.tipo === 'clic_del_motor') ambiguos.push({ id: n.id, motivo: 'no_se_puede_distinguir_delegacion_de_otra_accion', controles: relacionados.map(d => d.nodo.id) });
      continue;
    }
    // Una cadena genérica de una sola rama representa un objetivo: conservar
    // la caja exterior evita medir solo el icono interior como área de clic.
    const propietarios = ancestros(n).map(p => porCandidato.get(p.id)).filter(p => p && genericoUnico(p));
    const propietario = propietarios.length ? propietarios[propietarios.length - 1].nodo : n;
    if (propietario.id !== n.id) {
      descartar(n, 'contenido_de_control', { representado_por: propietario.id });
      ambiguos.push({ id: n.id, motivo: 'cadena_generica_sin_identidad_de_accion', controles: [propietario.id] });
    } else { objetivos.push(n); tipos.set(n.id, c.tipo); }
  }

  const auditados = objetivos.map(n => ({
    id: n.id, nodeName: n.nodeName, evidencia: tipos.get(n.id),
    bounds: n.bounds, ink: n.ink || null,
    en_g2: Boolean(cajaValida(n.ink) && tocaViewport(n.ink, viewport)),
  }));
  const limitaciones = [
    'El snapshot no identifica la función de cada manejador JS; las exclusiones de contenedores y cadenas genéricas son convenciones operativas auditables.',
    'No se infiere que dos hermanos sean el mismo control por compartir URL, geometría o etiqueta.',
    'No se reconstruyen oclusiones, recortes CSS ni destinos dentro de iframes ausentes del snapshot.',
  ];
  if (!atributosEstadoRegistrados) limitaciones.push('Captura antigua: no certifica el registro de disabled, aria-disabled, inert ni for; la ausencia de esos atributos no demuestra que un control esté habilitado ni que un label carezca de asociación.');

  const porAuditado = new Map(auditados.map(n => [n.id, n]));
  return {
    objetivos,
    objetivosG2: objetivos.filter(n => porAuditado.get(n.id).en_g2),
    auditoria: { version: VERSION, atributos_estado_registrados: atributosEstadoRegistrados,
      objetivos: auditados, excluidos, ambiguos, limitaciones },
  };
}

module.exports = { construirInventario, cajaValida, VERSION };
