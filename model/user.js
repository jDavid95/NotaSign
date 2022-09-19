const mongoose = require('mogoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
    paper{
	...
    }
    completed: false
});

module.exports = mongoose.model('user', userSchema);
