const express = require("express");

const router = express.Router();

module.exports = () => {
	router.get("/", redirectIfUserNotLoggedIn, redirectIfNotaryPublicLoggedIn, (req, res) => {
		let fullName = req.user.firstName + " " + req.user.lastName;
		res.render("userDashboard", { fullName: fullName });
	});

	return router;
};

function redirectIfUserNotLoggedIn(req, res, next) {
	if (!req.user) return res.redirect("/userLogin?loggedIn=false");
	return next();
};

function redirectIfNotaryPublicLoggedIn(req, res, next) {
	
	if(req.user) {
		if(req.user.notaryPublic) return res.redirect("/notaryPublicDashboard");
	}

	return next();
};
