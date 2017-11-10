var mongoose = require( 'mongoose' );

var submissionSchema = new mongoose.Schema({
  userId: {
    type: String,
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
  keywords: [],
  files: [ {
    fieldname: {
      type: String,
    },
    originalname: {
      type: String
    },
    encoding: {
      type: String
    },
    mimetype: {
      type: String
    },
    destination: {
      type: String
    },
    filename: {
      type: String
    },
    path: {
      type: String
    },
    size: {
      type: String
    }
  } ],
  authors: {
    type: String
  },
  reviewers: {
    type: String
  },
  reviewees: {
    type: String
  }
});

mongoose.model('Submission', submissionSchema);
