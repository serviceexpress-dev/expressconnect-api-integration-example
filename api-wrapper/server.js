require("dotenv").config({path: __dirname + "/.env"});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();

const apiKey = process.env.EXPRESS_CONNECT_API_KEY; // Do not store API Key in source control
const baseURL = process.env.EXPRESS_CONNECT_API_URL;

if (!apiKey || !baseURL) {
  console.error("Error: EXPRESS_CONNECT_API_KEY and EXPRESS_CONNECT_API_URL environment variables must be set.\nExiting...");
  process.exit(1);
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    apiKey: apiKey
  }
});

const queryExpressConnectAPI = (url, params) => {
  return client
    .get(url, { params })
    .then(response => {
      return response;
    })
    .catch(err => {
      throw err;
    });
};

app.use((req, res, next) => {
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  console.log(`Request URL: ${fullUrl}`);
  next();
});

// Get a list of your Service Express Agreements
app.get("/agreements", (req, res, next) => {
  return queryExpressConnectAPI("/contracts/agreements")
    .then(response => {
      return res.json(response.data);
    })
    .catch(err => {
      return next(err);
    });
});

// Get an agreement by id
app.get("/agreements/:id", (req, res, next) => {
  const id = req.params.id;

  return queryExpressConnectAPI(`/contracts/agreements/${id}`)
    .then(response => {
      return res.json(response.data);
    })
    .catch(err => {
      return next(err);
    });
});

// Get a list of all current equipment that Service Express has on record
app.get("/equipment", (req, res, next) => {
  // Using pagination-related query params
  const page = 1;
  const perPage = 100;

  // Using a filter-related query param
  const locationID = req.query.locationID;

  return queryExpressConnectAPI("/contracts/equipment", { page: page, perPage: perPage, locationID: locationID })
    .then(response => {
      return res.json(response.data);
    })
    .catch(err => {
      return next(err);
    });
});

// Get a single equipment by id
app.get("/equipment/:id", (req, res, next) => {
  const id = req.params.id;

  return queryExpressConnectAPI(`/contracts/equipment/${id}`)
    .then(response => {
      return res.json(response.data);
    })
    .catch(err => {
      return next(err);
    });
});

// Get a list of your locations that Service Express has on record
app.get("/locations", (req, res, next) => {
  // Using a filter-related query param
  const agreementID = req.query.agreementID;

  return queryExpressConnectAPI("/contracts/locations", { agreementID: agreementID })
    .then(response => {
      return res.json(response.data);
    })
    .catch(err => {
      return next(err);
    });
});

// Get a location by id
app.get("/locations/:id", (req, res, next) => {
  const id = req.params.id;

  return queryExpressConnectAPI(`/contracts/locations/${id}`)
    .then(response => {
      return res.json(response.data);
    })
    .catch(err => {
      return next(err);
    });
});

// Get a list of all service tickets (of any status, not just currently open tickets) that have been opened with Service Express
app.get("/serviceTickets", (req, res, next) => {
  // Using pagination-related query params
  const page = 1;
  const perPage = 250;

  return queryExpressConnectAPI("/tickets/service", { page: page, perPage: perPage })
    .then(response => {
      return res.json(response.data);
    })
    .catch(err => {
      return next(err);
    });
});

// Create a new service ticket
app.post("/serviceTickets", (req, res, next) => {
  console.log({ body: req.body });
  const params = req.body;

  return client
    .post("/tickets/service", params)
    .then(response => {
      return res.status(201).json(response.data);
    })
    .catch(err => {
      return next(err);
    });
});

// Handle errors passed by "next(err)" in the route handlers above
function handleErrors(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  console.log(`API Wrapper Request to: ${err.response.config.baseURL}${err.response.config.url} failed. Status: ${err.response.status}`);
  return res.status(err.response.status).json(err);
}

app.use(handleErrors);

const port = 4002;

app.listen(port, () => {
  console.log(`Vue app API listening on port ${port}`);
});
