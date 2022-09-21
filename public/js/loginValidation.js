const loginForm = document.getElementById("loginForm");

const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

// Validates the form on the Client side, makes all fields are valid

loginForm.addEventListener("submit", (e) => {

    // Remove all previous errors
    
    document.getElementById("emailAddressLoginError").setAttribute("hidden", "hidden");
    document.getElementById("emailAddressLoginRegexError").setAttribute("hidden", "hidden");
    document.getElementById("passwordLoginError").setAttribute("hidden", "hidden");

	let emailAddress = document.getElementById("emailAddressLogin").value;
	let password = document.getElementById("passwordLogin").value;

	if (emailAddress == "") {
		e.preventDefault();
		document.getElementById("emailAddressLoginError").removeAttribute("hidden");
	} else if (!emailAddress.match(emailRegex)) {
		e.preventDefault();
		document.getElementById("emailAddressLoginRegexError").removeAttribute("hidden");
	}

	if (password == "") {
		e.preventDefault();
		document.getElementById("passwordLoginError").removeAttribute("hidden");
	} 
});

// When a user closes the error popup, this resets it so it can pop up again without having to refresh

// Email address errors

document.getElementById("emailAddressLoginErrorClose").addEventListener("click", () => {
	document.getElementById("emailAddressLoginError").setAttribute("hidden", "hidden");
});

document.getElementById("emailAddressLoginRegexClose").addEventListener("click", () => {
	document.getElementById("emailAddressLoginRegexError").setAttribute("hidden", "hidden");
});

// Password errors

document.getElementById("passwordLoginClose").addEventListener("click", () => {
	document.getElementById("passwordLoginError").setAttribute("hidden", "hidden");
});

