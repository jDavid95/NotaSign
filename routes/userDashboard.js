const express = require("express");

const router = express.Router();

module.exports = () => {
	router.get("/", redirectIfUserNotLoggedIn, redirectIfNotaryPublicLoggedIn, (req, res) => {
		let fullName = req.user.firstName + " " + req.user.lastName;
		res.render("userDashboard", { userFullName: fullName });
	});

	return router;
};

function redirectIfUserNotLoggedIn(req, res, next) {
	if (!req.user) return res.redirect('/userDashboard');
	return next();
};

function redirectIfNotaryPublicLoggedIn(req, res, next) {
	if (req.notaryPublic) return res.redirect('/notaryPublicDashboard');
	return next();
};