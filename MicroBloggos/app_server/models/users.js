var mongoose = require('mongoose');
var db = require('./db');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var userschema = new mongoose.Schema({
	username: { type: 'string',  match: /^[a-zA-Z0-9-_]+$/ },
	email: {type: 'string', format: 'email', unique: true},
	password: {type: 'string', minlenght: 5},
	posts: {type: [ObjectId], maxlength: 200}
});
var userModel = mongoose.model('user', userschema);

var usertest = new userModel({
	username: 'did',
	email: 'didier@yahoo.fr',
	password: 'fred'
});

module.exports = userModel;