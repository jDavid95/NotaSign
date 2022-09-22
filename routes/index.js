const express = require("express");

const signupRoute = require("./signup");
const userLoginRoute = require("./userLogin");
const notaryPublicLoginRoute = require("./notaryPublicLogin");
const notaryPublicDashboardRoute = require("./notaryPublicDashboard");
const userDashboardRoute = require("./userDashboard");

const router = express.Router();

module.exports = () => {
	router.get("/", (req, res) => {
		res.render("index");
	});

	router.use("/signup", signupRoute());
	router.use("/userLogin", userLoginRoute());
	router.use("/notaryPublicLogin", notaryPublicLoginRoute());
	router.use("/notaryPublicDash", notaryPublicDashboardRoute());
	router.use("/userDash", userDashboardRoute());

	return router;
};
