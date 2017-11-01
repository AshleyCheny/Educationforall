var mongoose = require('mongoose');
var Submission = mongoose.model('Submission');

module.exports.submitManuscript = function(req, res) {
  console.log('fired');
  var newSubmission = new Submission(req.body);
  console.log(req.body.submissionType);
  newSubmission.userId = "fdffs,,";
  newSubmission.userEmail = "ashleychen@gmaf.com";
  newSubmission.files = req.files;

  console.log(req.files[0].destination);
  newSubmission.save(function(err){
    if(err){
      throw err;
    } else {
      res.send("successfully add");
    }

  });

};
