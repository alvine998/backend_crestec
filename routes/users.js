var express = require('express');
var router = express.Router();
const cUsers = require('../apps/controllers/user.controller')
const app = express()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', cUsers.list)
router.get('/single', cUsers.single)
router.post('/', cUsers.create)
router.post('/auth', cUsers.login)
router.patch('/', cUsers.update)
router.patch('/edit/password', cUsers.change_password)
router.delete('/', cUsers.delete)

module.exports = router;
