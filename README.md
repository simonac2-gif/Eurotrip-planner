# EuroTrip Predictor

A Node.js prototype that ranks European destinations for US travelers based on estimated trip cost, currency strength, EU membership preference, trip duration, and overlapping regional comparisons.

## Europe coverage and regional taxonomy

The seed catalog covers all 44 sovereign states in the UN M49 Europe grouping. Its primary geographic tags are M49's Western, Eastern, Northern, and Southern Europe; the interface also adds overlapping cultural tags for the Balkans, Baltics, Nordics, Slavic Europe, and UK & Ireland. Kosovo and Cyprus are included as additional travel destinations: Kosovo is not separately listed as a sovereign M49 country, while Cyprus is geographically classified in Western Asia by M49 despite EU membership. Overseas territories are not treated as countries.

The country cost and currency figures remain illustrative prototype values. Real-time ingestion must replace them with licensed, dated source data before trip recommendations are presented as current.

## Run locally

```bash
npm install
npm test
npm run dev
```

Open `http://localhost:3000`. Local mode uses the clearly marked sample dataset; it does not require AWS credentials.

`npm run dev` restarts the local server whenever you change the source files. If you use `npm start` instead, stop and restart it after changing API or scoring code.

## API

`GET /api/rankings?days=14&budget=3000&euOnly=false`

The scoring model is `72% affordability + 12% currency index + 16% EU preference`. Affordability decreases smoothly from the selected budget to 1.5× that budget, so options remain comparable even when several fit the budget. The API returns estimated cost and a sortable score, rather than presenting a recommendation as a fact.

## AWS deployment foundation

`infra/template.yaml` defines an API Lambda and on-demand DynamoDB table. Install the AWS SAM CLI, then use:

```bash
npm run package
sam build --template-file infra/template.yaml
sam deploy --guided
```

Before deploying real-time data, select licensed sources for flight and lodging pricing and respect their rate limits and terms. Add EventBridge-scheduled ingestion only after the provider choice is made; do not put third-party API keys in browser code. Store secrets in AWS Secrets Manager and give the ingestion Lambda only the necessary DynamoDB write permission.

## Cost safeguards

Create an AWS Budget with an SNS email alert at 80% of a low monthly limit (for example, $25 while prototyping). AWS Budgets tracks your app's AWS bill; it is not a travel-pricing datasource.
