'use strict';

require('dotenv').config(); // Run this first to ensure all environment variables are set
const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const router = require('./router');
const defaultSessionValues = require('./middleware/default-session-values');
const authentification = require('./middleware/authentification');
const defaultErrorHandler = require('./middleware/default-error-handler');
const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'fs1030_new',
});

// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

global.db = db;


// Use the EJS templating engine (comment this out if no webpages are generated)
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 12000000,
  },
}));

// Middleware to prepare default values for sessions
app.use(defaultSessionValues);

// Ensure user is logged in
app.all('/admin/*', authentification, (req, res, next) => {
  next();
});

// Serve static content, URL paths must start with "/static"
app.use('/static', express.static('static'));

// Parse incoming JSON
app.use(express.urlencoded({ extended: true }));

// Add our defined routes
app.use(router);

// Default error handler should in any of our routes we call next() with an error
app.use(defaultErrorHandler);


// Start the express server
const port = process.env.HTTP_PORT;
app.listen(port, () => {
  console.log(`Express server started on port ${port}.`);
});
