// set the user schema using mongoose
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
