# React + Vite + Express

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Create a .env file in the project root directory and populate it with the following variables:

```
PROPERTY_ID=YOUR_GOOGLE_ANALYTICS_PROPERTY_ID
PORT=3000
VITE_PORT=3000
GOOGLE_APPLICATION_CREDENTIALS_JSON=YOUR_SERVICE_ACCOUNT_KEY_JSON
Replace YOUR_GOOGLE_ANALYTICS_PROPERTY_ID with your Google Analytics property ID, and YOUR_SERVICE_ACCOUNT_KEY_JSON with the contents of your service account key JSON file. Additional VITE_PORT is needed for frontend to contact backend.
```

#### E.g:

```
PROPERTY_ID=12345678
PORT=3000
VITE_PORT=3000
GOOGLE_APPLICATION_CREDENTIALS_JSON={"type": "service_account", "project_id": "dashboard1-1682805546629", "private_key_id": "blablabla\n-----END PRIVATE KEY-----\n", "client_email": "client-email-here", "client_id": "1234", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_x509_cert_url": "https://www.somelink.com"}
```

### Start the development server:

```
npm start
```

## Usage

- Select a start date, end date, and metric from the form.
- Click the "Fetch" button to retrieve data from Google Analytics.
- The table will display the data for the selected date range and metric, grouped by country.
- The sum total of the chosen metric is displayed in a separate box.
