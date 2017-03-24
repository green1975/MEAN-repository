var mongoose = require('mongoose');
var db = require('./db');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var userschema = new mongoose.Schema({
	date:{type: Date, default: Date.now},
	username:{type: 'string'},
	email:{type: 'string'},
	password:{type: 'string'},
	val: { type: 'boolean', default: false},
	product: [{type: [ObjectId], ref: 'product'}],
});

var userModel = mongoose.model( 'user', userschema);

module.exports = userModel;