#!/usr/bin/env node
'use strict';
// Análisis de resultados originales, sin modificar juicios ni imputar niveles.
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const json=f=>JSON.parse(fs.readFileSync(f,'utf8')),sha=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const write=(f,o)=>fs.writeFileSync(f,JSON.stringify(o,null,2)+'\n');
const csv=v=>v===undefined?'':v===null?'null':'"'+String(v).replaceAll('"','""')+'"';
const label=r=>r.not_applicable?'NA':r.score===null?'ABSTENCION':r.score;
function analyze(dir){
  const m=json(path.join(dir,'manifiesto.json')),levels=[0,0,0,0,0],pages=[],details=[],proofs=[];
  let valid=0,invalid=0,technical=0,abstentions=0,na=0,insufficient=0;
  const threads=new Set(),usage={};
  for(const p of m.pages){const records=[],states=[];
    for(let r=1;r<=5;r++){
      const key=p.id+'-r'+r,proofFile=path.join(dir,'trazas',key+'.json');
      if(!fs.existsSync(proofFile)){states.push('pendiente');details.push([p.id,r,'pendiente']);continue;}
      const proof=json(proofFile);proofs.push(proof);states.push(proof.status);
      if(proof.thread_id){if(threads.has(proof.thread_id))throw Error('Sesión repetida');threads.add(proof.thread_id);}
      for(const [k,v] of Object.entries(proof.usage||{}))if(typeof v==='number')usage[k]=(usage[k]||0)+v;
      const rawFile=path.join(dir,'respuestas',key+'.json');let raw=null;
      if(proof.raw_sha256){if(sha(rawFile)!==proof.raw_sha256)throw Error(key+': respuesta cambió');raw=json(rawFile);}
      const eligible=['valido','abstencion'].includes(proof.status);
      if(eligible){const f=path.join(dir,'resultados',key+'.json');if(sha(f)!==proof.result_sha256)throw Error(key+': atribución cambió');
        const {run,...unchanged}=json(f);if(JSON.stringify(unchanged)!==JSON.stringify(raw)||run.repetition!==r||run.prompt_hash!==p.prompt_hash)throw Error(key+': juicio alterado');
        if(raw.evidence_insufficient)insufficient++;
        records.push({repetition:r,status:proof.status,raw});
      }
      if(proof.status==='valido'){valid++;if(raw.not_applicable)na++;else levels[raw.score]++;}
      else if(proof.status==='abstencion')abstentions++;else if(proof.status==='invalido')invalid++;else technical++;
      const v=raw?.measurements||{};
      details.push([p.id,r,proof.status,raw?label(raw):'',raw?.trigger,raw?.evidence_insufficient,v.main_set_id,v.I_principal,v.I_total,v.P,v.Bn,v.Cn,v.channels_of_isolation,v.jerarquia_entre_dos,v.motivo_abstencion,p.prompt_hash,proof.raw_sha256,JSON.stringify(proof.errors)]);
    }
    const scored=records.filter(r=>r.status==='valido'),counts=new Map();
    for(const r of scored){const l=label(r.raw);counts.set(l,(counts.get(l)||0)+1);}
    const max=Math.max(0,...counts.values()),modes=[...counts].filter(([,n])=>n===max).map(([l])=>l);
    const numeric=scored.filter(r=>!r.raw.not_applicable).map(r=>r.raw.score);
    pages.push({id:p.id,estados:states,validas:scored.length,abstenciones:records.filter(r=>r.status==='abstencion').length,
      niveles:scored.map(r=>label(r.raw)),todas_las_salidas:records.map(r=>label(r.raw)),modas:modes,fraccion_en_moda:scored.length?max/scored.length:null,
      rango_ordinal:numeric.length?Math.max(...numeric)-Math.min(...numeric):null,
      triggers_distintos:new Set(scored.map(r=>r.raw.trigger)).size,
      principales_distintos:new Set(records.map(r=>r.raw.measurements.main_set_id)).size,
      evidencia_insuficiente:records.filter(r=>r.raw.evidence_insufficient).length});
  }
  const archivedTechnical=fs.readdirSync(dir).filter(n=>/^REANUDACION-\d+\.json$/.test(n)).reduce((n,f)=>n+json(path.join(dir,f)).intentos_preservados.length,0);
  const summary={analizado_en:new Date().toISOString(),planeadas:120,validas:valid,abstenciones:abstentions,invalidas:invalid,errores_tecnicos:technical,
    intentos_tecnicos_archivados:archivedTechnical,intentos_totales:proofs.length+archivedTechnical,pendientes:120-proofs.length,ejecucion_completa:proofs.length===120,niveles_por_evaluacion:levels,no_aplicables:na,evidencia_insuficiente:insufficient,
    respuestas_conformes:valid+abstentions,paginas_con_cinco_validas:pages.filter(p=>p.validas===5).length,
    paginas_estables_en_nivel:pages.filter(p=>p.validas===5&&new Set(p.niveles).size===1).length,
    paginas_con_cinco_conformes:pages.filter(p=>p.validas+p.abstenciones===5).length,paginas_con_puntaje_y_abstencion:pages.filter(p=>p.validas+p.abstenciones===5&&p.validas>0&&p.abstenciones>0).map(p=>p.id),paginas_con_seleccion_variable:pages.filter(p=>p.validas+p.abstenciones===5&&p.principales_distintos>1).map(p=>p.id),paginas_con_empate_modal:pages.filter(p=>p.modas.length>1).map(p=>p.id),uso_tokens:usage,paginas:pages};
  write(path.join(dir,'resumen.json'),summary);
  const header=['pagina','repeticion','estado','nivel','trigger','evidencia_insuficiente','conjunto_principal','I_principal','I_total','P','Bn','Cn','canales','jerarquia_entre_dos','motivo_abstencion','prompt_sha256','respuesta_sha256','errores'];
  fs.writeFileSync(path.join(dir,'evaluaciones.csv'),[header,...details].map(row=>row.map(csv).join(',')).join('\n')+'\n');
  fs.writeFileSync(path.join(dir,'resumen.csv'),[['pagina','validas','abstenciones','niveles_validos','todas_salidas','modas','fraccion_modal','rango_ordinal','triggers_distintos','principales_distintos','evidencia_insuficiente'],...pages.map(p=>[p.id,p.validas,p.abstenciones,p.niveles.join('|'),p.todas_las_salidas.join('|'),p.modas.join('|'),p.fraccion_en_moda,p.rango_ordinal,p.triggers_distintos,p.principales_distintos,p.evidencia_insuficiente])].map(r=>r.map(csv).join(',')).join('\n')+'\n');
  console.log(JSON.stringify({validas:valid,abstenciones:abstentions,invalidas:invalid,errores_tecnicos:technical,pendientes:summary.pendientes,distribucion:levels,no_aplicables:na}));
  return summary;
}
function report(dir){
  const s=analyze(dir),m=json(path.join(dir,'manifiesto.json'));const applicable=s.validas-s.no_aplicables;
  const modes=Array(5).fill(0);let modeNA=0;
  for(const p of s.paginas)if(p.validas===5&&p.modas.length===1){if(p.modas[0]==='NA')modeNA++;else modes[p.modas[0]]++;}
  const reasons={},inputAudit=[];let anchorContradictions=0;
  const branches={Bn_positivo:0,Cn_positivo:0,I_ge3:0,aislamiento_multicanal:0};
  const {expectedScore,validationProblems}=require('./pilot-g4-real');
  for(const p of m.pages){const input=json(path.join(dir,'entradas',p.id+'.json')),g=input.g4;
    inputAudit.push({id:p.id,conjuntos:g.g4_conjuntos_pares_total,pares_de_dos:g.g4_conjuntos_pares.filter(v=>v.n===2).length,
      miembros_incompletos:g.g4_conjuntos_pares.filter(v=>v.n!==v.miembros.length).length,
      conjuntos_parciales:g.g4_conjuntos_pares.filter(v=>v.parcial).length,raices_virtuales:g.g4_conjuntos_pares.filter(v=>v.padre_raiz_virtual).length,
      banners:g.g4_banner_candidatos.length,cromo:g.g4_cromo_candidatos.length});
    for(let r=1;r<=5;r++){const key=p.id+'-r'+r,f=path.join(dir,'trazas',key+'.json');if(!fs.existsSync(f))continue;const proof=json(f);
      if(!['valido','abstencion'].includes(proof.status))continue;
      const raw=json(path.join(dir,'respuestas',key+'.json'));
      if(raw.measurements.Bn>0)branches.Bn_positivo++;if(raw.measurements.Cn>0)branches.Cn_positivo++;if(raw.measurements.I_principal>=3)branches.I_ge3++;if(raw.measurements.channels_of_isolation>=2)branches.aislamiento_multicanal++;
      if(proof.status==='abstencion'){const v=raw.measurements,k=v.main_set_id===null?'Evidencia: sin conjunto principal certificado':v.I_principal===1&&v.P===null?'Evidencia: P indeterminado':v.I_principal===2&&v.jerarquia_entre_dos===null?'Evidencia: jerarquía entre dos indeterminada':`Cobertura: I=${v.I_principal}, Bn=${v.Bn}, P=${v.P}, Cn=${v.Cn}, jerarquia=${v.jerarquia_entre_dos}`;reasons[k]=(reasons[k]||0)+1;}
      else if(!raw.not_applicable&&expectedScore(raw.measurements)!==raw.score)anchorContradictions++;
    }
  }
  write(path.join(dir,'auditoria.json'),{auditada_en:new Date().toISOString(),entradas:inputAudit,motivos_abstencion:reasons,cobertura_juicios:branches,contradicciones_numericas_de_ancla:anchorContradictions,limite:'No certifica equivalencia visual, selección principal, Bn, Cn ni P contra expertos.'});
  const reasonText=k=>k==='Evidencia: P indeterminado'
    ? 'No se pudo determinar si el elemento destacado corresponde a lo que la sección promueve (P)'
    : k==='Evidencia: sin conjunto principal certificado'
    ? 'No se pudo confirmar un conjunto principal de elementos equivalentes'
    : k==='Evidencia: jerarquía entre dos indeterminada'
    ? 'No se pudo determinar la jerarquía entre dos elementos destacados'
    : k==='Cobertura: I=0, Bn=0, P=null, Cn=0, jerarquia=null'
    ? 'La rúbrica no asigna nivel cuando no hay aislados ni contenido funcional tratado como publicidad (I=0, Bn=0)'
    : k==='Cobertura: I=2, Bn=0, P=null, Cn=0, jerarquia=true'
    ? 'La rúbrica no asigna nivel a dos aislados con jerarquía entre ellos'
    : k;
  let t=`# Resultado del piloto de G4\n\nG4 revisa qué elementos destacan visualmente en una página. ${s.ejecucion_completa?'Esta fase terminó':'Esta fase quedó incompleta'}: **${120-s.pendientes}/120 respuestas recibidas**, sobre 24 capturas con cinco evaluaciones independientes por página.\n\nHay **${applicable} puntajes y ${s.abstenciones} abstenciones**. Una abstención significa que las reglas o la evidencia no permitieron asignar un nivel. También hay ${s.no_aplicables} «no aplica» (NA), ${s.invalidas} respuestas inválidas, ${s.errores_tecnicos} errores técnicos actuales y ${s.pendientes} solicitudes pendientes. Se conserva ${s.intentos_tecnicos_archivados} intento técnico anterior; esta fase suma ${s.intentos_totales} intentos. La comparación con expertos sigue pendiente.\n\n## Puntajes obtenidos\n\nLos porcentajes usan los **${applicable} puntajes**. Las abstenciones, los NA y las respuestas inválidas se cuentan aparte. Para resumir una página se exige que tenga cinco respuestas válidas; se registra el nivel más frecuente y se conservan los empates.\n\n| Nivel | Evaluaciones | % de puntajes | Páginas con ese nivel más frecuente, sin empate |\n|---|---:|---:|---:|\n`;
  for(let i=0;i<5;i++)t+=`| ${i} | ${s.niveles_por_evaluacion[i]} | ${applicable?(100*s.niveles_por_evaluacion[i]/applicable).toFixed(1):'—'} | ${modes[i]} |\n`;
  t+=`\nAparecieron **${s.niveles_por_evaluacion.filter(n=>n>0).length} de los cinco niveles**. Hay ${modeNA} páginas cuyo resultado más frecuente es NA. Se mantuvieron los límites de puntuación registrados.\n\n## Cambios entre repeticiones\n\n`;
  t+=s.paginas_con_cinco_validas
    ? `De las ${s.paginas_con_cinco_validas} páginas con cinco respuestas válidas, **${s.paginas_estables_en_nivel} mantuvieron el mismo nivel**. El conjunto completo tiene 24 páginas.\n\n`
    : 'Todavía no hay páginas con cinco respuestas válidas, por lo que no se puede evaluar la estabilidad del nivel. El conjunto completo tiene 24 páginas.\n\n';
  t+=`En **${s.paginas_con_puntaje_y_abstencion.length} páginas** se alternó entre puntaje y abstención (${s.paginas_con_puntaje_y_abstencion.join(', ')||'ninguna'}). En **${s.paginas_con_seleccion_variable.length}** cambió el conjunto principal elegido (${s.paginas_con_seleccion_variable.join(', ')||'ninguna'}). Hay **${s.evidencia_insuficiente}/${s.respuestas_conformes}** respuestas con evidencia insuficiente, incluidas las abstenciones. Esta marca puede aparecer también en una respuesta que sí tiene puntaje.\n\nLa tabla conserva las respuestas recibidas de cada página. «Nivel más frecuente» y «proporción que lo repite» usan solo respuestas válidas. La diferencia de niveles es el mayor menos el menor; los niveles no se promedian. Una página que alterna puntajes y abstenciones no se considera estable.\n\n<details>\n<summary>Ver resultados por página</summary>\n\n| Página | Válidas | Abstenciones | Respuestas recibidas | Nivel(es) más frecuente(s) | Proporción que lo repite | Diferencia de niveles | Conjuntos principales distintos |\n|---|---:|---:|---|---|---:|---:|---:|\n`;
  for(const p of s.paginas)t+=`| ${p.id} | ${p.validas} | ${p.abstenciones} | ${p.todas_las_salidas.join(', ')||'—'} | ${p.modas.join(', ')||'—'} | ${p.fraccion_en_moda?.toFixed(2)??'—'} | ${p.rango_ordinal??'—'} | ${p.principales_distintos} |\n`;
  t+=`\n</details>\n\n## Por qué hubo abstenciones\n\nSe guardaron las abstenciones con su explicación. No se convierten en ceros ni en NA, y no se repiten para obtener otro resultado.\n\n| Motivo | Abstenciones |\n|---|---:|\n`;
  for(const [k,n] of Object.entries(reasons))t+=`| ${reasonText(k)} | ${n} |\n`;
  t+=`\nEn los datos originales quedan identificadas como \`ABSTENCION\`, con puntaje y regla vacíos, \`not_applicable=false\` y \`evidence_insufficient=true\`.\n\n## Qué se comprobó y qué falta\n\nLa medición 1.0.6 incluye grupos de dos elementos y todos los candidatos, corrige la mediana y comprueba la posición de las franjas. Las capturas originales y las medidas de los otros seis grupos se conservan. Los candidatos que propone el código todavía necesitan revisión visual: compartir etiqueta y contenedor no basta para que dos elementos sean equivalentes.\n\nLa diferencia de color RGB respecto al fondo es orientativa; no mide contraste WCAG ni legibilidad. También hay elementos parcialmente fuera de pantalla y relaciones de pertenencia que la captura no permite confirmar. Los identificadores permiten revisar cada hallazgo y evitar contarlo dos veces.\n\nEn las ${s.respuestas_conformes} respuestas hubo ${branches.Bn_positivo} casos de contenido funcional tratado como publicidad (Bn), ${branches.Cn_positivo} de contenido importante presentado como auxiliar (Cn), ${branches.I_ge3} con tres o más elementos aislados en el conjunto principal y ${branches.aislamiento_multicanal} con un elemento destacado por más de una característica visual. Las situaciones sin casos positivos quedan pendientes de probar.\n\nEl control automático encontró **${anchorContradictions} contradicciones numéricas** entre los puntajes y las reglas. La interpretación visual aún requiere revisión. Antes de evaluar ya se habían identificado tres situaciones sin regla de puntuación: ningún elemento destacado ni contenido funcional tratado como publicidad; dos elementos destacados con jerarquía; y un único destacado que corresponde a lo que la sección promueve, junto con contenido importante presentado como auxiliar.\n\n**Para cerrar G4 falta acordar las reglas incompletas con Camilo, revisar los casos dudosos y comparar con los casos dorados consensuados y los expertos.** Los cambios de reglas deben registrarse antes de una nueva fase, conservando los resultados de esta.\n\n<details>\n<summary>Configuración y registro de la ejecución</summary>\n\n| Dato | Valor |\n|---|---|\n| Modelo solicitado | ${m.model_id} |\n| Herramienta | ${m.cli_version} |\n| Esfuerzo de razonamiento | ${m.decoding.model_reasoning_effort} |\n| Medición | ${m.measurements_version} |\n| Protocolo | 0.1.0, con el cambio registrado el 7 de octubre |\n| Commit del ejecutor | \`${m.git_commit}\` |\n\nCada evaluación recibió la captura original, las medidas y la geometría. Usó una conversación nueva y las mismas instrucciones por página. La herramienta no expone temperatura ni top-p. ${m.base_instructions_sha256?'Se guardaron instrucciones base específicas de evaluación.':'Se usaron las instrucciones base incorporadas en la herramienta.'} El sistema añadió únicamente la identificación de la corrida (\`run\`) a una copia de la respuesta. La configuración y los hashes están en el manifiesto.\n\n`;
  if(m.base_instructions_sha256)t+=`La fase inicial se conserva en \`../g4-2026-10-07/\`: 34 respuestas, un puntaje y 33 abstenciones. La carpeta \`../g4-2026-10-07-v2/\` solo contiene una configuración registrada, sin solicitudes ejecutadas. La fase final cambió el formato, las instrucciones base y el esfuerzo a low; las diferencias entre fases no pueden atribuirse a uno solo de esos cambios. Los datos se mantienen separados.\n\n`;
  else t+='Esta es la fase inicial incompleta. Su registro y respuestas se conservan separados de la ejecución final.\n\n';
  if(s.intentos_tecnicos_archivados)t+='El fallo técnico y su reanudación se conservan en `intentos/` y `REANUDACION-1.json`. El intento falló antes de producir un juicio; las respuestas ya recibidas no se repitieron.\n\n';
  t+='</details>\n\n[Datos por evaluación](evaluaciones.csv), [resumen por página](resumen.csv), [revisión de datos](auditoria.json), [configuración](manifiesto.json) y [plan e historial](../../docs/PILOTO-G4-07OCT.md). Para analizar puntajes, filtrar `estado=valido`. Las sesiones, respuestas originales y registros de ejecución se conservan.\n';
  fs.writeFileSync(path.join(dir,'INFORME.md'),t);return s;
}
if(require.main===module)report(path.resolve(__dirname,'..',process.argv[2]||'pilotos/g4-2026-10-07-v3'));
module.exports={analyze,report};
