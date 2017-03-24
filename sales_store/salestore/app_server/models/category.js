var db = require('./db');
var mongoose = require('mongoose');

var categoryschema = mongoose.Schema({

	name: { type: 'string'},
	subcat: { type: 'array' },
});

var categoryModel = mongoose.model('category', categoryschema);

module.exports = categoryModel;