'use strict';
const test = require('node:test'), assert = require('node:assert/strict');
const { entreModelos, panelPorModelo } = require('./analizar-sonnet');

const corrida = (paginas, datos) => {
  const unidades = new Map();
  for (const [clave, nivel, estado = 'puntaje'] of datos) {
    const [pagina, grupo, canal] = clave.split('/');
    unidades.set(clave, { pagina, grupo, canal, estado, nivel: estado === 'puntaje' ? nivel : null, huella: 'h' });
  }
  return { paginas, unidades };
};

test('entreModelos: pares con nivel en ambas, diferencia b − a y estados sin nivel aparte', () => {
  const a = corrida(['P1', 'P2', 'P3'], [['P1/G7/wireframe', 0], ['P2/G7/wireframe', 1], ['P3/G7/wireframe', 0, 'sin_puntaje']]);
  const b = corrida(['P1', 'P2', 'P3'], [['P1/G7/wireframe', 0], ['P2/G7/wireframe', 2], ['P3/G7/wireframe', 1]]);
  const r = entreModelos(a, b, {});
  assert.equal(r.conjunto.n, 2);
  assert.equal(r.conjunto.diferencia_media_b_menos_a, 0.5);
  assert.equal(r.conjunto.exacto, 0.5);
  assert.equal(r.sin_nivel_en_alguno['G7: sin_puntaje -> puntaje'], 1);
  assert.ok(r.conjunto.marcas.includes('n_insuficiente'));
});

test('entreModelos: G4 solo se empareja en screenshot y G7 en wireframe', () => {
  const a = corrida(['P1'], [['P1/G4/wireframe', 1], ['P1/G7/screenshot', 1]]);
  const b = corrida(['P1'], [['P1/G4/wireframe', 1], ['P1/G7/screenshot', 1]]);
  assert.equal(entreModelos(a, b, {}).conjunto.n, 0);
});

test('panelPorModelo: usa solo triples con panel y nivel en las dos corridas', () => {
  const a = corrida(['P1', 'P2'], [['P1/G7/wireframe', 0], ['P2/G7/wireframe', 0]]);
  const b = corrida(['P1', 'P2'], [['P1/G7/wireframe', 0], ['P2/G7/wireframe', 2]]);
  const panel = [{ pagina: 'P1', grupo: 'G7', nivel: 3 }, { pagina: 'P2', grupo: 'G7', nivel: null }];
  const r = panelPorModelo(a, b, panel, {});
  assert.equal(r.conjunto.n, 1);
});
