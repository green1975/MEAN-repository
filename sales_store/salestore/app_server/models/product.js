var mongoose = require('mongoose');
var db = require('./db');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;


var productschema = new mongoose.Schema({
	date:{type: Date, default: Date.now},
	name: { type: 'string'},
	description: { type: 'string'},
	price: { type: 'number'},
	category: { type:'string'},
	subcategory: { type: 'string'},
	enddate: { type: Date },
	auctions: { type: 'array', ref: 'enchere'},
});

var productModel = mongoose.model('product', productschema);

module.exports = productModel;