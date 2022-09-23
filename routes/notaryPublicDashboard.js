const express = require("express");

const router = express.Router();

module.exports = () => {
	router.get("/", redirectIfUserLoggedIn, redirectIfNotaryPublicNotLoggedIn, (req, res) => {
		let fullName = req.user.firstName + " " + req.user.lastName;
		res.render("notaryPublicDashboard",  { fullName: fullName });
	});

	return router;
};


function redirectIfUserLoggedIn(req, res, next) {
	
	if(req.user) {
		if(!req.user.notaryPublic) return res.redirect("/userDashboard");
	}

	return next();
};

function redirectIfNotaryPublicNotLoggedIn(req, res, next) {

	if(req.user) {
		if(!req.user.notaryPublic) return res.redirect("/notaryPublicLogin");
	}

	return next();
};