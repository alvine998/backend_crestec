var express = require('express');
var router = express.Router();
const cPurchases = require('../apps/controllers/purchase.controller')
const app = express()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', cPurchases.list)
router.get('/single', cPurchases.single)
router.post('/', cPurchases.create)
router.patch('/', cPurchases.update)
router.patch('/status', cPurchases.update_status)
router.patch('/done', cPurchases.update_final)
router.delete('/', cPurchases.delete)

module.exports = router;
