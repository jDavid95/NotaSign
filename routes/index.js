const express = require("express");
const path = require("path");
const fsExtra = require('fs-extra');

const signupRoute = require("./signup");
const userLoginRoute = require("./userLogin");
const notaryPublicLoginRoute = require("./notaryPublicLogin");

// Notary Public Routes

const notaryPublicDashboardRoute = require("./notaryPublicDashboard");

// User Routes

const userDashboardRoute = require("./userDashboard");

// Pdf Route

const viewPDFRoute = require("./pdf");

const router = express.Router();

module.exports = () => {
	router.get("/", (req, res) => {
		
		let fullName = "";
		let notaryPublicLoggedIn = false;

		if(req.user) {
			fullName = req.user.firstName + " " + req.user.lastName;
			if(req.user.notaryPublic) {
				notaryPublicLoggedIn = true;
			}
		} 

		res.render("index", { anyUserLoggedIn: req.user, notaryPublicLoggedIn: notaryPublicLoggedIn, fullName: fullName });
	});

	router.get("/logout", (req, res, next) => {
		
		let pathToPDF = path.join(__dirname, "..", `/pdf`)

		req.logout(function (err) {
			if (err) {
				return next(err);
			}
			fsExtra.emptyDirSync(pathToPDF);
			res.redirect("/");
		});
	});

	router.use("/signup", signupRoute());
	router.use("/userLogin", userLoginRoute());
	router.use("/notaryPublicLogin", notaryPublicLoginRoute());
	router.use("/notaryPublicDashboard", notaryPublicDashboardRoute());
	router.use("/userDashboard", userDashboardRoute());
	router.use("/pdf", viewPDFRoute());

	return router;
};
