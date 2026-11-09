#!/usr/bin/env node
'use strict';

/**
 * build-procedencia.js — genera el capítulo 8 del documento de tesis, «Provenance
 * of the Eighteen Laws», desde docs/procedencia-leyes.md, que es la fuente única.
 *
 * Es el mismo argumento que build-appendix.js: una copia editable aparte deriva,
 * y entonces el capítulo afirma una procedencia que las fichas no sostienen.
 * Acá pesa más todavía, porque lo que este capítulo publica son citas: un
 * párrafo redactado a mano sobre una ficha que nadie abrió es exactamente la
 * falta que CLAUDE.md prohíbe.
 *
 *   node scripts/build-procedencia.js
 *   node scripts/build-procedencia.js --out ~/git/trabajo-de-grado/chapters/08-provenance.tex
 *
 * QUÉ HACE CON LOS HUECOS. No los rellena ni los esconde. Una ficha sin abrir
 * sale del generador como un \pendiente rojo que nombra los campos que faltan y
 * a quién le toca. Una ficha a medias sale con lo escrito y un \pendiente con el
 * resto. El capítulo compila en los dos casos, y se ve lo que falta.
 *
 * QUÉ NO ESCAPA. Nada. El contenido de las fichas es LaTeX y entra literal,
 * porque su trabajo es citar (\citet{...}). Escapar automáticamente volvería
 * imposible lo único que este capítulo hace.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'docs');
const FUENTE = path.join(DOCS, 'procedencia-leyes.md');

const RESPONSABLES = { D: 'David', M: 'Mateo', JF: 'Juan Francisco' };

const GRUPOS_EN = {
  G1: 'Perceptual grouping',
  G2: 'Choice architecture',
  G3: 'Capacity and segmentation',
  G4: 'Visual salience',
  G5: 'Position and progress in a sequence',
  G6: 'Economy and convention',
  G7: 'Motor targeting',
};

/** Campo del .md -> encabezado en el capítulo. El orden es el del capítulo. */
const CAMPOS = [
  ['fuente primaria', 'Primary source'],
  ['verificación', 'Verified by'],
  ['hallazgo y condiciones', 'The finding and its conditions'],
  ['formulación divulgativa', 'Popularised formulation'],
  ['operacionalización', 'Our operationalisation'],
  ['salto declarado', 'The declared gap'],
];

/** Secciones de capítulo, en orden, con su título en inglés. */
const SECCIONES = [
  ['por qué se separan las tres capas', 'Why Three Layers Are Kept Apart'],
  ['las seis categorías de distancia', 'The Six Categories of Gap'],
  ['las tres entradas sin publicación primaria', 'The Three Entries with No Primary Publication'],
];

// ------------------------------------------------------------------- parseo

/** Trocea un bloque en sus subsecciones `### nombre`. Devuelve nombre -> prosa. */
function subsecciones(bloque) {
  const out = {};
  const partes = bloque.split(/^### +/m).slice(1);
  for (const p of partes) {
    const salto = p.indexOf('\n');
    const nombre = (salto === -1 ? p : p.slice(0, salto)).trim();
    out[nombre] = (salto === -1 ? '' : p.slice(salto + 1)).replace(/^-{3,}\s*$/gm, '').trim();
  }
  return out;
}

function parsear(src) {
  const texto = src.replace(/\r\n/g, '\n');

  // Bloques de primer nivel. El encabezado `# ...` y las instrucciones quedan
  // fuera: lo que el generador publica son las secciones y las fichas.
  const bloques = texto.split(/^## +/m).slice(1).map((b) => {
    const salto = b.indexOf('\n');
    return { titulo: (salto === -1 ? b : b.slice(0, salto)).trim(), cuerpo: salto === -1 ? '' : b.slice(salto + 1) };
  });

  const secciones = {};
  const fichas = [];

  for (const b of bloques) {
    if (/^Secciones de cap/i.test(b.titulo)) {
      Object.assign(secciones, subsecciones(b.cuerpo));
      continue;
    }
    const m = /^(L\d{2})\s*·\s*(.+?)\s+—\s+(.+)$/.exec(b.titulo);
    if (!m) continue;

    const meta = {};
    for (const l of b.cuerpo.split(/^### /m)[0].split('\n')) {
      const kv = /^([a-z_]+):\s*(.*)$/.exec(l.trim());
      if (kv) meta[kv[1]] = kv[2].trim();
    }
    fichas.push({
      id: m[1], ley_es: m[2], ley_en: m[3],
      grupo: meta.grupo || '',
      responsable: meta.responsable || '',
      sinPublicacion: /^s[ií]$/i.test(meta.sin_publicacion_primaria || ''),
      campos: subsecciones(b.cuerpo),
    });
  }
  return { secciones, fichas };
}

// -------------------------------------------------------------------- LaTeX

const pendiente = (t) => '\\pendiente{' + t + '}';

function encabezado(stamp, abiertas, total) {
  return [
    '% ---------------------------------------------------------------------------',
    '% GENERADO. No editar a mano.',
    '%   fuente:   docs/procedencia-leyes.md   (repositorio ux-laws-plugin)',
    '%   comando:  npm run procedencia -- --out chapters/08-provenance.tex',
    '%   generado: ' + stamp + '   ·   fichas abiertas: ' + abiertas + '/' + total,
    '%',
    '% Una corrección escrita acá se pierde en la siguiente generación. Va en la',
    '% ficha, que es lo que el capítulo publica.',
    '% ---------------------------------------------------------------------------',
    '',
    '\\chapter{Provenance of the Eighteen Laws}',
    '\\label{ch:provenance}',
    '',
    'Chapter~\\ref{sec:framework} states the selection criteria and lists the eighteen laws with',
    'their primary sources in Table~\\ref{tab:laws}. This chapter does not repeat that table. It',
    'gives, law by law, the material the table can only summarise: the original finding and the',
    'conditions under which it was obtained, the popularised formulation, our operationalisation,',
    'and the distance between them.',
    '',
    'This chapter is \\textbf{generated} from the provenance records kept in the plugin repository,',
    'in the same way as the rubric appendix is generated from the \\texttt{SKILL.md} files. It is',
    'not written by hand, and that is a requirement rather than a convenience: what this chapter',
    'publishes is citations, and a paragraph composed over a record that nobody opened is exactly',
    'the fabrication the project forbids. A record that is not yet open appears below as a visible',
    'gap naming what is missing and who is responsible for it.',
    '',
  ].join('\n');
}

function renderSeccion(titulo, prosa) {
  const out = ['\\section{' + titulo + '}', '\\label{sec:prov-' + titulo.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '}', ''];
  // Comillas de LaTeX a mano: el preámbulo del documento no carga csquotes, así
  // que \enquote no existe y un capítulo generado con él no compilaría.
  out.push(prosa || pendiente("section ``" + titulo + "'' not yet written; it is written in the "
    + "``Secciones de capítulo'' block of \\texttt{docs/procedencia-leyes.md}, not here"));
  out.push('');
  return out.join('\n');
}

function renderFicha(f) {
  const quien = RESPONSABLES[f.responsable] || f.responsable || 'sin responsable asignado';
  const llenos = CAMPOS.filter(([k]) => (f.campos[k] || '').trim());
  const vacios = CAMPOS.filter(([k]) => !(f.campos[k] || '').trim());

  const out = [
    '\\subsection{' + f.ley_en + '}',
    '\\label{law:' + f.id.toLowerCase() + '}',
    '',
  ];

  if (f.sinPublicacion) {
    out.push('\\noindent\\textit{No primary publication. See Section~\\ref{sec:prov-the-three-entries-with-no-primary-publication}.}');
    out.push('');
  }

  for (const [clave, titulo] of llenos) {
    out.push('\\paragraph{' + titulo + '}');
    out.push(f.campos[clave].trim());
    out.push('');
  }

  if (vacios.length) {
    out.push(pendiente('record ' + f.id + ' (' + f.ley_en + ') '
      + (llenos.length ? 'is incomplete' : 'has not been opened')
      + ' --- ' + quien + ' writes it in \\texttt{docs/procedencia-leyes.md}. Missing: '
      + vacios.map(([, t]) => t.toLowerCase()).join(', ') + '.'));
    out.push('');
  }
  return out.join('\n');
}

function construir({ secciones, fichas }) {
  const abiertas = fichas.filter((f) => CAMPOS.every(([k]) => (f.campos[k] || '').trim())).length;
  const partes = [encabezado(new Date().toISOString().slice(0, 10), abiertas, fichas.length)];

  for (const [clave, titulo] of SECCIONES) partes.push(renderSeccion(titulo, secciones[clave]));

  let grupoActual = null;
  for (const f of fichas) {
    if (f.grupo !== grupoActual) {
      grupoActual = f.grupo;
      partes.push('\\section{' + f.grupo + ' \\textperiodcentered{} ' + (GRUPOS_EN[f.grupo] || f.grupo) + '}');
      partes.push('');
    }
    partes.push(renderFicha(f));
  }
  return { tex: partes.join('\n').replace(/\n{3,}/g, '\n\n') + '\n', abiertas };
}

// --------------------------------------------------------------------- main

function main(argv) {
  const i = argv.indexOf('--out');
  const salida = i !== -1 && argv[i + 1]
    ? path.resolve(argv[i + 1].replace(/^~(?=[/\\])/, process.env.HOME || process.env.USERPROFILE || '~'))
    : path.join(DOCS, 'capitulo-08-procedencia.tex');

  if (!fs.existsSync(FUENTE)) {
    console.error('falta ' + path.relative(ROOT, FUENTE));
    return 1;
  }
  const datos = parsear(fs.readFileSync(FUENTE, 'utf8'));

  if (datos.fichas.length !== 18) {
    console.error('el archivo tiene ' + datos.fichas.length + ' fichas y tienen que ser 18. '
      + 'Una ficha de menos deja una ley sin procedencia en el capítulo y nadie lo nota.');
    return 1;
  }
  const sinResponsable = datos.fichas.filter((f) => !RESPONSABLES[f.responsable]);
  if (sinResponsable.length) {
    console.error('sin responsable válido (D, M o JF): ' + sinResponsable.map((f) => f.id).join(', '));
    return 1;
  }

  const { tex, abiertas } = construir(datos);
  fs.mkdirSync(path.dirname(salida), { recursive: true });
  fs.writeFileSync(salida, tex);

  const huecos = (tex.match(/\\pendiente\{/g) || []).length;
  console.log('capítulo  -> ' + salida);
  console.log('fichas    -> ' + abiertas + '/' + datos.fichas.length + ' abiertas'
    + (abiertas === 0 ? '  (ninguna todavía: las abren los tres estudiantes)' : ''));
  console.log('secciones -> ' + SECCIONES.filter(([k]) => (datos.secciones[k] || '').trim()).length
    + '/' + SECCIONES.length + ' escritas');
  console.log('pendiente -> ' + huecos + ' hueco(s) visibles en el capítulo generado');
  return 0;
}

module.exports = { parsear, construir, CAMPOS, SECCIONES };

if (require.main === module) process.exit(main(process.argv));
