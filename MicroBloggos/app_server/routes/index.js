var express = require('express');
var router = express.Router();
var ctrlAuth = require('../controllers/authentication');
var ctrlBillet = require('../controllers/billet');
/* GET home page. */

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login );
router.get('/show', ctrlAuth.show);
router.post('/sauvegarde', ctrlBillet.sauvegarde);
router.get('/affichage', ctrlBillet.affichage)


module.exports = router;
