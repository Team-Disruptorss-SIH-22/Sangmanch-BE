const mongoose = require("mongoose");

const schema = mongoose.Schema({
	email: {
		type: String,
		required: [true, "Please provide an email"],
		unique: true
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		minlength: 8,
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
		enum: ["ICCRUser", "financeManager", "governingBody", "generalAssembly"]
	}
});

const model = mongoose.model("User", schema);
module.exports = model;
