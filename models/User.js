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
	password: {
		type: String,
		required: [true, "Please provide a password"],
		minLength: 8,
		select: false
	},
	confirmPassword: {
		type: String,
		required: [true, "Please confirm your password"],
		validate: {
			validator: function (val) {
				return val === this.password;
			},
			message: "Passwords do not match"
		}
	},
	role: {
		type: String,
		enum: ["ICCRUser", "financeManager", "governingBody", "generalAssembly", "DG", "OL1", "OL2"],
		required: true
	},
	confirm: {
		type: Boolean,
		default: false
	},
	pin: {
		type: Number,
		min: 0000,
		max: 9999,
		select: false,
		required: [
			function () {
				return this.role !== "ICCRUser";
			},
			"Please provide a pin"
		]
	}
});

// Encrypting password before saving
schema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	this.confirmPassword = undefined;

	next();
});

// Verify Password
schema.methods.verifyPassword = async function (candidatePassword, password) {
	return await bcrypt.compare(candidatePassword, password);
};

const model = mongoose.model("User", schema);
module.exports = model;
