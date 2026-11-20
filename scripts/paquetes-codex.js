#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const RAIZ = path.resolve(__dirname, '..');
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
const leer = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const dentro = (base, destino) => {
  const rel = path.relative(path.resolve(base), path.resolve(destino));
  return rel !== '' && rel !== '..' && !rel.startsWith('..' + path.sep) && !path.isAbsolute(rel);
};

function libro(corrida) {
  const dir = path.resolve(RAIZ, corrida), archivo = path.join(dir, 'invocaciones.json');
  if (!dentro(RAIZ, dir)) throw Error('La corrida debe estar dentro del repositorio.');
  return {dir,archivo,datos:leer(archivo)};
}

function raizEntradas(entradas) {
  const dir = path.resolve(RAIZ, entradas);
  if (!dentro(RAIZ, dir) || dir === path.join(RAIZ, 'resultados') || dentro(path.join(RAIZ, 'resultados'), dir))
    throw Error('Las entradas deben estar dentro del repositorio y fuera de resultados.');
  return dir;
}

function insumos(inv) {
  const lista = [
    {origen:inv.solicitud,destino:'solicitud.json',sha256:inv.solicitud_sha256},
    {origen:inv.prompt,destino:'prompt.md',sha256:inv.prompt_hash},
    {origen:inv.entrada,destino:'entrada.json',sha256:inv.entrada_sha256},
    {origen:inv.esquema,destino:'esquema.json',sha256:inv.esquema_sha256},
    ...inv.imagenes.map(i => ({origen:i.archivo,destino:i.canal + '.png',sha256:i.sha256})),
  ];
  if (new Set(lista.map(i => i.destino)).size !== lista.length) throw Error(inv.id + ': nombres de insumo duplicados');
  return lista;
}

function crear(corrida, entradas) {
  const {datos} = libro(corrida), base = raizEntradas(entradas);
  if (!Array.isArray(datos.invocaciones)) throw Error('Falta el libro de invocaciones.');
  const creados = [];
  for (const inv of datos.invocaciones) {
    if (fs.existsSync(path.resolve(RAIZ, inv.resultado_esperado))) continue;
    const dir = path.join(base, datos.corrida, inv.id);
    if (!dentro(base, dir)) throw Error('Ruta de entrada fuera de la carpeta prevista.');
    if (fs.existsSync(dir)) throw Error(inv.id + ': la entrada ya existe; se conserva para reanudar.');
    const archivos = insumos(inv);
    for (const f of archivos) if (hash(fs.readFileSync(path.resolve(RAIZ,f.origen))) !== f.sha256) throw Error(inv.id + ': huella distinta en ' + f.destino);
    fs.mkdirSync(dir, {recursive:true});
    for (const f of archivos) fs.writeFileSync(path.join(dir, f.destino), fs.readFileSync(path.resolve(RAIZ, f.origen)), {flag:'wx'});
    const skill = fs.readFileSync(path.join(RAIZ, 'skills/ux-audit/SKILL.md'));
    fs.writeFileSync(path.join(dir, 'SKILL.md'), skill, {flag:'wx'});
    fs.writeFileSync(path.join(dir, 'manifiesto-entrada.json'), JSON.stringify({id:inv.id,
      archivos:archivos.map(({destino,sha256}) => ({archivo:destino,sha256})), skill_sha256:hash(skill)}, null, 2) + '\n', {flag:'wx'});
    creados.push(inv.id);
  }
  return creados;
}

const MECANISMO_CODEX = 'Subagente nuevo con fork_turns=none, sin transcripcion previa; encargo de leer solo entrada';

function registrar(corrida, entradas, id, mecanismo = MECANISMO_CODEX) {
  if (typeof mecanismo !== 'string' || !mecanismo.trim()) throw Error('El mecanismo de aislamiento no puede estar vacío.');
  const {dir,archivo,datos} = libro(corrida), base = raizEntradas(entradas);
  const coincidencias = datos.invocaciones.filter(i => i.id === id);
  if (coincidencias.length !== 1) throw Error('Identificador de invocación inexistente o duplicado.');
  const inv = coincidencias[0], carpeta = path.join(base, datos.corrida, inv.id);
  if (!dentro(base, carpeta)) throw Error('Ruta de entrada fuera de la carpeta prevista.');
  const meta = leer(path.join(carpeta, 'manifiesto-entrada.json'));
  const archivos = insumos(inv);
  if (meta.id !== id || !Array.isArray(meta.archivos) || meta.archivos.length !== archivos.length) throw Error(id + ': manifiesto de entrada distinto');
  for (const f of archivos) {
    const m = meta.archivos.find(x => x.archivo === f.destino);
    if (!m || m.sha256 !== f.sha256 || hash(fs.readFileSync(path.join(carpeta, f.destino))) !== f.sha256)
      throw Error(id + ': entrada modificada: ' + f.destino);
  }
  if (hash(fs.readFileSync(path.join(carpeta,'SKILL.md'))) !== meta.skill_sha256 ||
      hash(fs.readFileSync(path.join(RAIZ,'skills/ux-audit/SKILL.md'))) !== meta.skill_sha256)
    throw Error(id + ': copia de la skill modificada');
  const respuesta = fs.readFileSync(path.join(carpeta, 'respuesta.json'));
  const destino = path.resolve(RAIZ, inv.resultado_esperado);
  if (!dentro(path.join(dir, 'resultados'), destino)) throw Error(id + ': resultado fuera de su corrida');
  if (fs.existsSync(destino)) {
    if (!fs.readFileSync(destino).equals(respuesta)) throw Error(id + ': ya existe otra respuesta; se conserva.');
  } else fs.writeFileSync(destino, respuesta, {flag:'wx'});
  inv.contexto_limpio = true;
  inv.mecanismo_de_aislamiento = mecanismo;
  inv.estado = 'respondido';
  const temporal = archivo + '.' + id + '.tmp';
  if (!dentro(dir, temporal)) throw Error('Ruta temporal fuera de la corrida.');
  fs.writeFileSync(temporal, JSON.stringify(datos, null, 2) + '\n', {flag:'wx'});
  fs.renameSync(temporal, archivo);
  return {id,bytes:respuesta.length,sha256:hash(respuesta)};
}

function main(argv) {
  // --mecanismo <texto> (opcional, solo con registrar): sustituye el texto de aislamiento de Codex.
  let mecanismo;
  const m = argv.indexOf('--mecanismo');
  if (m >= 0) {
    mecanismo = argv[m + 1];
    if (!mecanismo || mecanismo.startsWith('--')) throw Error('Falta el valor de --mecanismo.');
    argv = argv.filter((_, k) => k !== m && k !== m + 1);
  }
  if (argv.length < 3 || argv.length > 4) throw Error('Uso: node scripts/paquetes-codex.js crear|registrar <corrida> <entradas> [id] [--mecanismo <texto>]');
  const [accion,corrida,entradas,id] = argv;
  if (accion === 'crear' && !id && mecanismo === undefined) console.log(JSON.stringify({creados:crear(corrida,entradas)}));
  else if (accion === 'registrar' && id) console.log(JSON.stringify(registrar(corrida,entradas,id,mecanismo)));
  else throw Error('Acción o argumentos inválidos.');
}
if (require.main === module) {
  try { main(process.argv.slice(2)); } catch (e) { console.error(e.message); process.exitCode = 1; }
}
module.exports = {crear,registrar};
