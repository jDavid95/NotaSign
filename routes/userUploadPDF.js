const express = require("express");
const multerMiddleware = require("./multer");
const User = require("../schemas/user");
const crypto = require("crypto");

const router = express.Router();

module.exports = () => {
	router.get("/", redirectIfUserNotLoggedIn, redirectIfNotaryPublicLoggedIn, (req, res) => {
		let fullName = req.user.firstName + " " + req.user.lastName;
		res.render("userUploadPDF", { fullName: fullName, error: req.query.error });
	});

    router.post("/", multerMiddleware.upload.single("pdfFile"), multerMiddleware.checkForPDF, async (req, res, next) => {

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


