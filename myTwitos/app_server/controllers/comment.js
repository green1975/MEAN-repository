var billetModel = require('../models/billets');
var userModel = require('../models/user');
var commentModel = require('../models/comments');
var db = require('../models/db');
var url = require('url');
var ObjectId = require('mongodb').ObjectId;

module.exports={
	envoi: function(req, res){
		var comments = commentModel({
			commentaire: req.body.commentaire,
			name: req.body.name,
		});

		var id = req.body.id;
		comments.save(function(err, result){
			billetModel.findOne({_id: id}).exec(
				function(err,billet){
					billet.avis.push(comments._id);
					billet.save(function(err){
						if (err) throw err;
					});
				})
			if (err) throw err;
			res.end('erreur');
		})

	},

	visu: function(req, res){
		var id = req.query.id;		
		billetModel.findOne({_id: id})
		.populate('avis')
		.exec(function(err, billet) {
			res.send(billet);
		});
	}
}