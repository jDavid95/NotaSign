const express = require("express");


const signupRoute = require("./signup");
const userLoginRoute = require("./userLogin");
const notaryPublicLoginRoute = require("./notaryPublicLogin");
const notaryPublicDashboardRoute = require("./notaryPublicDashboard");
const userDashboardRoute = require("./userDashboard");

const router = express.Router();

module.exports = () => {
	router.get("/", (req, res) => {
		
		let fullName = "";

		if(req.user) {
			fullName = req.user.firstName + " " + req.user.lastName;
		} 

		res.render("index", { userLoggedIn: req.user, fullName: fullName });
	});

	router.get("/logout", (req, res, next) => {
		req.logout(function (err) {
			if (err) {
				return next(err);
			}
			res.redirect("/");
		});
	});

	router.use("/signup", signupRoute());
	router.use("/userLogin", userLoginRoute());
	router.use("/notaryPublicLogin", notaryPublicLoginRoute());
	router.use("/notaryPublicDashboard", notaryPublicDashboardRoute());
	router.use("/userDashboard", userDashboardRoute());

	return router;
};
