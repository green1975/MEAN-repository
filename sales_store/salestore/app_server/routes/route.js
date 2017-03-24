var mongoose = require('mongoose');
var http = require('http');
var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'uploads' });
var ctrlUser = require('../controllers/usercontroller');
var ctrlProduct = require('../controllers/productcontroller');
var ctrlAuction = require('../controllers/encherecontroller');
var ctrlCategory = require('../controllers/categorycontroller');

router.post('/register', ctrlUser.register);
router.post('/login', ctrlUser.login);
router.post('/creation', ctrlProduct.creation);
router.get('/show', ctrlProduct.show);
router.post('/newauction', ctrlAuction.newauction);
router.get('/listauction', ctrlAuction.listauction);
router.get('/showprod', ctrlProduct.showprod);
router.get('/showuser', ctrlUser.showuser);
router.get('/deleteuser', ctrlUser.deleteuser);
router.get('/deleteproduct', ctrlProduct.deleteproduct);
router.get('/editproduct', ctrlProduct.editproduct);
router.get('/fichuser', ctrlUser.fichuser);
router.post('/modifyproduct', ctrlProduct.modifyproduct);
router.post('/modifyuser', ctrlUser.modifyuser);
router.get('/search', ctrlUser.search);
router.get('/search2', ctrlUser.search2);
router.get('/search1', ctrlProduct.search1);
router.post('/newcategory', ctrlCategory.createcategory);
router.get('/affichage', ctrlCategory.showcat);
router.get('/myauction', ctrlAuction.showauct);
router.post('/subcat', ctrlCategory.subcat);
router.post('/uploads', upload.single('files'), function(req, res, next) {
    console.log(req.body); // this contains all text data
    console.log(req.body.files); // this is always an empty array
    console.log("Server: got file ");
});
router.get('/subcat', ctrlCategory.scat);
router.get('/foundprod', ctrlProduct.found);
router.get('*', function(req, res){
	res.render(path.join('/home/didierpotiron/rendu/sales_store/salestore','/public/index.html'))
console.log(__dirname);
});
module.exports = router;