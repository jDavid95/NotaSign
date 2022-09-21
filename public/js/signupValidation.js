const signupForm = document.getElementById("signupForm");

const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const nameRegex = /^[a-z ,.'-]+$/i;

// Validates the form on the Client side, makes sure all fields are valid

signupForm.addEventListener("submit", (e) => {

    // Remove all previous errors
    
    document.getElementById("firstNameError").setAttribute("hidden", "hidden");
    document.getElementById("firstNameRegexError").setAttribute("hidden", "hidden");
    document.getElementById("lastNameError").setAttribute("hidden", "hidden");
    document.getElementById("lastNameRegexError").setAttribute("hidden", "hidden");
    document.getElementById("emailAddressError").setAttribute("hidden", "hidden");
    document.getElementById("emailAddressRegexError").setAttribute("hidden", "hidden");
    document.getElementById("passwordError").setAttribute("hidden", "hidden");
    document.getElementById("passwordLengthError").setAttribute("hidden", "hidden");
    document.getElementById("confirmPasswordError").setAttribute("hidden", "hidden");
    document.getElementById("passwordMatchError").setAttribute("hidden", "hidden");
	
    let firstName = document.getElementById("firstNameSignup").value;
	let lastName = document.getElementById("lastNameSignup").value;
	let emailAddress = document.getElementById("emailAddressSignup").value;
	let password = document.getElementById("passwordSignup").value;
	let confirmPassword = document.getElementById("confirmPasswordSignup").value;

	if (firstName == "") {
		e.preventDefault();
		document.getElementById("firstNameError").removeAttribute("hidden");
	} else if (!firstName.match(nameRegex)) {
		e.preventDefault();
		document.getElementById("firstNameRegexError").removeAttribute("hidden");
	}

	if (lastName == "") {
		e.preventDefault();
		document.getElementById("lastNameError").removeAttribute("hidden");
	} else if (!lastName.match(nameRegex)) {
		e.preventDefault();
		document.getElementById("lastNameRegexError").removeAttribute("hidden");
	}

	if (emailAddress == "") {
		e.preventDefault();
		document.getElementById("emailAddressError").removeAttribute("hidden");
	} else if (!emailAddress.match(emailRegex)) {
		e.preventDefault();
		document.getElementById("emailAddressRegexError").removeAttribute("hidden");
	}

	if (password == "") {
		e.preventDefault();
		document.getElementById("passwordError").removeAttribute("hidden");
	} else if (password.length < 8) {
		e.preventDefault();
		document.getElementById("passwordLengthError").removeAttribute("hidden");
	} else if (password !== confirmPassword) {
		e.preventDefault();
		document.getElementById("passwordMatchError").removeAttribute("hidden");
	}

	if (confirmPassword == "") {
		e.preventDefault();
		document.getElementById("confirmPasswordError").removeAttribute("hidden");
	}
});

// When a user closes the error popup, this resets it so it can pop up again without having to refresh

// First name errors

document.getElementById("firstNameClose").addEventListener("click", () => {
	document.getElementById("firstNameError").setAttribute("hidden", "hidden");
});

document.getElementById("firstNameRegexClose").addEventListener("click", () => {
	document.getElementById("firstNameRegexError").setAttribute("hidden", "hidden");
});

// Last name errors

document.getElementById("lastNameClose").addEventListener("click", () => {
	document.getElementById("lastNameError").setAttribute("hidden", "hidden");
});

document.getElementById("lastNameRegexClose").addEventListener("click", () => {
	document.getElementById("lastNameRegexError").setAttribute("hidden", "hidden");
});

// Email address errors

document.getElementById("emailAddressClose").addEventListener("click", () => {
	document.getElementById("emailAddressError").setAttribute("hidden", "hidden");
});

document.getElementById("emailAddressRegexClose").addEventListener("click", () => {
	document.getElementById("emailAddressRegexError").setAttribute("hidden", "hidden");
});

// Password errors

document.getElementById("passwordClose").addEventListener("click", () => {
	document.getElementById("passwordError").setAttribute("hidden", "hidden");
});

document.getElementById("passwordLengthClose").addEventListener("click", () => {
	document.getElementById("passwordLengthError").setAttribute("hidden", "hidden");
});

// Confirm password errors

document.getElementById("confirmPasswordClose").addEventListener("click", () => {
	document.getElementById("confirmPasswordError").setAttribute("hidden", "hidden");
});

document.getElementById("passwordMatchClose").addEventListener("click", () => {
	document.getElementById("passwordMatchError").setAttribute("hidden", "hidden");
});
