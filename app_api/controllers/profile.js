var mongoose = require('mongoose');
var _ = require('lodash');
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
  console.log(_.isEmpty(req.query));
  console.log(req.query);
  if (_.isEmpty(req.query)) {
    // query the db based on the userEmail
    Submission.find({userEmail: req.params.user_email }, function(err, doc){
      if (err) {
        console.log("Oops, get submission from server error");
        res.send(err);
      } else {
        res.status(200).json(doc);
      }
    });
  } else {
    // query based on the userEmail, category and target year
    var cursor = Submission.find({
      userEmail: req.params.user_email,
      submissionCategory: req.query.category,
      submissionFor: req.query.target
    });
    var doc = [];

    cursor.sort({ timestamp: -1 });

    cursor.exec(function(err, doc){
      if (err) {
        console.log(err);
      } else {
        console.log("doc",doc);
      }

    });


    // Submission.find({userEmail: req.params.user_email, submissionCategory: req.query.category,
    // submissionFor: req.query.target} , function(err, doc){
    //   if (err) {
    //     console.log("Oops, get submission from server error");
    //     res.send(err);
    //   } else {
    //     res.status(200).json(doc);
    //   }
    // });
  }


}
