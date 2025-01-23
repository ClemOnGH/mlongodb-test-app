const router = require('express').Router();
const { userRegisterGet, userRegisterPost, userLoginGet, userLoginPost } = require('../controllers/functions.js');

router.get('/register', userRegisterGet);

module.exports = router;
