'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),path=require('path');
const {perfilLegible}=require('./perfil-legible'),{diagnosticoG6}=require('./alcance-g3-g6');
const raw=require('../verificaciones/alcance-g3-g6-2026-11-05/respuestas/g6-r1.json');

test('el informe explica G6 sin convertir una abstención o un cero en otra cosa',()=>{
  const e={repeticion:1,estado:'abstencion',score:null,motivo:raw.measurements.motivo_abstencion,
    archivo:'resultados/g6.json',diagnostico:diagnosticoG6(raw)};
  const p={revision_g3_g6:'alcance-2026-11-05',perfil:[{group_id:'g6',channel:'wireframe',evaluaciones:[e]},
    {group_id:'g7',channel:'wireframe',evaluaciones:[{repeticion:1,estado:'puntaje',score:0,trigger:'tamano'}]}]};
  const antes=structuredClone(p),md=perfilLegible(p,'/tmp/corrida','/tmp/corrida');
  assert.match(md,/G7 \| wireframe \| 1 \| 0/);assert.match(md,/Resultado global: \*\*No se pudo puntuar\*\*/);
  assert.match(md,/Convenciones evaluadas: 1 de 8/);assert.match(md,/\| K8 \| No se pudo determinar/);
  assert.match(md,/trabajo trasladado no pudo evaluarse/);assert.match(md,/\(<resultados\/g6.json>\)/);
  assert.deepEqual(p,antes);
});
