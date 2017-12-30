/*
** email is set to be unique as it will be used for the login credentails
** hash and salt will be used instead of saving a password
** The salt is a string of characters unique to each user.
** The hash is created by combining the password provided by the user and the salt,
** and then applying one-way encryption
** As the hash cannot be decrypted, the only way to authenticate a user is to take the password,
** combine it with the salt and encrypt it again.
** If the output of this matches the hash, then the password must have been correct.
*/
// create the mongoose module variable
var mongoose = require( 'mongoose' );
// use Node.js module crypto to help setting and checking the password
var crypto = require('crypto');
// use module jsonwebtoken to generate JSON Web Token (JWT)
var jwt = require('jsonwebtoken');

// set the user schema using mongoose
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String,
  roles: {
    editor: Boolean,
    author: Boolean,
    reviewer: Boolean,
    admin: {
      type: Boolean,
      default: false
    }
  }
});

// create a new method "setPassword" for the userSchema that takes one parameter password
// "setPassword" method will be used when creating a user(register),
// instead of saving the password to a "password" path
// we will be able to pass it to the setPassword function to set the salt and hash paths in the user document.
userSchema.methods.setPassword = function(password){
  // use randomBytes() to create the random salt
  this.salt = crypto.randomBytes(16).toString('hex');
  // use pbkdf2Sync() to create the hash
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

// create another method called validPassword() to check the password
// this method will be used when users try to login
userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

// Adding a generateJwt method to userSchema in order to return a JWT
// simply passing it the data we want to include in the token,
// plus a secret that the hashing algorithm will use.
// It is important that your secret is kept safe
// only the originating server should know what it is.
//  It is best practice to set the secret as an environment variable, and not have it in the source code,
// especially if your code is stored in version control somewhere.
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

// set the userSchema variable as a model and set the model name as "User"
mongoose.model('User', userSchema);
