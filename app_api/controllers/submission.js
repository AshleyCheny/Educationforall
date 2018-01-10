var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
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

module.exports.getSumissionFile = function(req,res){
  console.log("params",req.params);
  // get the file from the file system, and send it back to the client
  console.log(__dirname);
  res.set('Content-Disposition', req.params.fileName);
  res.download(process.cwd() + "/uploads/" + req.params.fileName, function(err){
    console.log(err);
  });
}

module.exports.deleteSubmission = function(req, res){
  // Submission.findOneAndUpdate(
  //   { _id: req.params.submissionId, 'files._id': req.params.fileId },
  //   {$pull: {files: {_id: req.params.fileId}}},
  //   {new: true},
  //   function(err, doc){
  //     res.send(doc);
  // });
  Submission.find({ _id: req.params.submissionId }).remove(function(err, doc){
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
}
