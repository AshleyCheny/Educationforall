var mongoose = require('mongoose');
var User = mongoose.model('User');
var Submission = mongoose.model('Submission');

module.exports.profileRead = function(req, res) {

  // client side sends the get request with the headers with contain a token
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });

    // TODO: show authors the submit paper form and display all the papers they submit

  }
};

// get submission callback method
module.exports.getSubmissions = function(req, res){
  // query the db based on the userEmail
  Submission.find({userEmail: req.params.user_email }, function(err, doc){
    if (err) {
      console.log("Oops, get submission from server error");
      res.send(err);
    } else {
      res.status(200).json(doc);
    }
  });

}
