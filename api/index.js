import 'dotenv/config';
import express from 'express';
import { GoogleAuth } from 'google-auth-library';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middle Ware for frontend-backend communication
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS');
  next();
});

const propertyId = process.env.PROPERTY_ID;
const scope = process.env.GA_SCOPE;

const credentialsJson = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
const auth = new GoogleAuth({
  credentials: credentialsJson,
  scopes: [scope],
});

// Fetch from GA based on query
app.get('/api', async (request, response) => {
  // response.json({ "users": ["userOne", "userTwo", "userThree"] }) // For Testing

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
    response.status(500).json({ message: error })
  }
});

// localhost only
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

export default app;