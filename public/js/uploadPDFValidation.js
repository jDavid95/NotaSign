const uploadForm = document.getElementById("uploadForm");

uploadForm.addEventListener("submit", (e) => {
	
    // Remove all previous errors

    document.getElementById("userUploadError").setAttribute("hidden", "hidden");
	document.getElementById("userUploadExtensionError").setAttribute("hidden", "hidden");

	let file = document.getElementById("pdfFile").value;
	let fileExt = getExtension(file);

	if (file == "") {
		e.preventDefault();
		document.getElementById("userUploadError").removeAttribute("hidden");
	} else if (fileExt != "pdf") {
		e.preventDefault();
		document.getElementById("userUploadExtensionError").removeAttribute("hidden");
	}
});

document.getElementById("userUploadErrorClose").addEventListener("click", () => {
	document.getElementById("userUploadError").setAttribute("hidden", "hidden");
});

document.getElementById("userUploadExtensionErrorClose").addEventListener("click", () => {
	document.getElementById("userUploadExtensionError").setAttribute("hidden", "hidden");
});

function getExtension(fileName) {
	let parts = fileName.split(".");
	parts = parts[parts.length - 1];
	return parts;
}
