// In order for the controllers to work the file needs to require Passport,
// Mongoose and the user model.
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// register controller
module.exports.register = function(req, res) {
  // create a new Mongoose model instance
  var user = new User();

  // take the data from the submitted form and save them in the Mongoose model instance "user"
  user.name = req.body.name;
  user.email = req.body.email;

  // call the "setPassword" method to add the salt and the hash to the instance
  user.setPassword(req.body.password);

  // save the instanc as a record to the database
  user.save(function(err) {
    // generate a JWT
    var token;
    token = user.generateJwt();
    res.status(200);
    // send the JWT inside the JSON response
    res.json({
      "token" : token
    });

    // TODO: error handler

  });
};

// login controller
module.exports.login = function(req, res) {

  // get the credentails info from the req object and pass it to the authenticate method
  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};
