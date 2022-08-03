const mongoose = require("mongoose");

const schema = mongoose.Schema({
	userID: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true
	},
	eventID: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	status: {
		type: Number,
		required: true
	},
	AIFlag: {
		type: Boolean,
		required: true,
		default: false
	}
});

const model = mongoose.model("FinanceReport", schema);
module.exports = model;
