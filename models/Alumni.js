const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = mongoose.Schema({
	licenceID: {
		type: String,
		required: [true, "Please provide a licence ID"]
	},
	name: {
		type: String,
		required: [true, "Please provide your name"]
	},
	email: {
		type: String,
		required: [true, "Please provide an email"],
		unique: true
	},
	country: {
		type: String,
		required: [true, "Please provide your country"]
	},
	confirm: {
		type: Boolean,
		default: false
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		minLength: 8,
		select: false
	}
});

// Encrypting password before saving
schema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);

	next();
});

// Verify Password
schema.methods.verifyPassword = async function (candidatePassword, password) {
	return await bcrypt.compare(candidatePassword, password);
};

const model = mongoose.model("Alumni", schema);
module.exports = model;
