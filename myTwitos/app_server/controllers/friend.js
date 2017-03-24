var mongoose = require('mongoose');
var userModel = require('../models/user');
var db = require('../models/db');
var url = require('url');
var ObjectId = require('mongodb').ObjectId;

module.exports={
	ask: function(req, res){
		var amis = req.body.friend;
		var email = req.body.email;
		userModel.findOne({email:email}).exec(
			function(err,user){
				user.friend.push(amis);
				user.save(function(err){
					if (err) throw err;
				});
				res.send(user);
			});

		userModel.findOne({email:amis}).exec(
			function(err,user){
				user.ask.push(email);
				user.save(function(err){
					if (err) throw err;
				});
				res.end('hello');
			});
	},

	list: function(req, res){

		var email = req.query.mail;
		console.log(req.query.mail);
		userModel.findOne({ email: email}).exec(
			function(err, user){
				if(err) throw err;
				res.send(user);
			}
			)


	},

	agree: function(req, res){
		var amis = 'tatat@yaho.fr';
		var email = 'coucou@r.fr';
		userModel.findOne({ email: email }).exec(

			function(err, user){
				user.friend.push({ amis });
				user.update({$pull:{ ask: amis }}, function(err, result){
					if (err) throw err; 
				 // res.send(result);

				});
				user.save( function(err){
					if(err) throw err;
				});
				res.send(user);
				console.log(user);
				res.end('hello');
			}
			);


	},

	disagree: function(req, res){

		var email = req.query.mail;
		console.log(req.query.mail);
		userModel.findOne({ email: email}).exec(
			function(err, user){
				if(err) throw err;
				res.send(user);
			}
			)


	}
}