const express = require('express');
const router = express.Router({mergeParams:true});
const userController = require('../controllers/userController');

router.post('/login',userController.login);
router.post('/signup',userController.signup);
router.get('/logout',userController.logout);

module.exports = router;
