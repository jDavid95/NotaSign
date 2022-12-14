const express = require("express");
const passport = require("passport");

const router = express.Router();

module.exports = () => {
	router.get("/", redirectIfUserLoggedIn, redirectIfNotaryPublicLoggedIn, (req, res) => {
		res.render("userLogin", { success: req.query.success, loggedIn: req.query.loggedIn });
	});

	router.post("/", passport.authenticate("userLocal", { successRedirect: "/userDashboard?login=success", failureRedirect: "/userLogin?success=false" }));

	return router;
};

function redirectIfUserLoggedIn(req, res, next) {
	
	if(req.user) {
		if(!req.user.notaryPublic) return res.redirect("/userDashboard");
	}

	return next();
};

function redirectIfNotaryPublicLoggedIn(req, res, next) {

	if(req.user) {
		if(req.user.notaryPublic) return res.redirect("/notaryPublicDashboard");
	}

	return next();
};