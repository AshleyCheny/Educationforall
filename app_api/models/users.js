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

// use Node.js module crypto to help setting and checking the password
var crypto = require('crypto');

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
  salt: String
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
