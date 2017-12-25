var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
const config = require('./config/database');

//Connect To database
mongoose.connect(config.database);

// On connect
mongoose.connection.on('connected',()=>{
	console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});



var app = express();

var index = require('./routes/index');
var users = require('./routes/users');

var port = '3000'; // posrt number
app.use(cors()); // cors middleware

// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/',index);
app.use('/api',users);

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

// set static folder
// app.use(express.static(path.join(__dirname, 'views')));



app.listen(port, function(){
	console.log('server start'+ port);
});


