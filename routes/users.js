const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');
const { validateUser } = require('../middleware/middleware.js');

router.route('/signup')
    .get(users.renderSignup)
    .post(validateUser,users.signup);

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),users.login);

router.get('/logout',users.logout);

module.exports=router;
