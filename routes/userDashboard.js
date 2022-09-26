const express = require("express");
const multerMiddleware = require("./multer");
const User = require("../schemas/user");
const crypto = require("crypto");

const router = express.Router();

module.exports = () => {
	router.get("/", redirectIfUserNotLoggedIn, redirectIfNotaryPublicLoggedIn, (req, res) => {
		let fullName = req.user.firstName + " " + req.user.lastName;
		let userDashboardTable = createUserDashboardTable(req.user);

		res.render("userDashboard", { fullName: fullName, table: userDashboardTable, error: req.query.error });
	});

	router.post("/userUploadPDF", multerMiddleware.upload.single("pdfFile"), multerMiddleware.checkForPDF, async (req, res, next) => {

        try {

            if(!req.file) res.redirect("/userUploadPDF?error=noFile");

            let newPDFName = crypto.randomBytes(5).toString("hex") + ".pdf";

            const user = await User.findByIdAndUpdate(req.user._id, {$push: {"document": {documentName: newPDFName, documentBuffer: req.file.buffer}}})

            const savedUser = await user.save();

            if(savedUser) return res.redirect("/userDashboard");
            return next(new Error('Failed to save user for unknown reasons'));
        } catch (err) {
            return next(err);
        }
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

	user.document.forEach(document => {
		
		let documentCompleted = ""
		let documentCompletedClass = "";

		if(document.documentCompleted) {
			documentCompleted = "Completed"
			documentCompletedClass = "bg-success"
		} else {
			documentCompleted = "Not Completed"
			documentCompletedClass = "bg-danger"
		}

		table += 
		`<tr>
			<td>${document.documentName}</td>
			<td class="${documentCompletedClass} text-center">${documentCompleted}</td>
			<td class="text-center"><a href="/pdf/${document.documentName}" target="_blank" class="btn btn-sm rounded-0 bi bi-filetype-pdf pe-5 ps-5 me-3" type="button"></a></td>
			<td class="text-center"><button id="${document.documentName}" class="btn btn-sm btn-danger rounded-0 bi bi-trash me-3" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal"></button></td>
		</tr>`
	});

	return table;
};
