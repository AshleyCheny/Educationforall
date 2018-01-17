var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var Submission = mongoose.model('Submission');


module.exports.submitManuscript = function(req, res) {

  // save the submission form data to the submission collection
  var newSubmission = new Submission(req.body);
  newSubmission.files = req.files;
  newSubmission.timestamp = Date.now();

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

module.exports.deleteFile = function(req, res){
  console.log(req.params);
  Submission.findOneAndUpdate(
    { "_id": req.params.submissionId },
    {$pull: {files: {_id: req.params.fileId}}},
    { new: true},
    function(err, doc){
      if (err) {
        res.send(err)
        console.log(err);
      } else {
        console.log("deleted");
        console.log(doc);
        res.send(doc);

      }
  });
}

module.exports.updateSubmission = function(req, res){

  // find the submission by id
  // update the fields
  // save the doc back to the db
  Submission.findOne({_id: req.params.submissionId}, function(err, doc){
    if (err) {
      res.status(500).send(err);
    } else {
      doc.submissionType = req.body.submissionType;
      doc.submissionCategory = req.body.submissionCategory;
      doc.submissionFor = req.body.submissionFor;
      doc.title = req.body.title;
      doc.abstract = req.body.abstract;
      doc.authors = req.body.authors;
      doc.timestamp = Date.now();
      doc.keywords = req.body.keywords;
      if (req.files.length > 0) {
        req.files.forEach(function(item, index, err){
          doc.files.push(item);
        });
      }

      doc.save(function(err, doc){
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(doc);
        }
      });
    }
  });
}
