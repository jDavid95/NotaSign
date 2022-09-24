const express = require("express");
const User = require("../schemas/user");

const router = express.Router();

module.exports = () => {
	router.get("/", redirectIfUserNotLoggedIn, redirectIfNotaryPublicLoggedIn, (req, res) => {
		let fullName = req.user.firstName + " " + req.user.lastName;
		// let userDashboardTable = createUserDashboardTable(req.user);

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


function createUserDashboardTable(user) {

	let table = ""

	user.document.forEach(element => {
		let row = `<a class="Styling here"href="/pdf/${element.documentName} target="_blank">${element.documentName}</a>`
	});
	let row = `<a href>`

};
