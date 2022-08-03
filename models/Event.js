const mongoose = require("mongoose");

const schema = mongoose.Schema({
	userID: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true,
		enum: ["scholarship", "festival", "seminar", "languageFest", "CulturalFest", "exhibition"]
	},
	date: {
		type: Date,
		required: true
	},
	peopleReached: {
		type: Number,
		required: true
	},
	expenses: {
		type: Number,
		required: true
	},
	budget: Number,
	city: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	status: {
		type: Number,
		required: true,
		// { Rejected, Pending, Forwarded, Approved }
		enum: [-1, 0, 1, 2],
		default: 0
	},
	forwardToGA: {
		type: Boolean,
		default: false
	},
	invoice: {
		type: String,
		required: true
	}
});

const model = mongoose.model("Event", schema);
module.exports = model;
