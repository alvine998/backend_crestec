var express = require('express');
var router = express.Router();
const cStorages = require('../apps/controllers/storage.controller')
const app = express()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', cStorages.list)
router.get('/single', cStorages.single)
router.post('/', cStorages.create)
router.patch('/', cStorages.update)
router.patch('/status', cStorages.update_status)
router.patch('/done', cStorages.update_final)
router.delete('/', cStorages.delete)

module.exports = router;
