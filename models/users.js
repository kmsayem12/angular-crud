const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema - this like blue print

const UsersSchema = mongoose.Schema({
  name:{type:String},
  email:{type:String,required:true},
  passwod:{type:String,required:true}
});

// const User = module.exports = mongoose.model('User', UserSchema);
const User = module.exports = mongoose.model('Users',UsersSchema);



module.exports.getUserByEmail = function(email, callback){
  const query = {email: email}
  User.findOne(query, callback);
}


module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  console.log(candidatePassword, hash);
  // bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
  //   if(err) throw err;
  //   callback(null, isMatch);
  // });
}