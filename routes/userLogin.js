const express = require("express");

const router = express.Router();

module.exports = () => {
	router.get("/", (req, res) => {
		res.render("userLogin");
	});

	router.post("/", (req, res) => {
		res.redirect("/");
	});

	return router;
};
