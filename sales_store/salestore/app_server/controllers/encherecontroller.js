var mongoose = require('mongoose');
var db = require('../models/db');
var auctionModel = require('../models/enchere');
var productModel = require('../models/product');
var ObjectId = require('mongodb').ObjectID;

mongoose.Promise = global.Promise;

module.exports = {

	newauction: function(req, res){

		var auction = auctionModel({
			price: req.body.price,
			email: req.body.email,
			product: req.body.product,
		});
		var prod = req.body.product;
		var price =req.body.price;

		productModel.findOne({_id: ObjectId(prod)}, function(error, resultat){
			if (req.body.price > resultat.price){
				auctionModel.find({product: ObjectId(prod), price: {$gt:price}},function(erreur, results){
					
					if (results == 0){
						auction.save(function(err, result){
							if (err) throw err;
							productModel.update({_id: ObjectId(prod)},{$set: { auctions: { prix: result.price, mail: result.email} }}, function(error, product){

								// product.auctions.push(result._id);
								// product.save(function(erro, exit){
								// 	if (erro) throw erro;
								// });
							});
							res.status(200).json({
								success: true,
								value: result.price,
								mail: result.email,
								message: 'auction valid',
							});
						});
						
					}
					else{
						res.json({
							success: false,
							message: 'auction is too small',
						});
					}
				});
			}
			else{
				res.json({
					success: false,
					message: 'auction is under the initial price',
				});
			}
		})

	},

	listauction: function(req, res){

		var prod = req.query.product;
		auctionModel.find({product: ObjectId(prod)}, function(err, result){
			if (err) throw err;
			res.send(result);
		})
	},

	showauct: function(req, res){

		var mail = req.query.email;
		console.log(mail);
		auctionModel.find({email: mail}, function(err, result){
			if (err) throw err;
			res.send(result);
		})
	},

}