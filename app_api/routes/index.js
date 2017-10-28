var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var multer = require('multer');
var mongoose = require( 'mongoose' );
var Submission = mongoose.model('Submission');
// var GridFsStorage = require('multer-gridfs-storage');
// var Grid = require('gridfs-stream');
// var mongoose = require('mongoose');

// set up multer object
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
});

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var newSubmission = new Submission();
newSubmission.userId = 'xxxxx';
newSubmission.userEmail = 'xxxxxwerwer';

// apply the route authentication
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

/** API path that will upload the files */
var muluploads = upload.fields([ {name: 'paperFile', maxCount: 1}, { name: 'graphicFile', maxCount: 8 } ]);
router.post('/upload', muluploads, function(req, res, next) {
  console.log('fired');
  console.log(req);
  console.log(req.body);
  console.log(req.files);
  newSubmission.save(function(err){
    res.send("successfully add");
  });

});

module.exports = router;
