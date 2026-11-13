'use strict';
const path=require('path');
const celda=v=>String(v??'').replace(/\|/g,'\\|').replace(/[\r\n]+/g,' ');
const resultado=e=>e.estado==='puntaje'?String(e.score):e.estado==='no_aplica'?'No aplica':e.estado==='invalida'?'Respuesta inválida, conservada sin corregir':'No se pudo puntuar';

function perfilLegible(perfil,carpeta,raiz) {
  const lineas=['# Resultado de la evaluación','',
    'Una pantalla capturada. Los resultados son juicios del modelo y no sustituyen la revisión experta.',
    'Los casos sin puntaje conservan su motivo. No se calcula un promedio de los grupos.','',
    'Revisión: '+celda(perfil.revision_g3_g6||'anterior al alcance de la entrega 0.2.2')+'.',''];
  for(const aviso of perfil.captura?.revision?.advertencias||[]) lineas.push('Aviso de captura: '+celda(aviso),'');
  lineas.push('| Grupo | Canal | Repetición | Resultado | Motivo o condición |','|---|---|---:|---|---|');
  for(const g of perfil.perfil) for(const e of g.evaluaciones) {
    lineas.push('| '+g.group_id.toUpperCase()+' | '+g.channel+' | '+e.repeticion+' | '+resultado(e)+' | '+celda(e.motivo||e.trigger||'')+' |');
  }
  lineas.push('','G1 conserva la advertencia de instrumento no interpretable en v1.','');
  for(const g of perfil.perfil) for(const e of g.evaluaciones) {
    if(e.revision_de_reglas) {
      lineas.push('## G3 '+g.channel+' repetición '+e.repeticion,'');
      const notas=e.revision_de_reglas.observaciones;
      lineas.push(notas.length?notas.map(celda).join(' '):'No se encontraron discrepancias entre el nivel y los juicios declarados por el modelo.');
      lineas.push('Esta comprobación no confirma que la región o las unidades elegidas sean correctas.','');
    }
    if(!e.diagnostico) continue;
    const d=e.diagnostico,c=d.cobertura;
    lineas.push('## G6 '+g.channel+' repetición '+e.repeticion,'',
      'Resultado global: **'+resultado(e)+'**.',
      ...(e.motivo?['Motivo: '+celda(e.motivo)+'.']:[]),'',
      'Convenciones evaluadas: '+c.evaluadas+' de '+c.catalogadas+'. No aplicables confirmadas: '+c.no_aplicables_confirmadas+
      '. Indeterminadas: '+c.indeterminadas+'.','',
      '| Criterio | Resultado | Evidencia por id | Razón |','|---|---|---|---|');
    const estados={cumplidas:'Cumple',incumplidas:'Incumple',no_aplicables:'No aplica',indeterminadas:'No se pudo determinar'};
    const filas=Object.entries(estados).flatMap(([k,estado])=>d.convenciones[k].map(f=>({...f,estado})));
    for(const f of filas.sort((a,b)=>a.id.localeCompare(b.id))) lineas.push('| '+f.id+' | '+f.estado+' | '+f.evidencia_ids.join(', ')+' | '+celda(f.razon)+' |');
    const o=d.observaciones_visibles;
    lineas.push('','Redundancias identificadas: '+(o.redundancias??'no se pudo determinar')+'.',
      'Operaciones trasladadas identificadas: '+(o.operaciones_trasladadas??'no se pudo determinar')+'.');
    if(o.trabajo_evaluable!==true) lineas.push('El trabajo trasladado no pudo evaluarse como criterio en esta captura. El recuento no demuestra su ausencia en el sitio.');
    lineas.push('','El diagnóstico se limita a la evidencia suministrada. No se calcula una nota del subconjunto.','');
    const archivo=path.relative(carpeta,path.resolve(raiz,e.archivo)).replace(/\\/g,'/');
    lineas.push('[Ver respuesta original](<'+archivo+'>).','');
  }
  return lineas.join('\n')+'\n';
}
module.exports={perfilLegible};
