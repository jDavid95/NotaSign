const express = require("express");

const signupRoute = require("./signup");
const loginRoute = require("./login");
const notaryPublicDashboardRoute = require("./notaryPublicDashboard");
const userDashboardRoute = require("./userDashboard");

const router = express.Router();

module.exports = () => {
	router.get("/", (req, res) => {
		res.render("index");
	});

	router.use("/signup", signupRoute());
	router.use("/login", loginRoute());
	router.use("/notaryPublicDash", notaryPublicDashboardRoute());
	router.use("/userDash", userDashboardRoute());

	return router;
};
