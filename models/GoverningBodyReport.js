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
		// { Rejected By GB, Rejected By FM, Pending, Forwarded, Approved }
		enum: [-2, -1, 0, 1, 2],
		default: 0
	}
});

const model = mongoose.model("GoverningBodyReport", schema);
module.exports = model;
