var express = require('express');
var router = express.Router();
const cJobs = require('../apps/controllers/job.controller')
const app = express()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', cJobs.list)
router.get('/single', cJobs.single)
router.post('/', cJobs.create)
router.patch('/', cJobs.update)
router.patch('/status', cJobs.update_status)
router.patch('/done', cJobs.update_final)
router.delete('/', cJobs.delete)

module.exports = router;
