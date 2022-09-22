const express = require("express");

const router = express.Router();

module.exports = () => {
	router.get("/", (req, res) => {
		res.render("notaryPublicLogin");
	});

	router.post("/", (req, res) => {
		res.redirect("/");
	});

	return router;
};
