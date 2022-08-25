const mongoose = require("mongoose");

const schema = mongoose.Schema({
	userID: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true
	},
	requestID: {
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
	}
});

const model = mongoose.model("RequestReport", schema);
module.exports = model;
