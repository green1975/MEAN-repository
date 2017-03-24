var mongoose = require('mongoose');
var db =require('./db');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var auctionschema = new mongoose.Schema({
	date: { type: Date, default: Date.now },
	price: { type: 'number' },
	email: { type: 'string' },
	product:{ type: ObjectId , ref: 'product'},
});

var auctionModel = mongoose.model('auction', auctionschema);

module.exports = auctionModel;