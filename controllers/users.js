const User = require('../models/user');

module.exports.getRegisterForm = (req, res) => {
	res.render('users/register');
};

module.exports.register = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const user = new User({ username, email });
		const newUser = await User.register(user, password);
		req.login(newUser, (err) => {
			if (err) return next(err);
			req.flash('success', 'Welcome to Yelp Camp!');
			res.redirect('/campgrounds');
		});
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('/register');
	}
};

module.exports.getLoginForm = (req, res) => {
	res.render('users/login');
};

module.exports.login = (req, res) => {
	req.flash('success', 'You are now logged in!');
	const redirectUrl = req.session.returnTo || '/campgrounds';
	delete req.session.returnTo;
	res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
	req.logout();
	req.flash('success', 'Goodbye!');
	res.redirect('/campgrounds');
};
