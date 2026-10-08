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
  let t=`# Resultado del piloto real de G4\n\n${s.ejecucion_completa?'Ejecución terminada':'Ejecución parcial'}. **${120-s.pendientes}/120 solicitudes terminadas**, sobre 24 capturas × cinco contextos independientes. Hay ${s.validas} salidas puntuables/NA, ${s.abstenciones} abstenciones, ${s.invalidas} respuestas inválidas, ${s.errores_tecnicos} errores técnicos y ${s.pendientes} pendientes. Intentos técnicos históricos preservados: **${s.intentos_tecnicos_archivados}**; solicitudes totales de esta fase: **${s.intentos_totales}**. Una ejecución terminada no equivale a una rúbrica validada.\n\n## Configuración y procedencia\n\nModelo solicitado **${m.model_id}**, ${m.cli_version}, razonamiento **${m.decoding.model_reasoning_effort}**; medición **${m.measurements_version}**, protocolo 0.1.0 y desviación fechada del 7 de octubre. Código registrado: \`${m.git_commit}\`. Temperatura y top-p no están expuestos. Se suministra solo screenshot, cifras y geometría; no wireframe, juicios humanos ni resultados previos. G4 no tiene comparación entre canales. Formato e instrucciones base se conservan en el manifiesto; ${m.base_instructions_sha256 ? "se usan instrucciones explícitas de evaluación, fijadas por hash" : "se usa la base de instrucciones incorporada del runtime"}. Cada repetición tiene contexto nuevo y prompt idéntico por página; la infraestructura añade únicamente run.\n\n## Distribución ordinal\n\nDenominador: **${applicable} puntajes aplicables**. Los ${s.no_aplicables} NA, ${s.abstenciones} abstenciones y ${s.invalidas} inválidos se cuentan aparte. Las páginas contadas por moda en esta tabla exigen cinco salidas válidas y una moda única; no se fuerza desempate.\n\n| Nivel | Evaluaciones | % de aplicables | Páginas con moda única |\n|---|---:|---:|---:|\n`;
  for(let i=0;i<5;i++)t+=`| ${i} | ${s.niveles_por_evaluacion[i]} | ${applicable?(100*s.niveles_por_evaluacion[i]/applicable).toFixed(1):'—'} | ${modes[i]} |\n`;
  t+=`\nSe observaron ${s.niveles_por_evaluacion.filter(n=>n>0).length} de los cinco niveles; modas NA: ${modeNA}. No se mueven umbrales para repartir la escala.\n\n## Estabilidad y abstenciones\n\n**${s.paginas_estables_en_nivel}/${s.paginas_con_cinco_validas}** páginas con cinco salidas válidas mantuvieron su nivel; el total del conjunto es 24. Esta estabilidad no es acuerdo interexperto. Páginas que alternan puntaje y abstención: **${s.paginas_con_puntaje_y_abstencion.length}** (${s.paginas_con_puntaje_y_abstencion.join(", ") || "ninguna"}); selección principal variable: **${s.paginas_con_seleccion_variable.length}** (${s.paginas_con_seleccion_variable.join(", ") || "ninguna"}). Evidencia insuficiente: **${s.evidencia_insuficiente}/${s.respuestas_conformes}** salidas conformes, incluidas abstenciones.\n\n| Página | Válidas | Abstenciones | Cinco salidas conformes | Moda(s) de salidas válidas | Fracción modal | Rango ordinal | Principales distintos |\n|---|---:|---:|---|---|---:|---:|---:|\n`;
  for(const p of s.paginas)t+=`| ${p.id} | ${p.validas} | ${p.abstenciones} | ${p.todas_las_salidas.join(', ')||'—'} | ${p.modas.join(', ')||'—'} | ${p.fraccion_en_moda?.toFixed(2)??'—'} | ${p.rango_ordinal??'—'} | ${p.principales_distintos} |\n`;
  t+=`\nEn la tabla por página, moda, fracción modal y rango usan solo salidas válidas; no incluyen abstenciones ni permiten llamar estable a una página que alterna puntaje y abstención. El rango numérico tampoco incluye NA.\n\nLas abstenciones se conservan con score y trigger nulos, not_applicable=false. No se convierten en NA ni en cero, no entran en el histograma y no se repiten para obtener un nivel.\n\n| Motivo de abstención: cobertura o evidencia | Abstenciones |\n|---|---:|\n`;
  for(const [k,n] of Object.entries(reasons))t+=`| ${k} | ${n} |\n`;
  t+=`\n## Auditoría y alcance\n\nLa medición 1.0.6 corrige la omisión de pares de dos, los recortes de conjuntos/miembros/candidatos, la mediana par y la posición de franja. Conserva las capturas selladas y los otros seis grupos. Los conjuntos por etiqueta y padre retenido son candidatos: no certifican equivalencia visual. El proxy RGB no es contraste WCAG ni legibilidad; cajas parciales y raíces virtuales se declaran como límites. Los ids permiten verificar pertenencia y evitar doble conteo por anidamiento.\n\nCobertura de juicios en ${s.respuestas_conformes} salidas conformes: Bn positivo = ${branches.Bn_positivo}; Cn positivo = ${branches.Cn_positivo}; tres o más aislados principales = ${branches.I_ge3}; aislamiento multicanal = ${branches.aislamiento_multicanal}. Una rama sin casos positivos no queda validada por este conjunto.\n\nContradicciones numéricas de ancla detectadas en salidas puntuables: ${anchorContradictions}. Este control no valida los juicios visuales. La cobertura incompleta de las anclas se declaró **antes** de puntuar: I=0 sin Bn; I=2 con jerarquía; I=1/P verdadero con Cn positivo. Si aparecen, se reportan sin inventar reglas.\n\n**G4 no queda cerrado metodológicamente**: faltan consenso de casos dorados, referencia experta y resolución prospectiva de combinaciones sin ancla. Una revisión de niveles debe discutirse y registrarse antes de otra fase, sin modificar estas respuestas ni el protocolo histórico. No se afirma aprobación ética ni se fabrican juicios humanos.\n\nLa fase inicial incompleta permanece en \`../g4-2026-10-07/\` (34 respuestas: un puntaje y 33 abstenciones); \`../g4-2026-10-07-v2/\` conserva únicamente un registro sin solicitudes. No se combinan sus datos con esta configuración. La fase final también registra formato compacto, instrucciones base y esfuerzo low; los cambios entre fases no se atribuyen a un solo factor. El fallo de uso y la reanudación se conservan en \`intentos/\` y \`REANUDACION-1.json\`, si están presentes.\n\n[Datos por evaluación](evaluaciones.csv), [resumen por página](resumen.csv), [auditoría](auditoria.json), [manifiesto](manifiesto.json) y [registro previo](../../docs/PILOTO-G4-07OCT.md). Filtrar estado=valido para analizar niveles; ABSTENCION identifica abstención explícita. Los ids de sesión, respuestas originales, trazas y hashes se conservan.\n`;
  fs.writeFileSync(path.join(dir,'INFORME.md'),t);return s;
}
if(require.main===module)report(path.resolve(__dirname,'..',process.argv[2]||'pilotos/g4-2026-10-07-v3'));
module.exports={analyze,report};
