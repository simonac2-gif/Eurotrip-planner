import { sampleCountries } from './countries.js';
import { parseRankingQuery, rankCountries } from './scoring.js';

const response = (statusCode, body) => ({
  statusCode,
  headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' },
  body: JSON.stringify(body)
});

export async function handler(event) {
  try {
    const params = parseRankingQuery(event.queryStringParameters ?? {});
    const tableName = process.env.COUNTRY_METRICS_TABLE;
    let countries = sampleCountries;
    let source = 'sample';
    if (tableName) {
      // Dynamic imports keep the local mock mode dependency-free. SAM's package
      // step installs these dependencies for the deployed Lambda bundle.
      const [{ DynamoDBClient }, { DynamoDBDocumentClient, ScanCommand }] = await Promise.all([
        import('@aws-sdk/client-dynamodb'),
        import('@aws-sdk/lib-dynamodb')
      ]);
      const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
      const storedCountries = (await client.send(new ScanCommand({ TableName: tableName }))).Items ?? [];
      // A newly deployed table has no records. Keep the endpoint useful until
      // the scheduled, licensed-data ingestion workflow populates it.
      if (storedCountries.length > 0) {
        countries = storedCountries;
        source = 'dynamodb';
      }
    }
    return response(200, { rankings: rankCountries(countries, params), generatedAt: new Date().toISOString(), source });
  } catch (error) {
    return response(400, { error: error.message });
  }
}
