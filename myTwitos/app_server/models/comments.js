var mongoose = require('mongoose');
var db = require('./db');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var commentschema = new mongoose.Schema({
	commentaire: { type: 'string'},
	name: { type: 'string'},
	date: { type: Date, default: Date.now}
});

var commentModel = mongoose.model('comment', commentschema);

module.exports = commentModel;