var mongoose = require('mongoose');
var db = require('./db');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var billetschema = new mongoose.Schema({
	message: { type: 'string'},
	name: { type: 'string'},
	date: { type: Date, default: Date.now},
	avis: [{type: [ObjectId], ref: 'comment'}]
});

var billetModel = mongoose.model('billet', billetschema);

module.exports = billetModel;