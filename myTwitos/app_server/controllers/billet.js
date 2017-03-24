var mongoose = require('mongoose');
var billetModel = require('../models/billets');
var userModel = require('../models/user');
var db = require('../models/db');
var url = require('url');
var ObjectId = require('mongodb').ObjectId;

module.exports={
	post: function(req, res){
		var billet = billetModel({
			message: req.body.message,
			name: req.body.name,
		});
		var email = req.body.email;
		billet.save(function(err, result){
			userModel.findOne({email:email}).exec(
				function(err,user){
					user.posts.push(result._id);
					user.save(function(err){
						if (err) throw err;
					});
				})
			if (err) throw err;
			res.end('Send successfully');
		})

	},

	chatshow: function(req, res){
		var email = req.params.email;
		userModel.findOne({email:email}).exec(
			function(err, list){
				if (err) return console.log(err)
					billetModel.find({_id: {$in: list.posts}}, function(err, result){
						if(err) return console.log(err)
							res.send(result);
						res.end('base chargee');
					});

			})

	},
	page:function(req, res){
		var email = req.query.mail;
		// userModel.findOne({email:email}).exec(
		// 	function(err, list){
		// 		if (err) return console.log(err);

		// 		billetModel.find({_id: {$in: list.posts}}, function(err, result){
		// 			if(err) return console.log(err)
		// 				res.send(result);
		// 		});

		// 		// res.end('base chargee');

		// 	});
		userModel.findOne({email: email})
		.populate('posts')
		.exec(function(err, user) {
		res.send(user);
		});

	} 
}