var express = require('express');
var router = express.Router();
var ctrlUser = require('../controllers/user');
var ctrlBillet = require('../controllers/billet');
var ctrlComment = require('../controllers/comment');
var ctrlFriend = require('../controllers/friend');
var jwt = require('express-jwt');
var app = express();
var path = require('path');

router.post('/register', ctrlUser.register);
router.post('/login', ctrlUser.login );
router.get('/show', ctrlUser.show);
router.post('/post', ctrlBillet.post);
router.get('/chatshow/:email', ctrlBillet.chatshow);
router.post('/search', ctrlUser.search);
router.get('/page', ctrlBillet.page);
router.post('/comment', ctrlComment.envoi);
router.get('/avis', ctrlComment.visu);
router.post('/friend', ctrlFriend.ask);
router.get('/list', ctrlFriend.list);
router.get('/agree', ctrlFriend.agree);
router.get('/disagree', ctrlFriend.disagree);
router.get('*', function(req, res){
	res.sendFile(path.join('/home/didierpotiron/rendu/MEAN_RollerCoaster/myTwitos', '/public/index.html'))});



module.exports = router;
