#!/usr/bin/env node
'use strict';

/**
 * build-appendix.js — genera el apéndice de rúbricas del documento de tesis
 * a partir de los SKILL.md, que son la fuente única.
 *
 * La rúbrica es el instrumento y el instrumento es lo que corre. Mantener una
 * copia editable aparte garantizaría que las dos derivaran, y el protocolo
 * congelado dejaría de describir lo que el sistema hace. Por eso el documento
 * se genera y no se escribe.
 *
 *   node scripts/build-appendix.js [--out docs/apendice-rubricas.docx]
 *
 * Salidas:
 *   docs/apendice-rubricas.docx   apéndice listo para adjuntar al documento
 *   docs/apendice-rubricas.md     el mismo contenido en Markdown
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const VERSION = require('../release/version.json');

const ROOT = path.resolve(__dirname, '..');
const SKILLS = path.join(ROOT, 'skills');
const DOCS = path.join(ROOT, 'docs');

const ORDER = [
  'g1-agrupacion-perceptual',
  'g2-arquitectura-decision',
  'g3-capacidad-segmentacion',
  'g4-saliencia-visual',
  'g5-posicion-progreso',
  'g6-economia-convencion',
  'g7-targeting-motor',
];

/** Separa el frontmatter YAML del cuerpo. Sin dependencias: el frontmatter de
 *  estos archivos es plano y no necesita un parser completo. */
function splitFrontmatter(src) {
  if (!src.startsWith('---')) return { meta: {}, body: src };
  const end = src.indexOf('\n---', 3);
  if (end === -1) return { meta: {}, body: src };
  const raw = src.slice(3, end).trim();
  const body = src.slice(end + 4).replace(/^\n+/, '');
  const meta = {};
  let currentKey = null;
  for (const line of raw.split('\n')) {
    const top = /^([a-zA-Z_-]+):\s*(.*)$/.exec(line);
    const nested = /^\s+([a-zA-Z_-]+):\s*(.*)$/.exec(line);
    if (top) {
      currentKey = top[1];
      meta[currentKey] = top[2] === '' ? {} : top[2].replace(/^["']|["']$/g, '');
    } else if (nested && currentKey && typeof meta[currentKey] === 'object') {
      meta[currentKey][nested[1]] = nested[2].replace(/^["']|["']$/g, '');
    }
  }
  return { meta, body };
}

function read(slug) {
  const p = path.join(SKILLS, slug, 'SKILL.md');
  if (!fs.existsSync(p)) throw new Error(`falta ${p}`);
  const { meta, body } = splitFrontmatter(fs.readFileSync(p, 'utf8'));
  return { slug, meta, body, path: p };
}

// ---------------------------------------------------------------- Markdown

function normalizarTablas(texto) {
  const lineas = texto.split('\n');
  for (let i=0;i<lineas.length;i++) {
    if (!lineas[i].trim().startsWith('|')) continue;
    const inicio = i;
    while (i+1<lineas.length && lineas[i+1].trim().startsWith('|')) i++;
    const celdas = l => l.trim().slice(1,-1).split(/(?<!\\)\|/).map(c => c.trim());
    const cabecera = celdas(lineas[inicio]);
    const datos = lineas.slice(inicio+2,i+1).map(celdas);
    // Algunas tablas antiguas tienen una celda vacía de más en la cabecera.
    if (cabecera[0] === '' && datos.length && datos.every(f => f.length === cabecera.length-1)) {
      lineas[inicio] = '| ' + cabecera.slice(1).join(' | ') + ' |';
      lineas[inicio+1] = '| ' + cabecera.slice(1).map(() => '---').join(' | ') + ' |';
    }
  }
  return lineas.join('\n');
}

function buildMarkdown(rubrics) {
  const head = [
    '# Reglas de los siete grupos',
    '',
    'Este documento reúne las reglas que usa el código actual. Sale de los siete',
    'archivos `SKILL.md`; el texto de las rúbricas se conserva y no se edita aquí.',
    '',
    'Entrega ' + VERSION.version + '. Edición ' + VERSION.fecha + '. ' + VERSION.estado + '.',
    '',
    'Usamos niveles de 0 a 4. «No aplica» y «no se puede puntuar» conservan su razón',
    'y no se cuentan como ceros. G1 sigue marcado como no interpretable v1 por su',
    'falta de diferencias entre páginas. Las reglas propuestas de G4 y G5 no se',
    'presentan como acuerdos nuevos con Camilo ni como validación experta.',
    '',
    'El modo de referencia prepara 35 solicitudes por página y entorno; el de comparación,',
    '65, con cinco repeticiones. G4 solo usa screenshot. Los otros seis grupos tienen',
    'dos canales en comparación; se declara el apoyo textual de screenshot cuando existe.',
    '',
    'El protocolo conserva la versión ' + VERSION.protocolo + '; la ejecución usa ' + VERSION.ejecucion +
      ' y el perfil ' + VERSION.perfil + '. Son versiones de cosas distintas.',
    'Las huellas de las fuentes están en `apendice-rubricas.fuentes.json`.',
    '',
    '---',
    '',
  ].join('\n');

  const body = rubrics.map(r => {
    // El cuerpo ya arranca con "# Gn · ...". Se degrada un nivel para que quede
    // bajo el encabezado del apéndice.
    const demoted = r.body.replace(/^(#{1,5}) /gm, (_, h) => '#'.repeat(h.length + 1) + ' ');
    return normalizarTablas(demoted).trim();
  }).join('\n\n---\n\n');

  return head + body + '\n';
}

function sourceManifest(rubrics) {
  return { version_entrega:VERSION.version,fecha:VERSION.fecha,
    fuentes:rubrics.map(r => ({grupo:r.meta.metadata.group,archivo:path.relative(ROOT,r.path).replace(/\\/g,'/'),
      sha256:crypto.createHash('sha256').update(fs.readFileSync(r.path)).digest('hex')})) };
}

// ---------------------------------------------------------------- DOCX

async function buildDocx(rubrics, outPath) {
  let docx;
  try { docx = require(process.env.DOCX_MODULE_PATH || 'docx'); }
  catch (_) { throw Error('Falta docx. Instalar las dependencias con npm ci.'); }
  const {Document,Packer,Paragraph,TextRun,HeadingLevel,AlignmentType,Table,TableRow,TableCell,
    WidthType,BorderStyle,VerticalAlign,Footer,PageNumber} = docx;
  const fuente = 'Times New Roman', ancho = 9072;
  const texto = (value,size=23,bold=false) => {
    const partes = String(value).split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
    return partes.filter(Boolean).map(p => new TextRun({
      text:p.startsWith('**') ? p.slice(2,-2).replace(/`/g,'') : p.startsWith('`') || p.startsWith('*') ? p.slice(1,-1) : p,
      bold:bold || p.startsWith('**'),italics:p.startsWith('*') && !p.startsWith('**'),
      font:p.startsWith('`') ? 'Consolas' : fuente,size,
    }));
  };
  const children = [], lineas = buildMarkdown(rubrics).split('\n');
  const borde = {style:BorderStyle.SINGLE,size:4,color:'D9D9D9'};
  const parrafo = (s,opciones={}) => new Paragraph({spacing:{after:100,line:276},children:texto(s),...opciones});
  for (let i=0;i<lineas.length;i++) {
    const t = lineas[i].trim();
    if (!t || t === '---') continue;
    if (t.startsWith('```')) {
      for (i++;i<lineas.length && !lineas[i].trim().startsWith('```');i++) {
        children.push(new Paragraph({spacing:{after:0,line:240},
          children:[new TextRun({text:lineas[i],font:'Consolas',size:20})]}));
      }
      continue;
    }
    if (t.startsWith('|')) {
      const filas = [];
      while (i<lineas.length && lineas[i].trim().startsWith('|')) {
        const l = lineas[i++].trim();
        if (/^\|[\s:|-]+\|$/.test(l)) continue;
        const cells = l.slice(1,-1).split(/(?<!\\)\|/).map(c => c.trim().replace(/\\\|/g,'|'));
        if (cells.some(Boolean)) filas.push(cells);
      }
      i--;
      const n = Math.max(...filas.map(f => f.length));
      const pesos = Array.from({length:n},(_,c) => Math.sqrt(Math.max(8,...filas.map(f => (f[c] || '').length))));
      const suma = pesos.reduce((a,b) => a+b,0);
      const minimo = 1300, disponible = ancho-minimo*n;
      const widths = pesos.map(p => minimo+Math.round(disponible*p/suma));
      widths[n-1] += ancho - widths.reduce((a,b) => a+b,0);
      const tieneCabecera = !/^\|\s*\|\s*\|$/.test(t);
      children.push(new Table({width:{size:ancho,type:WidthType.DXA},columnWidths:widths,
        rows:filas.map((fila,r) => new TableRow({tableHeader:tieneCabecera && r===0,cantSplit:true,
          children:Array.from({length:n},(_,c) => new TableCell({
            width:{size:widths[c],type:WidthType.DXA},
            borders:{top:borde,bottom:borde,left:borde,right:borde},
            shading:tieneCabecera && r===0 ? {fill:'EDEDED'} : undefined,
            margins:{top:100,bottom:100,left:110,right:110},verticalAlign:VerticalAlign.CENTER,
            children:[new Paragraph({spacing:{after:20,line:258},
              alignment:c===0 && (fila[c] || '').length<12 ? AlignmentType.CENTER : AlignmentType.LEFT,
              children:texto(fila[c] || '',21,tieneCabecera && r===0)})],
          }))})),
      }));
      children.push(parrafo(''));
      continue;
    }
    const h = /^(#{1,6})\s+(.*)$/.exec(t);
    if (h) {
      const titulo = h[2].replace(/ · /g,' ');
      const grupo = /^G[1-7]\s/.test(titulo) && h[1].length===2;
      children.push(new Paragraph({children:texto(titulo,h[1].length===1 ? 32 : grupo ? 28 : 25),
        style:h[1].length===1 ? 'Title' : undefined,
        heading:h[1].length===1 ? undefined : grupo ? HeadingLevel.HEADING_1 : HeadingLevel.HEADING_2,
        pageBreakBefore:grupo,keepNext:true,spacing:{before:160,after:120}}));
      continue;
    }
    if (/^[-*]\s/.test(t) || /^\d+\.\s/.test(t)) {
      children.push(parrafo(t.replace(/^[-*]\s/,'- '),{indent:{left:220,hanging:160}}));
      continue;
    }
    let contenido = t;
    while (i+1<lineas.length && lineas[i+1].trim() && !/^(#|[-*]\s|\d+\.\s|\||```|---)/.test(lineas[i+1].trim())) {
      contenido += ' ' + lineas[++i].trim();
    }
    children.push(parrafo(contenido.replace(/^>\s?/,'')));
  }
  const doc = new Document({creator:'Equipo de tesis UX',title:'Reglas de los siete grupos',
    subject:'Entrega ' + VERSION.version,
    styles:{default:{
      document:{run:{font:fuente,size:23,color:'000000'}},
      title:{run:{font:fuente,size:32,color:'000000',bold:true}},
      heading1:{run:{font:fuente,size:28,color:'000000'}},
      heading2:{run:{font:fuente,size:25,color:'000000'}},
    }},
    sections:[{properties:{page:{size:{width:12240,height:15840},margin:{top:1440,bottom:1440,left:1584,right:1584}}},
      footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,
        children:[new TextRun({text:'Reglas '+VERSION.version+'  -  ',font:fuente,size:18}),
          new TextRun({children:[PageNumber.CURRENT],font:fuente,size:18})]})]})},children}],
  });
  fs.writeFileSync(outPath,await Packer.toBuffer(doc));
  return {ok:true};
}

// ---------------------------------------------------------------- main

async function main() {
  const outArg = process.argv.indexOf('--out');
  const docxOut = outArg !== -1 ? process.argv[outArg + 1]
                                : path.join(DOCS, 'apendice-rubricas.docx');
  fs.mkdirSync(DOCS, { recursive: true });

  const rubrics = ORDER.map(read);

  const md = buildMarkdown(rubrics);
  const mdOut = docxOut.replace(/\.docx$/, '.md');
  const sourceOut = docxOut.replace(/\.docx$/, '.fuentes.json');
  const fuentes = JSON.stringify(sourceManifest(rubrics),null,2) + '\n';
  if (process.argv.includes('--check')) {
    if (fs.readFileSync(mdOut,'utf8') !== md || fs.readFileSync(sourceOut,'utf8') !== fuentes) throw Error('El apéndice no coincide con las rúbricas actuales. Regenerar las reglas.');
    console.log('Apéndice y fuentes coinciden con las siete rúbricas actuales.');
    return;
  }
  fs.mkdirSync(path.dirname(docxOut),{recursive:true});
  fs.writeFileSync(mdOut, md);
  fs.writeFileSync(sourceOut,fuentes);
  console.log(`markdown  -> ${path.relative(ROOT, mdOut)}  (${md.split('\n').length} líneas)`);

  const res = await buildDocx(rubrics, docxOut);
  if (res.ok) console.log(`word      -> ${path.relative(ROOT, docxOut)}`);
  else console.log(`word      -> omitido: ${res.reason}`);

  console.log(`rúbricas  -> ${rubrics.length}/7  (${rubrics.map(r => r.meta.metadata && r.meta.metadata.group).join(' ')})`);
}

if (require.main === module) main().catch(e => { console.error(e.message); process.exit(1); });
module.exports = {ORDER,read,buildMarkdown,sourceManifest,normalizarTablas};
