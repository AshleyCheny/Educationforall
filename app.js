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

// Initialise Passport before using the route middleware
app.use(passport.initialize());

// Use the API routes when path starts with /api
app.use('/api', routesApi);

var app = express();
app.get('/', (req, res) => {
  res.send('HEY!')
});
app.listen(3000, () => console.log('Server running on port 3000'));
