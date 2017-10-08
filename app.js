// references of different modules
// sequence matters
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Require Passport
var passport = require('passport');
// Bring in the data model
require('./app_api/models/db');
// Bring in the Passport config after model is defined
require('./app_api/config/passport');

// Bring in the routes for the API (delete the default routes)
var routesApi = require('./app_api/routes/index');

var app = express();

// Initialise Passport before using the route middleware
app.use(passport.initialize());

// Use the API routes when path starts with /api
app.use('/api', routesApi);

app.get('/', (req, res) => {
  res.send('HEY!')
});



// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});
app.listen(3000, () => console.log('Server running on port 3000'));
