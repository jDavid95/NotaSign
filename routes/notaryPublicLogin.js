const express = require("express");
const passport = require("passport");

const router = express.Router();

module.exports = () => {
	router.get("/", (req, res) => {
		res.render("notaryPublicLogin", { success: req.query.success });
	});

	router.post("/", passport.authenticate("notaryPublicLocal", { successRedirect: "/", failureRedirect: "/userLogin?success=false" }));

	return router;
};
