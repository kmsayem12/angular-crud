const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
//Import the mongoose module
const config = require('../config/database');
const User = require('../models/users');

//Set up default mongoose connection
// var db = mongoose('mongodb://angular_crud:angular_crud@ds163806.mlab.com:63806/angular_crud',['users']);
/*mongoose.connect(mongoDB, {
  useMongoClient: true
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;*/

//Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Profile
router.get('/profile',(req, res, next) => {
  res.json({user: req.user});
});


/* GET all users listing. */
router.get('/users', function(req, res, next) {
	db.users.find(function(err, users){
		if(err){
			res.send(err);
		}
		res.json(users);
	});

});

/* GET single users. */
router.get('/user/:id', function(req, res, next) {
	// console.log(req.params.id);
	db.users.find({_id: mongojs.ObjectID(req.params.id)},function(err, users){
		if(err){
			res.send(err);
		}
		res.json(users);
	});
});

/* save users. */
router.post('/user', function(req, res, next) {
	var user = req.body;
	if(!user.name || (user.isDone + '')){
		res.status(400);
		res.json({
			'error':'bad data'
		});
	}else{
		db.users.save(user, function(err,user){
			if(err){
				res.send(err)
			}
			res.json(user);
		});
	}
});
module.exports = router;