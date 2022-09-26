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

            let user = await User.findOne({document: { $elemMatch: {documentName: pdfName}}}).exec();
            
            if(!user) {
                console.log("AQUI ESTAMOS")
                res.redirect("/notaryPublicDashboard?pdf=dne");
            } else {
                let document = findDocumentInUser(user, pdfName);
                generatePDF(pdfName, document.documentBuffer);
                res.sendFile(path.join(__dirname, "..", `/pdf/${pdfName}`));
            }
        }
	});

    router.get("/deletePDF/:pdfName", redirectIfAnyUserNotLoggedIn, async (req, res) => { 
        
        let pdfName = req.params.pdfName;

        if(!req.user.notaryPublic) {
		
            let document = findDocumentInUser(req.user, pdfName);

            if(document) {
                console.log("in here")
                const user = await User.findOneAndUpdate({document: { $elemMatch: {documentName: pdfName}}}, {$pull: {"document": {documentName: pdfName}}}).exec();
                const savedUser = await user.save();
                if(savedUser) return res.redirect("/userDashboard?pdf=success");
                return next(new Error('Failed to save user for unknown reasons'));
            }
            
        } else {

            let possibleUserWithDocument = await User.findOne({document: { $elemMatch: {documentName: pdfName}}}).exec();

            if(possibleUserWithDocument){
                const user = await User.findOneAndUpdate({document: { $elemMatch: {documentName: pdfName}}}, {$pull: {"document": {documentName: pdfName}}}).exec();
                const savedUser = await user.save();
                if(savedUser) return res.redirect("/notaryPublicDashboard?pdf=success");
            }
        }

        if(!req.user.notaryPublic) {
            res.redirect("/userDashboard?pdf=noAccess");
        } else {
            res.redirect("/notaryPublicDashboard?pdf=dne");
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