const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/mean';
const path=require('path');
const passport=require('passport');
const cors = require('cors');
const expressValidator = require('express-validator');

const app = express();

const routes=require('./routes.js');

mongoose.connect(mongoDB, {useMongoClient:true});
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', ()=>{
	console.log('Connected to db');
})

mongoose.connection.on('error', (err) => {
	console.log('Database error: '+err);
  });

require('./config/passport')(passport);

app.use(cors());
app.use(express.static(path.join(__dirname, 'client')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(expressValidator()); 

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.listen(4000, ()=>{
	console.log("Server Started");
});