const express = require("express");
const User = require("../schemas/user");

const router = express.Router();

module.exports = () => {
	router.get("/", redirectIfUserLoggedIn, redirectIfNotaryPublicNotLoggedIn, (req, res) => {
		let fullName = req.user.firstName + " " + req.user.lastName;
		createNotaryPublicDashboardTable();
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
	
	if (!req.user) return res.redirect("/notaryPublicLogin?loggedIn=false");

	return next();
};

async function createNotaryPublicDashboardTable() {


	let allUsers = await User.find({}).exec();

	allUsers.forEach(user => {
		user.document.forEach(document => {
			console.log(document.documentName);
		})
	})

	// let table = ""

	// user.document.forEach(document => {
		
	// 	let documentCompleted = ""
	// 	let documentCompletedClass = "";

	// 	if(document.documentCompleted) {
	// 		documentCompleted = "Completed"
	// 		documentCompletedClass = "bg-success"
	// 	} else {
	// 		documentCompleted = "Not Completed"
	// 		documentCompletedClass = "bg-danger"
	// 	}

	// 	table += 
	// 	`<tr>
	// 		<td>${document.documentName}</td>
	// 		<td class="${documentCompletedClass} text-center">${documentCompleted}</td>
	// 		<td class="text-center"><a href="/pdf/${document.documentName}" target="_blank" class="btn btn-sm rounded-0 bi bi-filetype-pdf pe-5 ps-5 me-3" type="button"></a></td>
	// 		<td class="text-center"><button class="btn btn-sm btn-danger rounded-0 bi bi-trash me-3" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"></button></td>
	// 	</tr>`
	// });

	// return table;
};
