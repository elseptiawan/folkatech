express = require('express');
var router = express.Router();
const {
  generateToken
} = require('../controllers/token');  


router.get('/generate-token', generateToken);

module.exports = router;
