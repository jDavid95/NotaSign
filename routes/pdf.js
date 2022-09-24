const express = require("express");
const User = require("../schemas/user");

var fs = require("fs");
var path = require("path");

const router = express.Router();

module.exports = () => {
	router.get("/:pdfName", redirectIfAnyUserNotLoggedIn, async (req, res) => {

        let pdfName = req.params.pdfName;

        if(!req.user.notaryPublic) {
		
            let document = findDocumentInUser(req.user, pdfName);

            if(!document) {
                res.redirect("/userDashboard?pdf=noAccess");
            } else {
                generatePDF(pdfName, document.documentBuffer);
                res.sendFile(path.join(__dirname, "..", `/pdf/${pdfName}`));
            }
            
        } else {

            let user = await User.findOne({documentName: { $elemMatch: {documentName: pdfName}}}).exec();
            let document = findDocumentInUser(user, pdfName);
            
            if(!document) {
                res.redirect("/notaryPublicDashboard?pdf=dne");
            } else {
                generatePDF(pdfName, document.documentBuffer);
                res.sendFile(path.join(__dirname, "..", `/pdf/${pdfName}`));
            }
        }
	});

	return router;
};

function redirectIfAnyUserNotLoggedIn(req, res, next) {
	if (!req.user) return res.redirect("/?loggedIn=false");
	return next();
};

function findDocumentInUser(user, pdfName) {

    let pdfToSend;

    user.document.forEach(document => { 
        if(document.documentName === pdfName) {
            pdfToSend = document;
        }
    });

    return pdfToSend;
};

function generatePDF(pdfName, buffer) {

    const pathToPDFFolder = path.join(__dirname, "..", `/pdf/${pdfName}`);

    fs.writeFileSync(pathToPDFFolder, buffer);
};