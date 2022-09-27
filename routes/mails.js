var express = require('express');
var router = express.Router();
const cMails = require('../apps/controllers/email.controller')
const app = express()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', cMails.list)
router.get('/single', cMails.single)
router.post('/', cMails.create)
router.patch('/', cMails.update)
router.patch('/status', cMails.update_status)
router.patch('/done', cMails.update_final)
router.delete('/', cMails.delete)

module.exports = router;
