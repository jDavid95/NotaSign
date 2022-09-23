const express = require("express");

const router = express.Router();

module.exports = () => {
	router.get("/", redirectIfUserLoggedIn, redirectIfNotaryPublicNotLoggedIn, (req, res) => {
		let fullName = req.notaryPublic.firstName + " " + req.notaryPublic.lastName;
		res.render("notaryPublicDashboard",  { fullName: fullName });
	});

	return router;
};

function redirectIfUserLoggedIn(req, res, next) {
	if (req.user) return res.redirect("/userDashboard");
	return next();
};

function redirectIfNotaryPublicNotLoggedIn(req, res, next) {
	if (!req.notaryPublic) return res.redirect("/notaryPublicLogin?loggedIn=false");
	return next();
};