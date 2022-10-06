var express = require('express');
var router = express.Router();
const cNotif = require('../apps/controllers/notification.controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/notification/list', cNotif.list)


module.exports = router;
