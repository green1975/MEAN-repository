var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var mongoose = require('mongoose');
var userModel = require('../models/users');
var db = require('../models/db');

module.exports={
register: function(req, res){
	var user = userModel({
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, salt)
	})
	var email = req.body.email;
	userModel.findOne({email: email}, function(erreur, email){
		if (email == null){
			user.save(function(err){
				if (err) throw err;
				res.status(200).json({
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
	userModel.findOne({email: email}, function(err, user){
		bcrypt.compare(req.body.password, user.password, function(err, result){
			if (result == true){
				res.end('you are logged !');
			}
			else 
				throw err;
		});

	});

},
show: function(req, res){
	userModel.find(function(err, list){
		if (err) return console.log(err)
			var result = res.send(list);
		res.end('base chargee');
		;

	})

}


 }