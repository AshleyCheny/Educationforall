var mongoose = require('mongoose');
var Submission = mongoose.model('Submission');

module.exports.submitManuscript = function(req, res) {

  // save the submission form data to the submission collection
  var newSubmission = new Submission(req.body);
  newSubmission.files = req.files;
  newSubmission.timestamp = Date.now();

  console.log(req.files[0].destination);
  newSubmission.save(function(err){
    if(err){
      res.send(err);
      console.log("opps, newSubmission database error: ", err);
    } else {
      res.send("successfully add to the submission collction");
    }

  });

};
