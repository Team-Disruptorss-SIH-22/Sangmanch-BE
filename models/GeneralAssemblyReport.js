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
		required: true,
		// { Rejected, Pending, Forwarded, Approved }
		enum: [-1, 0, 1, 2],
		default: 0
	}
});

const model = mongoose.model("GeneralAssemblyReport", schema);
module.exports = model;
