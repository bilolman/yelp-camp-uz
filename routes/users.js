const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');

router
	.route('/register')
	.get(users.getRegisterForm)
	.post(catchAsync(users.register));

router
	.route('/login')
	.get(users.getLoginForm)
	.post(
		passport.authenticate('local', {
			failureFlash: true,
			failureRedirect: '/login',
		}),
		users.login
	);

router.get('/logout', users.logout);

module.exports = router;
