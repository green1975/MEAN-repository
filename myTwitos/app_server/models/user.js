var mongoose = require('mongoose');
var db = require('./db');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

ObjectId = Schema.ObjectId;

var userschema = new mongoose.Schema({
	firstname: { type: 'string', match: /^[a-zA-Z0-9-_]+$/ },
	lastname: { type: 'string', match: /^[a-zA-Z0-9-_]+$/ },
	email: {type: 'string', format: 'email', unique: true},
	password: {type: 'string', minlenght: 5},
	codepostale: {type: 'number', maxlength: 5},
	posts: [{type: [ObjectId], ref: 'billet'}],
	friend: {type: 'array'},
	ask: {type: 'array'},
});

userschema.methods.generateJwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	return jwt.sign({
		_id: this._id,
		email: this.email,
		firstname: this.firstname,
		exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

var userModel = mongoose.model('user', userschema);

module.exports = userModel;