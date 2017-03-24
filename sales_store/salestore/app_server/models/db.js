var mongoose = require('mongoose');
 mongoose.Promise = global.Promise;

db = mongoose.connect('mongodb://127.0.0.1/store');

db.exports = db;