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
		type: Boolean,
		required: true,
		default: false
	}
});

const model = mongoose.model("GeneralAssemblyReport", schema);
module.exports = model;
