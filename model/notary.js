const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notarySchema = new Schema({
    firstname: {
	type: String,
	required: true
    },
    lastname: {
	type: String,
	required: true
    },
    email: {
	type: String,
	required: true,
	unique: true
    },
    password: {
	type: String,
	required: true
    },
    completed: false
});

module.exports = mongoose.model('notary', notarySchema);
