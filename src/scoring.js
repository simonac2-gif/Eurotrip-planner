const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function parseRankingQuery(query = {}) {
  const days = Number(query.days ?? 14);
  const budget = Number(query.budget ?? 3000);
  if (!Number.isInteger(days) || days < 7 || days > 90) throw new Error('days must be an integer from 7 to 90');
  if (!Number.isFinite(budget) || budget < 500 || budget > 50000) throw new Error('budget must be between 500 and 50000 USD');
  const groups = String(query.groups ?? '').split(',').map((group) => group.trim()).filter(Boolean);
  return { days, budget, euOnly: String(query.euOnly ?? 'false') === 'true', groups };
}

export function rankCountries(countries, { days, budget, euOnly, groups = [] }) {
  return countries
    .filter((country) => !euOnly || country.euMember)
    .filter((country) => groups.length === 0 || groups.some((group) => country.groups?.includes(group)))
    .map((country) => {
      const estimatedCost = country.avgFlightUsd + country.dailyVisitorCostUsd * days;
      // A country remains distinguishable even when every option is inside the
      // selected budget. 1.5× budget is treated as the unaffordable ceiling.
      const affordability = clamp(1 - estimatedCost / (budget * 1.5), 0, 1);
      const score = Math.round(72 * affordability + 12 * country.currencyIndex + 16 * Number(country.euMember));
      return { ...country, estimatedCost: Math.round(estimatedCost), score, tripDays: days };
    })
    .sort((a, b) => b.score - a.score || a.estimatedCost - b.estimatedCost);
}
