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
  }
};

// get submission callback method
module.exports.getSubmissions = function(req, res){
  // no query
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
      submissionCategory: (req.query.category == 'jme')? 'Journal of Mathematics Education': 'Others',
      submissionFor: req.query.target
    });
    var doc = [];

    cursor.sort({ timestamp: -1 });

    cursor.exec(function(err, doc){
      if (err) {
        console.log(err);
      } else {
        res.send(doc);
        console.log("doc",doc);
      }

    });
  }


}

module.exports.signUpAsReviewer = function(req,res){
  User.findOneAndUpdate(
    { email: req.params.userEmail },
    { $set: { reviewer: true} },
    { new: true },
    function(err, doc){
      if (err) {
        console.log("Oops, there was an error");
        res.send("Error");
      } else {
        res.send("successfully sign up as a reviewer");
      }
  });
}

module.exports.getSubmissionById = function(req,res){
  // query the db based on the submission id
  Submission.findOne({_id: req.params.submission_id }, function(err, doc){
    if (err) {
      console.log("Oops, get submission from server error");
      res.send(err);
    } else {
      res.status(200).json(doc);
    }
  });
}
