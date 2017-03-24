var db = require('../models/db');
var mongoose = require('mongoose');
var categoryModel = require('../models/category');

module.exports = {

	createcategory: function(req, res){

		var cate = categoryModel({
			name: req.body.name,
		});
		cate.save(function(err, result){
			if (err) throw err;
			res.status(200).json({
			success: true,
			message:'registred ok',
			});
		});

	},

	showcat: function(req, res){

		categoryModel.find(function(err, result){
			if (err) throw err;
			res.send(result);
			});
	},

	subcat: function(req, res){
		var cat = req.body.cat;
		var sub = req.body.subcat;
		
	categoryModel.findOne({name: cat}, function(err, category){

			category.subcat.push(sub);
			category.save(function(error){
				if (error) throw error;
			})

			res.status(200).json({
			success: true,
			message:'registred ok',
			});
		})
	},

	scat: function (req, res){
			var val = req.query.name;
			categoryModel.findOne({name: val}, function(err, result){
				if (err) throw err;
				res.send(result);
			});
		}
	
}