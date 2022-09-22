const mongoose = require("mongoose");
require("mongoose-type-email");
const bcrypt = require("bcryptjs");

const saltRounds = 12;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
	type: String,
	required: true
    },
    lastName: {
	type: String,
	required: true
    },
    emailAddress: {
	type: mongoose.SchemaTypes.Email,
	required: true,
	unique: true
    },
    password: {
	type: String,
	required: true
    },
    document: [{
    documentName: {type: String},
    documentCompleted: {type: Boolean, default: false}
    }]
});

userSchema.pre("save", async function preSave(next) {
	
	const user = this;

	if (!user.isModified("password")) return next();

	try {
		const hash = await bcrypt.hash(user.password, saltRounds);
		user.password = hash;
		return next();
	} catch (error) {
		return next(error);
	}
});

userSchema.methods.comparePassword = async function comparePassword(candidate) {
	return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User", userSchema);
