var express = require('express');
var router = express.Router();
const {
  store,
  index,
  show,
  update,
  destroy,
  showByAccountNumber,
  showByIdentityNumber
} = require('../controllers/user');
const verifyToken = require('../middlewares/verifyToken');
const { cacheUsers } = require('../cache/cache');

router.get('/', verifyToken, cacheUsers, index)
router.get('/:id', verifyToken, show)
router.get('/account-number/:accountNumber', verifyToken, cacheUsers, showByAccountNumber)
router.get('/identity-number/:identityNumber', verifyToken, cacheUsers, showByIdentityNumber)
router.post('/', verifyToken, store)
router.put('/:id', verifyToken, update)
router.delete('/:id', verifyToken, destroy)

module.exports = router;
