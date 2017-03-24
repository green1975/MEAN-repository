var mongoose = require('mongoose');
var db = require('./db');


var billetschema = new mongoose.Schema({
	message: {type: 'string', maxlenght: 150}
});
var billetModel = mongoose.model('billet', billetschema);

var billettest = new billetModel({
	message: 'vjbkgvgkjvjlblhbjknsvljnwvjxlnvvjlvnjlfnjnjlvnjlnvjjlnvnjsnsjfsvnsjl'
});

module.exports = billetModel;