const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports.upload = upload;

module.exports.checkForPDF = (req, res, next) => {
  if (!req.file) return next();
  if (req.file.mimetype !== "application/pdf") {
    return res.redirect("/userUploadPDF?error=notPDF"); // Update that sends you back to PDF page but with error message
  }

  return next();
};