'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs'), path = require('path'), os = require('os');
const {spawnSync} = require('child_process');
const ROOT = path.resolve(__dirname,'..');
const leer = archivo => JSON.parse(fs.readFileSync(archivo,'utf8'));
const escribir = (archivo,obj) => fs.writeFileSync(archivo,JSON.stringify(obj,null,2));
const cli = args => spawnSync(process.execPath,['scripts/orchestrate.js',...args],{cwd:ROOT,encoding:'utf8'});

function preparar(t,modo,repeticiones) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(),'ux-canales-'));
  t.after(() => fs.rmSync(dir,{recursive:true,force:true}));
  const captura = path.join(dir,'C13'), out = path.join(dir,'corrida');
  fs.mkdirSync(captura);
  for (const f of ['meta.json','nodes.json','screenshot.png','wireframe.png']) fs.copyFileSync(path.join(ROOT,'calibracion/C13',f),path.join(captura,f));
  const r = cli(['preparar','--captura',captura,'--out',out,'--modo',modo,'--repeticiones',String(repeticiones),
    '--runtime','prueba-local','--model-id','modelo-prueba-1','--decoding','no-expuesto-por-el-runtime']);
  assert.equal(r.status,0,r.stderr+r.stdout);
  const archivo = path.join(out,'invocaciones.json');
  return {dir,captura,out,archivo,libro:leer(archivo)};
}

// Copias y datos artificiales para probar el programa. No son evaluaciones nuevas.
function respuesta(inv) {
  const entrada = leer(path.resolve(ROOT,inv.entrada));
  let raw;
  if (inv.group_id === 'g1') raw = {
    group_id:'g1',group_name:'Agrupación perceptual',laws_subsumed:['Proximidad'],
    not_applicable:true,score:null,trigger:null,na_reason:'Menos de dos grupos',
    measurements:{g1_grupos_primer_nivel:entrada.g1.g1_grupos_primer_nivel,lectura_screenshot:[]},
    findings:[],recommendations:[],evidence_insufficient:false,
  };
  else if (inv.group_id === 'g5') {
    const g = entrada.g5;
    raw = {group_id:'g5',group_name:'Posición y progreso',laws_subsumed:['Posición serial'],
      not_applicable:false,na_reason:null,score:0,trigger:'G_existe',evidence_insufficient:true,
      findings:[],recommendations:['Dato artificial para comprobar la salida.'],
      measurements:{g5_listas_total:g.g5_listas_total,g5_lista_principal_sugerida:g.g5_lista_principal_sugerida,
        g5_lista_principal_sugerida_id:g.g5_lista_principal_sugerida_id,main_list_id:null,main_list_parent_id:null,
        J_inicio:null,J_final:null,final_compite_con_inicio:null,Q:true,G_existe:false,G_nombra:false,G_actual:false,G_forma:false,
        steps_declared:null,lectura_screenshot:['Q','G_nombra','G_actual','G_forma']}};
  } else {
    const carpetas = {g2:'g2-2026-10-18',g3:'g3-2026-10-20',g4:'g4-cierre-2026-10-20',g6:'g6-2026-10-20',g7:'g7-2026-10-18'};
    raw = leer(path.join(ROOT,'pilotos',carpetas[inv.group_id],'resultados/C13-r1.json'));
  }
  return {...raw,channel:inv.channel,run:leer(path.resolve(ROOT,inv.solicitud)).run};
}

function completar(caso) {
  for (const inv of caso.libro.invocaciones) {
    escribir(path.resolve(ROOT,inv.resultado_esperado),respuesta(inv));
    inv.contexto_limpio = true;
    inv.mecanismo_de_aislamiento = 'Datos artificiales, sin llamadas al modelo';
  }
  escribir(caso.archivo,caso.libro);
}

for (const [modo,repeticiones,cantidad] of [['referencia',1,7],['referencia',5,35],['comparacion',5,65]]) {
  test('prepara, verifica y recoge ' + cantidad + ' posiciones en modo ' + modo,t => {
    const c = preparar(t,modo,repeticiones);
    assert.equal(c.libro.invocaciones.length,cantidad);
    assert.equal(new Set(c.libro.invocaciones.map(i => i.id)).size,cantidad);
    assert.equal(fs.existsSync(path.join(c.captura,'measurements.json')),false);
    assert.equal(cli(['verificar','--corrida',c.out]).status,0);
    assert.equal(fs.existsSync(path.join(c.out,'perfil.json')),false);
    const g4 = c.libro.invocaciones.filter(i => i.group_id === 'g4');
    assert.equal(g4.length,repeticiones); assert(g4.every(i => i.channel === 'screenshot'));
    completar(c);
    const originales = c.libro.invocaciones.map(i => fs.readFileSync(path.resolve(ROOT,i.resultado_esperado),'utf8'));
    const r = cli(['recoger','--corrida',c.out]);
    assert.equal(r.status,0,r.stderr+r.stdout);
    const perfil = leer(path.join(c.out,'perfil.json'));
    assert.equal(perfil.version_ejecucion,'1.0.0');
    assert.equal(perfil.configuracion.runtime,'prueba-local');
    assert.equal(perfil.perfil.length,modo === 'comparacion' ? 13 : 7);
    assert(perfil.perfil.every(p => p.repeticiones === repeticiones));
    assert.deepEqual(c.libro.invocaciones.map(i => fs.readFileSync(path.resolve(ROOT,i.resultado_esperado),'utf8')),originales);
    if (modo === 'comparacion') {
      assert.equal(perfil.comparacion_canales.length,6);
      assert(perfil.comparacion_canales.every(g => g.pares.length === 5));
      assert.equal(perfil.comparacion_canales.find(g => g.group_id === 'g1').interpretable,false);
      assert.equal(perfil.comparacion_canales.find(g => g.group_id === 'g6').interpretable,false);
      const csv = fs.readFileSync(path.join(c.out,'comparacion-canales.csv'),'utf8').trim().split('\n');
      assert.equal(csv.length,31);
      assert.match(csv[0],/"runtime","model_id","measurements_version"/);
      assert.match(csv[1],/"prueba-local","modelo-prueba-1"/);
      for (const g of perfil.perfil) for (const e of g.evaluaciones) {
        const original = leer(path.resolve(ROOT,e.archivo));
        assert.equal(e.score,original.score); assert.equal(e.trigger,original.trigger);
      }
    }
  });
}

test('las solicitudes tienen el canal, las imágenes y la repetición correctos',t => {
  const c = preparar(t,'comparacion',2);
  for (const inv of c.libro.invocaciones) {
    const solicitud = leer(path.resolve(ROOT,inv.solicitud));
    assert.equal(solicitud.run.repetition,inv.repetition);
    assert.equal(solicitud.imagenes[0].canal,inv.channel);
    if (inv.channel === 'screenshot' || ['g1','g7'].includes(inv.group_id)) assert.equal(inv.imagenes.length,1);
    else assert.equal(inv.imagenes[1].uso,'apoyo_textual');
    const mismoCanal = c.libro.invocaciones.filter(i => i.group_id === inv.group_id && i.channel === inv.channel);
    assert(mismoCanal.every(i => i.prompt_hash === inv.prompt_hash));
    const mismoGrupo = c.libro.invocaciones.filter(i => i.group_id === inv.group_id);
    assert(mismoGrupo.every(i => i.entrada_sha256 === inv.entrada_sha256));
    if (inv.channel === 'screenshot') {
      const cabecera = fs.readFileSync(path.resolve(ROOT,inv.prompt),'utf8').split('# Escala')[0];
      assert.doesNotMatch(cabecera,/La primera imagen (es el wireframe|adjunta es wireframe)/);
    }
  }
});

for (const cambio of ['canal_faltante','configuracion','medidas','prompt','solicitud','nodes']) {
  test('rechaza cambios en ' + cambio + ' antes de evaluar',t => {
    const c = preparar(t,'comparacion',1), inv = c.libro.invocaciones.find(i => i.group_id === 'g7' && i.channel === 'screenshot');
    if (cambio === 'canal_faltante') c.libro.invocaciones.splice(c.libro.invocaciones.indexOf(inv),1);
    if (cambio === 'configuracion') inv.runtime = 'otro-runtime';
    if (cambio === 'medidas') inv.entrada_sha256 = '0'.repeat(64);
    if (cambio === 'prompt') fs.appendFileSync(path.resolve(ROOT,inv.prompt),'Cambio');
    if (cambio === 'solicitud') fs.appendFileSync(path.resolve(ROOT,inv.solicitud),' ');
    if (cambio === 'nodes') fs.appendFileSync(path.join(c.captura,'nodes.json'),' ');
    escribir(c.archivo,c.libro);
    const r = cli(['verificar','--corrida',c.out]);
    assert.equal(r.status,1,r.stdout);
    assert.equal(fs.existsSync(path.join(c.out,'perfil.json')),false);
  });
}

test('una respuesta inválida conserva el original, el perfil y el CSV anteriores',t => {
  const c = preparar(t,'comparacion',1); completar(c);
  assert.equal(cli(['recoger','--corrida',c.out]).status,0);
  const perfil = fs.readFileSync(path.join(c.out,'perfil.json')), csv = fs.readFileSync(path.join(c.out,'comparacion-canales.csv'));
  const inv = c.libro.invocaciones.find(i => i.group_id === 'g7' && i.channel === 'screenshot');
  const obj = leer(path.resolve(ROOT,inv.resultado_esperado)); obj.measurements.g7_N_obj++;
  escribir(path.resolve(ROOT,inv.resultado_esperado),obj);
  const antes = fs.readFileSync(path.resolve(ROOT,inv.resultado_esperado));
  const r = cli(['recoger','--corrida',c.out]); assert.equal(r.status,1);
  assert.match(r.stderr,/distinto de la fuente/);
  assert.deepEqual(fs.readFileSync(path.resolve(ROOT,inv.resultado_esperado)),antes);
  assert.deepEqual(fs.readFileSync(path.join(c.out,'perfil.json')),perfil);
  assert.deepEqual(fs.readFileSync(path.join(c.out,'comparacion-canales.csv')),csv);
});

test('no sobrescribe una carpeta preparada',t => {
  const c = preparar(t,'referencia',1), antes = fs.readFileSync(c.archivo);
  const r = cli(['preparar','--captura',c.captura,'--out',c.out,'--runtime','prueba-local',
    '--model-id','modelo-prueba-1','--decoding','{"temperature":0}']);
  assert.equal(r.status,1); assert.match(r.stderr,/ya tiene contenido/);
  assert.deepEqual(fs.readFileSync(c.archivo),antes);
});

test('las opciones inválidas o repetidas fallan antes de preparar archivos',() => {
  for (const args of [
    ['preparar','--modo','desconocido'],
    ['preparar','--modo'],
    ['preparar','--modo','referencia','--modo','comparacion'],
    ['preparar','--modoo','comparacion'],
    ['verificar','--modo','comparacion'],
    ['preparar','--captura','no-usada','--out','no-usada','--runtime','prueba',
      '--model-id','modelo-prueba-1','--decoding','[]'],
  ]) assert.equal(cli(args).status,1);
});
