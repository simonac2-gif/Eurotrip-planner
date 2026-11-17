// Coverage: the 44 sovereign states in UN M49 Europe, plus Kosovo and Cyprus
// as additional travel destinations. Geographic tags follow M49; cultural tags overlap.
export const regionGroups = ['Western Europe', 'Eastern Europe', 'Northern Europe', 'Southern Europe', 'Balkans', 'Baltics', 'Nordics', 'Slavic Europe', 'UK & Ireland', 'Eastern Mediterranean'];

const country = (country, iso2, groups, euMember, currency, currencyIndex, dailyVisitorCostUsd, avgFlightUsd, scope = 'un-m49-europe') =>
  ({ country, iso2, groups, euMember, currency, currencyIndex, dailyVisitorCostUsd, avgFlightUsd, scope });

export const sampleCountries = [
  // Eastern Europe (UN M49)
  country('Belarus', 'BY', ['Eastern Europe', 'Slavic Europe'], false, 'BYN', .72, 72, 770),
  country('Bulgaria', 'BG', ['Eastern Europe', 'Balkans', 'Slavic Europe'], true, 'BGN', .90, 88, 790),
  country('Czechia', 'CZ', ['Eastern Europe', 'Slavic Europe'], true, 'CZK', .96, 111, 745),
  country('Hungary', 'HU', ['Eastern Europe'], true, 'HUF', .91, 105, 750),
  country('Moldova', 'MD', ['Eastern Europe'], false, 'MDL', .75, 67, 810),
  country('Poland', 'PL', ['Eastern Europe', 'Slavic Europe'], true, 'PLN', .88, 96, 735),
  country('Romania', 'RO', ['Eastern Europe', 'Balkans'], true, 'RON', .86, 91, 790),
  country('Russia', 'RU', ['Eastern Europe', 'Slavic Europe'], false, 'RUB', .68, 105, 850),
  country('Slovakia', 'SK', ['Eastern Europe', 'Slavic Europe'], true, 'EUR', 1, 119, 760),
  country('Ukraine', 'UA', ['Eastern Europe', 'Slavic Europe'], false, 'UAH', .70, 70, 815),
  // Northern Europe (UN M49)
  country('Denmark', 'DK', ['Northern Europe', 'Nordics'], true, 'DKK', .93, 208, 755),
  country('Estonia', 'EE', ['Northern Europe', 'Baltics', 'Nordics'], true, 'EUR', 1, 131, 790),
  country('Finland', 'FI', ['Northern Europe', 'Nordics'], true, 'EUR', 1, 205, 780),
  country('Iceland', 'IS', ['Northern Europe', 'Nordics'], false, 'ISK', .86, 258, 815),
  country('Ireland', 'IE', ['Northern Europe', 'UK & Ireland'], true, 'EUR', 1, 194, 690),
  country('Latvia', 'LV', ['Northern Europe', 'Baltics'], true, 'EUR', 1, 103, 770),
  country('Lithuania', 'LT', ['Northern Europe', 'Baltics'], true, 'EUR', 1, 98, 775),
  country('Norway', 'NO', ['Northern Europe', 'Nordics'], false, 'NOK', .90, 244, 785),
  country('Sweden', 'SE', ['Northern Europe', 'Nordics'], true, 'SEK', .91, 198, 755),
  country('United Kingdom', 'GB', ['Northern Europe', 'UK & Ireland'], false, 'GBP', .84, 188, 650),
  // Southern Europe (UN M49)
  country('Albania', 'AL', ['Southern Europe', 'Balkans'], false, 'ALL', .76, 78, 810),
  country('Andorra', 'AD', ['Southern Europe'], false, 'EUR', 1, 161, 760),
  country('Bosnia and Herzegovina', 'BA', ['Southern Europe', 'Balkans', 'Slavic Europe'], false, 'BAM', .81, 76, 820),
  country('Croatia', 'HR', ['Southern Europe', 'Balkans', 'Slavic Europe'], true, 'EUR', 1, 120, 790),
  country('Greece', 'GR', ['Southern Europe', 'Balkans'], true, 'EUR', 1, 126, 815),
  country('Holy See', 'VA', ['Southern Europe'], false, 'EUR', 1, 220, 780),
  country('Italy', 'IT', ['Southern Europe'], true, 'EUR', 1, 176, 720),
  country('Malta', 'MT', ['Southern Europe'], true, 'EUR', 1, 158, 890),
  country('Montenegro', 'ME', ['Southern Europe', 'Balkans', 'Slavic Europe'], false, 'EUR', 1, 97, 825),
  country('North Macedonia', 'MK', ['Southern Europe', 'Balkans', 'Slavic Europe'], false, 'MKD', .78, 75, 820),
  country('Portugal', 'PT', ['Southern Europe'], true, 'EUR', 1, 118, 760),
  country('San Marino', 'SM', ['Southern Europe'], false, 'EUR', 1, 174, 760),
  country('Serbia', 'RS', ['Southern Europe', 'Balkans', 'Slavic Europe'], false, 'RSD', .82, 83, 810),
  country('Slovenia', 'SI', ['Southern Europe', 'Balkans', 'Slavic Europe'], true, 'EUR', 1, 139, 780),
  country('Spain', 'ES', ['Southern Europe'], true, 'EUR', 1, 134, 710),
  // Western Europe (UN M49)
  country('Austria', 'AT', ['Western Europe'], true, 'EUR', 1, 183, 745),
  country('Belgium', 'BE', ['Western Europe'], true, 'EUR', 1, 186, 700),
  country('France', 'FR', ['Western Europe'], true, 'EUR', 1, 178, 690),
  country('Germany', 'DE', ['Western Europe'], true, 'EUR', 1, 171, 715),
  country('Liechtenstein', 'LI', ['Western Europe'], false, 'CHF', .95, 242, 790),
  country('Luxembourg', 'LU', ['Western Europe'], true, 'EUR', 1, 215, 710),
  country('Monaco', 'MC', ['Western Europe'], false, 'EUR', 1, 330, 720),
  country('Netherlands', 'NL', ['Western Europe'], true, 'EUR', 1, 198, 700),
  country('Switzerland', 'CH', ['Western Europe'], false, 'CHF', .95, 248, 820),
  // Added so travelers can include them even though they are outside that exact M49 scope.
  country('Kosovo', 'XK', ['Southern Europe', 'Balkans'], false, 'EUR', 1, 70, 825, 'additional-travel-destination'),
  country('Cyprus', 'CY', ['Eastern Mediterranean'], true, 'EUR', 1, 143, 860, 'additional-travel-destination')
];

export const unM49EuropeanSovereignIso2 = [
  'AL', 'AD', 'AT', 'BY', 'BE', 'BA', 'BG', 'HR', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'VA', 'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'MD', 'MC', 'ME', 'NL', 'MK', 'NO', 'PL', 'PT', 'RO', 'RU', 'SM', 'RS', 'SK', 'SI', 'ES', 'SE', 'CH', 'UA', 'GB'
];
