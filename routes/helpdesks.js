var express = require('express');
var router = express.Router();
const cHelpdesks = require('../apps/controllers/helpdesk.controller')
const app = express()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', cHelpdesks.list)
router.get('/single', cHelpdesks.single)
router.post('/', cHelpdesks.create)
router.patch('/', cHelpdesks.update)
router.patch('/status', cHelpdesks.update_status)
router.patch('/done', cHelpdesks.update_final)
router.delete('/', cHelpdesks.delete)

module.exports = router;
