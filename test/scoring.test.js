import test from 'node:test';
import assert from 'node:assert/strict';
import { parseRankingQuery, rankCountries } from '../src/scoring.js';
import { sampleCountries, unM49EuropeanSovereignIso2 } from '../src/countries.js';

test('query validation accepts valid ranking inputs', () => {
  assert.deepEqual(parseRankingQuery({ days: '7', budget: '2000', euOnly: 'true', groups: 'Baltics, Nordics' }), { days: 7, budget: 2000, euOnly: true, groups: ['Baltics', 'Nordics'] });
});
test('EU filter and ranking work', () => {
  const ranked = rankCountries([{ country:'A', groups:['Baltics'], euMember:true, currencyIndex:1, avgFlightUsd:200, dailyVisitorCostUsd:100 }, { country:'B', groups:['Western Europe'], euMember:false, currencyIndex:1, avgFlightUsd:100, dailyVisitorCostUsd:50 }], { days:7, budget:1000, euOnly:true, groups:['Baltics'] });
  assert.equal(ranked.length, 1); assert.equal(ranked[0].country, 'A'); assert.equal(ranked[0].estimatedCost, 900);
});

test('dataset contains every sovereign country in the UN M49 Europe grouping exactly once', () => {
  const m49Countries = sampleCountries.filter((country) => country.scope === 'un-m49-europe');
  assert.equal(m49Countries.length, 44);
  assert.deepEqual([...m49Countries.map((country) => country.iso2)].sort(), [...unM49EuropeanSovereignIso2].sort());
  assert.ok(m49Countries.every((country) => country.groups.length > 0));
});
