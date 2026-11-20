#!/usr/bin/env node
'use strict';

// Analiza únicamente perfiles de esta corrida. No abre panel ni corridas anteriores.
const fs = require('node:fs');
const path = require('node:path');

const MARCADAS = new Set(['G01','G04','L01','L02','L03']);
const SERIES = [['g2','wireframe'],['g2','screenshot'],['g4','screenshot'],['g7','wireframe'],['g7','screenshot']];
const ESTADOS = new Set(['puntaje','no_aplica','abstencion','invalida']);
const SEMILLA = 20261113, REPLICAS = 2000;
const r4 = v => Number.isFinite(v) ? +v.toFixed(4) : null;
const paginasEsperadas = () => Array.from({length:10}, (_, i) => ['H','G','L'].map(s => s + String(i + 1).padStart(2, '0'))).flat();
const clave = (pagina, grupo, canal) => pagina + '/' + grupo + '/' + canal;
const media = values => values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;

function azar(semilla) {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function tauB(pares) {
  let concordantes = 0, discordantes = 0, empatesW = 0, empatesS = 0;
  for (let i = 0; i < pares.length; i++) for (let j = i + 1; j < pares.length; j++) {
    const w = Math.sign(pares[i].w - pares[j].w), s = Math.sign(pares[i].s - pares[j].s);
    if (!w && !s) continue;
    if (!w) empatesW++; else if (!s) empatesS++; else if (w === s) concordantes++; else discordantes++;
  }
  const den = Math.sqrt((concordantes + discordantes + empatesW) * (concordantes + discordantes + empatesS));
  return den ? (concordantes - discordantes) / den : null;
}

function intervaloMedia(pares) {
  const porPagina = new Map();
  for (const par of pares) {
    if (!porPagina.has(par.pagina)) porPagina.set(par.pagina, []);
    porPagina.get(par.pagina).push(par);
  }
  const paginas = [...porPagina.keys()];
  if (pares.length < 5) return {ic95:null, replicas_validas:0, motivo:'n insuficiente'};
  if (paginas.length < 2) return {ic95:null, replicas_validas:0, motivo:'menos de dos páginas'};
  const rnd = azar(SEMILLA), valores = [];
  for (let r = 0; r < REPLICAS; r++) {
    const muestra = [];
    for (let i = 0; i < paginas.length; i++) muestra.push(...porPagina.get(paginas[Math.floor(rnd() * paginas.length)]));
    const estimacion = media(muestra.map(p => p.s - p.w));
    if (Number.isFinite(estimacion)) valores.push(estimacion);
  }
  if (!valores.length) return {ic95:null, replicas_validas:0, motivo:'sin réplicas válidas'};
  valores.sort((a, b) => a - b);
  const n = valores.length;
  return {ic95:[r4(valores[Math.floor(0.025 * (n - 1))]),r4(valores[Math.ceil(0.975 * (n - 1))])], replicas_validas:n, motivo:null};
}

function resumirPares(pares) {
  const n = pares.length, diferencias = pares.map(p => p.s - p.w);
  const distribucion = Object.fromEntries(Array.from({length:9}, (_, i) => [String(i - 4), diferencias.filter(d => d === i - 4).length]));
  if (!n) return {n:0, diferencia_media:null, intervalo:intervaloMedia(pares), exacto:null, a_un_nivel:null, tau_b:null, bp_cuadratico_k5:null, distribucion};
  const po = media(pares.map(p => 1 - ((p.s - p.w) / 4) ** 2));
  const modal = lado => Math.max(...Array.from({length:5}, (_, i) => pares.filter(p => p[lado] === i).length)) / n;
  return {n, diferencia_media:r4(media(diferencias)), intervalo:intervaloMedia(pares),
    exacto:r4(diferencias.filter(d => d === 0).length / n),
    a_un_nivel:r4(diferencias.filter(d => Math.abs(d) <= 1).length / n),
    tau_b:r4(tauB(pares)), bp_cuadratico_k5:r4((po - 0.75) / 0.25),
    fraccion_modal_wireframe:r4(modal('w')), fraccion_modal_screenshot:r4(modal('s')), distribucion};
}

function cargarCorrida(corrida) {
  const unidades = new Map(), cerradas = [], pendientes = [], modelos = new Set();
  for (const pagina of paginasEsperadas()) {
    const dir = path.join(corrida, pagina), perfilPath = path.join(dir, 'perfil.json'), libroPath = path.join(dir, 'invocaciones.json');
    if (!fs.existsSync(perfilPath)) { pendientes.push(pagina); continue; }
    if (!fs.existsSync(libroPath)) throw Error(pagina + ': falta el libro de invocaciones');
    const perfil = JSON.parse(fs.readFileSync(perfilPath, 'utf8'));
    const libro = JSON.parse(fs.readFileSync(libroPath, 'utf8'));
    if (path.basename(String(libro.captura?.dir || '').replace(/\\/g, '/')) !== pagina) throw Error(pagina + ': la captura no corresponde a la carpeta');
    if (!Array.isArray(perfil.perfil) || perfil.perfil.length !== SERIES.length ||
        !Array.isArray(libro.invocaciones) || libro.invocaciones.length !== SERIES.length || libro.repeticiones !== 1)
      throw Error(pagina + ': perfil o libro incompleto');
    for (const [grupo, canal] of SERIES) {
      const series = perfil.perfil.filter(s => s.group_id === grupo && s.channel === canal);
      const invs = libro.invocaciones.filter(i => i.group_id === grupo && i.channel === canal && i.repetition === 1);
      if (series.length !== 1 || invs.length !== 1 || series[0].evaluaciones?.length !== 1) throw Error(pagina + ': posición ausente o duplicada: ' + grupo + '/' + canal);
      const ev = series[0].evaluaciones[0], inv = invs[0];
      if (inv.contexto_limpio !== true || !inv.mecanismo_de_aislamiento) throw Error(pagina + ': falta el registro de aislamiento');
      if (!ESTADOS.has(ev.estado)) throw Error(pagina + ': estado desconocido: ' + ev.estado);
      if (ev.estado === 'puntaje' && (!Number.isInteger(ev.score) || ev.score < 0 || ev.score > 4)) throw Error(pagina + ': nivel inválido');
      if (ev.estado !== 'puntaje' && ev.score !== null) throw Error(pagina + ': estado sin puntaje con nivel');
      const modelo = typeof inv.model_id === 'string' && inv.model_id ? inv.model_id : 'no_verificado';
      modelos.add(modelo);
      unidades.set(clave(pagina, grupo, canal), {pagina, grupo, canal, estado:ev.estado,
        nivel:ev.estado === 'puntaje' ? ev.score : null, motivo:ev.motivo || null, modelo});
    }
    cerradas.push(pagina);
  }
  return {unidades,cerradas,pendientes,modelos:[...modelos].sort()};
}

function analizarModelo(datos, modelo, sinMarcadas) {
  const paginas = datos.cerradas.filter(p => !sinMarcadas || !MARCADAS.has(p));
  const unidad = (pagina, grupo, canal) => datos.unidades.get(clave(pagina, grupo, canal));
  const delModelo = u => !u ? {estado:'sin_dato'} : u.modelo === modelo ? u : {estado:'otro_modelo'};
  const paginasModelo = paginas.filter(p => SERIES.some(([g, c]) => unidad(p, g, c)?.modelo === modelo));
  const pares = [], noComparables = {};
  for (const grupo of ['g2','g7']) {
    const no = {wireframe_puntuo_screenshot_no:{},screenshot_puntuo_wireframe_no:{},ninguno:{}};
    for (const pagina of paginasModelo) {
      const w = delModelo(unidad(pagina, grupo, 'wireframe')), s = delModelo(unidad(pagina, grupo, 'screenshot'));
      if (w.estado === 'puntaje' && s.estado === 'puntaje') pares.push({pagina,grupo,w:w.nivel,s:s.nivel});
      else if (w.estado === 'puntaje') no.wireframe_puntuo_screenshot_no[s.estado] = (no.wireframe_puntuo_screenshot_no[s.estado] || 0) + 1;
      else if (s.estado === 'puntaje') no.screenshot_puntuo_wireframe_no[w.estado] = (no.screenshot_puntuo_wireframe_no[w.estado] || 0) + 1;
      else { const transicion = w.estado + ' -> ' + s.estado; no.ninguno[transicion] = (no.ninguno[transicion] || 0) + 1; }
    }
    noComparables[grupo] = no;
  }
  const distribuciones = {};
  for (const [grupo, canal] of SERIES) {
    const resumen = {niveles:{0:0,1:0,2:0,3:0,4:0},no_aplica:0,abstencion:0,invalida:0,sin_dato:0,otro_modelo:0,motivos:{}};
    for (const pagina of paginasModelo) {
      const u = delModelo(unidad(pagina, grupo, canal));
      if (u.estado === 'puntaje') resumen.niveles[u.nivel]++;
      else {
        resumen[u.estado]++;
        const motivo = u.motivo || 'sin motivo registrado';
        if (!['sin_dato','otro_modelo'].includes(u.estado)) resumen.motivos[motivo] = (resumen.motivos[motivo] || 0) + 1;
      }
    }
    distribuciones[grupo + '/' + canal] = resumen;
  }
  return {paginas:paginasModelo, distribuciones, no_comparables:noComparables,
    representacion:{g2:resumirPares(pares.filter(p => p.grupo === 'g2')),
      g7:resumirPares(pares.filter(p => p.grupo === 'g7')), agrupado:resumirPares(pares)}};
}

function analizar(corrida) {
  const datos = cargarCorrida(corrida);
  if (!datos.cerradas.length) throw Error('No hay páginas cerradas; no se genera un análisis.');
  return {regla:'docs/ANALISIS-CANALES-CODEX-2026-11-20.md', alcance:'representación y estados de Codex; sin panel ni corrida anterior',
    paginas_cerradas:datos.cerradas, paginas_pendientes:datos.pendientes, marcadas:[...MARCADAS],
    replicas:REPLICAS, semilla:SEMILLA, por_modelo:Object.fromEntries(datos.modelos.map(m => [m,
      {todas:analizarModelo(datos,m,false),sin_marcadas:analizarModelo(datos,m,true)}]))};
}

function main(args) {
  if (args.length !== 4 || args[0] !== '--corrida' || args[2] !== '--out') throw Error('Uso: node scripts/analizar-representacion-codex.js --corrida <carpeta> --out <archivo dentro de la corrida>');
  const corrida = path.resolve(args[1]), out = path.resolve(args[3]);
  const relativa = path.relative(corrida, out);
  if (!relativa || relativa.startsWith('..' + path.sep) || path.isAbsolute(relativa)) throw Error('La salida debe estar dentro de la carpeta de corrida.');
  if (fs.existsSync(out)) throw Error('La salida ya existe; se conserva sin sobrescribir.');
  const resultado = analizar(corrida);
  fs.writeFileSync(out, JSON.stringify(resultado, null, 2) + '\n', {flag:'wx'});
  console.log('Análisis escrito en ' + out + '; páginas cerradas: ' + resultado.paginas_cerradas.length);
}

if (require.main === module) {
  try { main(process.argv.slice(2)); } catch (e) { console.error(e.message); process.exitCode = 1; }
}
module.exports = {analizar,azar,intervaloMedia,resumirPares,tauB};
