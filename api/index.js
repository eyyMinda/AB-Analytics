// //localhost
// const port = process.env.PORT || 3001
// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`)
// })


import 'dotenv/config';
import express from 'express';
import { GoogleAuth } from 'google-auth-library';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const propertyId = process.env.PROPERTY_ID;

const credentialsJson = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
const auth = new GoogleAuth({
  credentials: credentialsJson,
  scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
});


app.get('/api', async (request, response) => {

  try {

    const metrics = JSON.parse(request.query.metrics || '[]');
    const dimensions = JSON.parse(request.query.dimensions || '[]');
    const dateRanges = JSON.parse(request.query.dateRanges || '[]')

    const analyticsDataClient = new BetaAnalyticsDataClient({ auth });
    const res = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: dateRanges,
      dimensions: dimensions,
      metrics: metrics,
    });

    response.json(res);

  } catch (error) {
    console.log(error);
    console.error(error)
    response.status(500).json({ message: error })
  }
});

export default app;