var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
db = mongoose.connect('mongodb://localhost/twitos', function(err){
	if (err) throw err;
}),

db.exports = db;