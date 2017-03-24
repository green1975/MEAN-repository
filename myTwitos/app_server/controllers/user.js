var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var mongoose = require('mongoose');
var userModel = require('../models/user');
var db = require('../models/db');

module.exports={
	register: function(req, res){
		var user = userModel({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, salt),
			codepostale: req.body.codepostale
		})
		var email = req.body.email;
		userModel.findOne({email: email}, function(erreur, email){
			if (email == null){
				// user.save(function(err){
				// 	if (err) throw err;
				// 	res.status(200).json({
				// 		success: true,
				// 		message: "User registered succesfully."
				// 	});
				// });
		user.save(function(err) {
			var token;
			token = user.generateJwt();
			res.status(200);
			res.json({
				"token" : token,
				success: true,
				message: "User registered succesfully."
			});

		});


	}
	else {
		res.status(409).json({
			success: false,
			message: "User already exists."
		});
	}

})
	},

	login: function(req, res){
		var email = req.body.email;

		userModel.findOne({email: email}, function(error, user){
				if (error || !user) {
					return res.status(401).json({
						message : "error"
					});
				}
					bcrypt.compare(req.body.password, user.password, function(error, result){
					if (result == true){
						token = user.generateJwt();
						res.status(200);
						res.json({
							"token" : token,
							"email" : email,
							"name" : user.firstname
						});

					}
					else 
					error ="mauvais login";
					res.send(error);
				});

		});
	},

		show: function(req, res){
			userModel.find(function(err, list){
				if (err) return console.log(err)
					var result = res.send(list);
				res.end('base chargee');

			})

		},

		search: function(req, res){
			var name = req.body.search;
			userModel.find({firstname: name}, function(err, result){
				if (err) return console.log(err)
					var result = res.send(result);
				res.end('base chargee');

			})

		}


	 }