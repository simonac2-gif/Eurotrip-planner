const form = document.querySelector('#controls');
const chart = document.querySelector('#chart');
const results = document.querySelector('#results');
const summary = document.querySelector('#summary');
const legend = document.querySelector('#legend');
const groupControls = document.querySelector('#group-controls');
const ns = 'http://www.w3.org/2000/svg';
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const groups = ['Western Europe', 'Eastern Europe', 'Northern Europe', 'Southern Europe', 'Balkans', 'Baltics', 'Nordics', 'Slavic Europe', 'UK & Ireland', 'Eastern Mediterranean'];
const axisAbbreviations = { 'United Kingdom': 'UK', 'United States': 'US' };
groups.forEach((group) => { const label = document.createElement('label'); label.innerHTML = `<input type="checkbox" name="group" value="${group}"> ${group}`; groupControls.append(label); });
function el(tag, attrs = {}, content = '') { const node = document.createElementNS(ns, tag); Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value)); node.textContent = content; return node; }
function countryFlag(iso2) { return String.fromCodePoint(...iso2.toUpperCase().split('').map((letter) => 127397 + letter.charCodeAt(0))); }
function countryLabel(item) { return `${item.country} (${axisAbbreviations[item.country] ?? item.iso2})`; }
function selectedGroups() { return [...form.querySelectorAll('[name=group]:checked')].map((input) => input.value); }
function query() { return new URLSearchParams({ days: form.days.value, budget: form.budget.value, euOnly: form.euOnly.checked, groups: selectedGroups().join(',') }); }
function renderChart(data) {
  chart.replaceChildren(); const W=860,H=350,L=55,R=22,T=24,B=65;
  [0,25,50,75,100].forEach(score => { const y=T+(100-score)*(H-T-B)/100; chart.append(el('line',{x1:L,y1:y,x2:W-R,y2:y,class:'grid'})); chart.append(el('text',{x:L-9,y:y+4,'text-anchor':'end',class:'axis-label'},score)); });
  const point = (item, i) => ({ x: L + i * (W-L-R) / Math.max(1, data.length-1), y: T + (100-item.score)*(H-T-B)/100 });
  chart.append(el('polyline',{points:data.map((item,i)=>{const p=point(item,i);return `${p.x},${p.y}`}).join(' '),class:'line'}));
  data.forEach((item,i) => { const p=point(item,i); chart.append(el('circle',{cx:p.x,cy:p.y,r:5,class:'dot'})); chart.append(el('text',{x:p.x,y:p.y-12,'text-anchor':'middle',class:'score'},item.score)); chart.append(el('text',{x:p.x,y:H-B+23,'text-anchor':'middle',class:'flag','aria-label':countryLabel(item)},countryFlag(item.iso2))); chart.append(el('text',{x:p.x,y:H-B+41,'text-anchor':'middle',class:'cost'},money.format(item.estimatedCost))); });
}
function renderPlaceholder() {
  chart.replaceChildren(el('text', { x: 430, y: 175, 'text-anchor': 'middle', class: 'placeholder' }, 'select region to explore'));
  results.replaceChildren();
  summary.textContent = '';
  legend.textContent = '';
}
async function update() {
  document.querySelector('#days-output').value = `${form.days.value} days`;
  document.querySelector('#budget-output').value = money.format(form.budget.value);
  if (selectedGroups().length === 0) { renderPlaceholder(); return; }
  const endpoint = new URL(window.EUROTRIP_RANKINGS_URL || '/api/rankings', window.location.origin);
  endpoint.search = query();
  const response = await fetch(endpoint); const { rankings, source } = await response.json();
  renderChart(rankings);
  results.replaceChildren(...rankings.map(item => { const row=document.createElement('tr'); row.innerHTML=`<td>${countryFlag(item.iso2)} ${countryLabel(item)}</td><td>${item.score}/100</td><td>${money.format(item.estimatedCost)}</td><td>${item.currency}</td>`; return row; }));
  const selected = selectedGroups();
  summary.textContent = rankings.length ? `Top fit: ${rankings[0].country} · ${source === 'sample' ? 'sample data' : 'updated data'}` : 'No countries match these filters.';
  legend.textContent = selected.length ? `Comparing: ${selected.join(' · ')}` : 'All regional groups';
}
form.addEventListener('input', update);
form.addEventListener('change', update);
update();
