var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var multer = require('multer');
var mongoose = require( 'mongoose' );
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
var ctrlSubmission = require('../controllers/submission');


// apply the route authentication
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

/** API path that will upload the files */
// var muluploads = upload.fields([ {name: 'paperFile', maxCount: 1}, { name: 'graphicFile', maxCount: 8 } ]);
console.log("routes");
router.post('/create', upload.any(), ctrlSubmission.submitManuscript);

module.exports = router;
