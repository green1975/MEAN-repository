var mongoose = require('mongoose');
var billetModel = require('../models/mess');
var userModel = require('../models/users');
var db = require('../models/db');

module.exports = {
	sauvegarde: function(req, res){
		var post = billetModel({
			message: req.body.mess.message,
			})
		var use = req.body.mess.name;
		console.log(use);
		 post.save(function(err, result){
		 	console.log(result._id);
			userModel.findOne({email:use}).exec(
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
	
	affichage: function(req, res){
		userModel.find(function(err, list){
			if (err) return console.log(err)
				var result = res.send(list);
			res.end('base charge');
				;
			
		})

	}

}
 