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

function buildMarkdown(rubrics) {
  const stamp = new Date().toISOString().slice(0, 10);
  const head = [
    '# Apéndice · Las siete rúbricas de constructo',
    '',
    'Este apéndice se genera automáticamente desde los archivos `SKILL.md` del',
    'repositorio del plugin, que son la fuente única del instrumento. No se edita',
    'a mano: una copia editable aparte derivaría de lo que el sistema ejecuta, y el',
    'protocolo congelado dejaría de describir la medición real.',
    '',
    `Generado el ${stamp} desde \`skills/\`.`,
    '',
    '---',
    '',
  ].join('\n');

  const body = rubrics.map(r => {
    // El cuerpo ya arranca con "# Gn · ...". Se degrada un nivel para que quede
    // bajo el encabezado del apéndice.
    const demoted = r.body.replace(/^(#{1,5}) /gm, (_, h) => '#'.repeat(h.length + 1) + ' ');
    return demoted.trim();
  }).join('\n\n---\n\n');

  return head + body + '\n';
}

// ---------------------------------------------------------------- DOCX

function buildDocx(rubrics, outPath) {
  let docx;
  try {
    docx = require('docx');
  } catch (e) {
    return { ok: false, reason: 'el paquete npm "docx" no está instalado (npm i docx)' };
  }
  const {
    Document, Packer, Paragraph, TextRun, HeadingLevel,
    AlignmentType, convertInchesToTwip,
  } = docx;

  const FONT = 'Times New Roman';
  const R = (arr, size = 22) => arr.map(x => new TextRun({
    text: x.t, bold: !!x.b, italics: !!x.i, font: x.m ? 'Consolas' : FONT, size,
  }));

  // Convierte los tramos en negrita de Markdown (**x**) y código (`x`) en runs.
  function inline(text) {
    const out = [];
    const re = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
    let last = 0, m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) out.push({ t: text.slice(last, m.index) });
      const tok = m[0];
      if (tok.startsWith('**')) out.push({ t: tok.slice(2, -2), b: true });
      else if (tok.startsWith('`')) out.push({ t: tok.slice(1, -1), m: true });
      else out.push({ t: tok.slice(1, -1), i: true });
      last = m.index + tok.length;
    }
    if (last < text.length) out.push({ t: text.slice(last) });
    return out.length ? out : [{ t: text }];
  }

  const children = [];
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 120 },
    children: R([{ t: 'Apéndice · Las siete rúbricas de constructo', b: true }], 30),
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.JUSTIFIED, spacing: { after: 300 },
    children: R([{
      t: 'Generado desde los archivos SKILL.md del repositorio del plugin, que son la '
       + 'fuente única del instrumento. No se edita a mano: una copia editable aparte '
       + 'derivaría de lo que el sistema ejecuta, y el protocolo congelado dejaría de '
       + 'describir la medición real. Generado el ' + new Date().toISOString().slice(0, 10) + '.',
      i: true,
    }], 20),
  }));

  for (const r of rubrics) {
    for (const line of r.body.split('\n')) {
      const t = line.trimEnd();
      if (!t.trim()) continue;

      const h = /^(#{1,4})\s+(.*)$/.exec(t);
      if (h) {
        const lvl = h[1].length;
        children.push(new Paragraph({
          heading: lvl === 1 ? HeadingLevel.HEADING_1
                 : lvl === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3,
          spacing: { before: lvl === 1 ? 360 : 220, after: 120 },
          children: R(inline(h[2]), lvl === 1 ? 26 : lvl === 2 ? 23 : 22),
        }));
        continue;
      }

      // Filas de tabla Markdown: se emiten como texto tabulado, legible en Word
      // sin construir una tabla real (el apéndice se lee, no se opera).
      if (/^\|/.test(t)) {
        if (/^\|[\s:|-]+\|$/.test(t)) continue; // separador
        const cells = t.split('|').slice(1, -1).map(c => c.trim()).filter(Boolean);
        if (!cells.length) continue;
        children.push(new Paragraph({
          spacing: { after: 60 }, indent: { left: convertInchesToTwip(0.3) },
          children: R(inline(cells.join('  ·  ')), 20),
        }));
        continue;
      }

      const li = /^[-*]\s+(.*)$/.exec(t);
      if (li) {
        children.push(new Paragraph({
          spacing: { after: 80 }, indent: { left: convertInchesToTwip(0.4), hanging: convertInchesToTwip(0.18) },
          children: R([{ t: '— ' }].concat(inline(li[1]))),
        }));
        continue;
      }

      const num = /^(\d+)\.\s+(.*)$/.exec(t);
      if (num) {
        children.push(new Paragraph({
          spacing: { after: 80 }, indent: { left: convertInchesToTwip(0.4), hanging: convertInchesToTwip(0.22) },
          alignment: AlignmentType.JUSTIFIED,
          children: R([{ t: num[1] + '.  ', b: true }].concat(inline(num[2]))),
        }));
        continue;
      }

      children.push(new Paragraph({
        alignment: AlignmentType.JUSTIFIED, spacing: { after: 120, line: 264 },
        children: R(inline(t)),
      }));
    }
  }

  const doc = new Document({
    styles: { default: {
      heading1: { run: { color: '000000', font: FONT } },
      heading2: { run: { color: '000000', font: FONT } },
      heading3: { run: { color: '000000', font: FONT } },
    }},
    sections: [{
      properties: { page: {
        size: { width: 12240, height: 15840 },
        margin: {
          top: convertInchesToTwip(1), bottom: convertInchesToTwip(1),
          left: convertInchesToTwip(1.1), right: convertInchesToTwip(1.1),
        },
      }},
      children,
    }],
  });

  return Packer.toBuffer(doc).then(buf => {
    fs.writeFileSync(outPath, buf);
    return { ok: true };
  });
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
  fs.writeFileSync(mdOut, md);
  console.log(`markdown  -> ${path.relative(ROOT, mdOut)}  (${md.split('\n').length} líneas)`);

  const res = await buildDocx(rubrics, docxOut);
  if (res.ok) console.log(`word      -> ${path.relative(ROOT, docxOut)}`);
  else console.log(`word      -> omitido: ${res.reason}`);

  console.log(`rúbricas  -> ${rubrics.length}/7  (${rubrics.map(r => r.meta.metadata && r.meta.metadata.group).join(' ')})`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
