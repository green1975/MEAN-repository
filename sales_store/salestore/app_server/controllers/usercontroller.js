var mongoose = require('mongoose');
var userModel = require('../models/user');
var db = require('../models/db');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var productModel = require('../models/product');


module.exports = {
	register:function(req, res){
		var user = userModel({
			username: req.body.username,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, salt),
		});

		var email = req.body.email;
		
		userModel.findOne({email: email}, function(erreur, result){
			if (result == null){
				user.save(function(err){
					if (err) throw err;
					res.status(200).json({
						success:true,
						message: 'user created',
					})

				});
			}
			else {
				res.status(409).json({
					success:false,
					message: 'already exist',
				})
			}
		});

		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'sender@gmail.com',
				pass: 'password'
			}
		});
		var mailOptions = {
			from: 'sale@sale.com',
			to: req.body.email,
			subject: 'confirmation inscription',
			text: 'your confirmation',
			html: '<b>' + 'your confirmation' + '</b>'
		};

		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				return console.log(error);
			}
			console.log('Message sent: ' + info.response);
		});

		transporter.close();
		
	},

	login:function(req, res){
		var user = {
			email: req.body.email,
			password: req.body.password,
		};
		var email = req.body.email;
		userModel.findOne({email:email}, function(erreur, result){
			if (result != null){

				if ((bcrypt.compareSync(req.body.password, result.password)) == true ){
					var token = jwt.sign(user,'secret', {
						expiresIn: 1440
					});
					res.json({
						success: true,
						email: result.email,
						token: token,
						val: result.val,
					});

				// res.end('fini');
			}
			else{
				res.json({
					success: false,
					message: 'bad password',
				})
			}
		}
		else{
			res.json({ 
				success: false,
				message: 'bad email !!'
			});

		}
	})
	},

	showuser: function (req, res){

		userModel.find( function(err, list){

			if (err) throw err;
			res.send(list);
		});
	},

	deleteuser: function(req, res){
		var mail = req.query.email;
		userModel.remove({email: mail}, function(err, result){
			if (err) throw err;
			res.send(result);
		});

		productModel.remove({email: mail}, function(erreur, response){
			if (erreur) throw erreur;
		});
	},

	fichuser: function(req, res){
		var mail = req.query.fich;
		console.log('hello');
		console.log(mail);
		userModel.findOne({email: mail}, function(err, result){
			if (err) throw err;
			console.log(result);
			res.send(result);
		});
	},

	modifyuser: function(req, res){

		var mail = req.body.email;

		userModel.update({email: mail}, {$set: { email: req.body.email, username: req.body.username}}, function(err, result){
			if (err) throw err; 
			res.status(200);json({
				success: true,
				message: 'change ok',
			});
		});
	},

	search: function (req, res){
		var research = req.query.research;
		var re = new RegExp(research);

		userModel.find({ username: re }, function(err, result){
			res.send(result);
		})
	},

	search2: function (req, res){
		var research = req.query.research;
		var re = new RegExp(research);

		userModel.find({ email: re }, function(err, result){
			res.send(result);
		})
	}

} 