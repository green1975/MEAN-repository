var mongoose = require('mongoose');
var db = require('../models/db');
var productModel = require('../models/product');
var userModel = require('../models/user');
var ObjectId = require('mongodb').ObjectID;
var multer = require('multer');
var express = require('express');
var app = express();


module.exports = {

	creation: function(req, res){

		var product = productModel({

			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			category: req.body.category,
			subcategory: req.body.subcategory,
			enddate: req.body.enddate,
		});
		var email = req.body.email;
		product.save(function(err, result){
			if (err) throw err;
			userModel.findOne({email:email}, function(erreur, user){
				user.product.push(result._id);
				user.save(function(error){
					if (error) throw error;
				});
			});
			res.send(result);	
		});

	},

	show: function(req, res){
		var email = req.query.email;
		userModel.findOne({email: email}, function(err, list){

			if (err) throw err;

			productModel.find( {_id: {$in: list.product}}, function(erreur, result){
				res.send(result);
			});
		});
	},

	showprod: function (req, res){
		productModel.find(function(err, result){
			res.send(result);
		});
	},

	deleteproduct: function(req, res){
		var prod = req.query.id;

		productModel.remove({_id: ObjectId(prod)}, function(err, result){
			if (err) throw err;
			res.send('product removed');
		});
	},

	editproduct: function(req, res){
		var id = req.query.edit;

		productModel.findOne({ _id: ObjectId(id)}, function(err, result){
			if (err) throw err;
			res.send(result);
		});

	},

	modifyproduct: function(req, res){

		var id = req.body.id;
		productModel.update({_id: ObjectId(id)}, {$set: {'name': req.body.name, 'description': req.body.description, 'price': req.body.price}}, function(err, result){
			if (err) throw err;

			res.status(200).json({
				success: true,
				message: 'change ok',
			});
		});
	},

	upload:	function (req, res){
		    multer({ dest: '../upload'}, function(err, result){
			if (err) throw err;
			res.status(200).json({
				success: true,
				message: 'file uploaded',
			});
		});	
	},
	found: function(req, res){
		var subct = req.query.subcat;
		productModel.find({subcategory: subct}, function(err, result){
			if (err) throw err;
			res.send(result);
		})
	},
	search1: function (req, res){
		var research = req.query.research;
		var re = new RegExp(research);
		console.log(re);
		productModel.find({ name: re }, function(err, result){
			res.send(result);
		})
	}
}

		