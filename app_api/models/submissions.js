var mongoose = require( 'mongoose' );

var submissionSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  submissionType: {
    type: String
  },
  submissionCategory: {
    type: String
  },
  submissionFor: {
    type: String
  },
  title: {
    type: String
  },
  abstract: {
    type: String
  },
  keywords: {
    type: Array
  },
  paperFiles: {
    type: Array
  },
  graphicFiles: {
    type: Array
  },
  authors: {
    type: Array
  },
  reviewers: {
    type: Array
  },
  reviewees: {
    type: Array
  }
});

mongoose.model('Submission', submissionSchema);
