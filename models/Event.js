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
		enum: [
			"scholarship",
			"festival",
			"seminar",
			"languageFest",
			"CulturalFest",
			"exhibition"
		]
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
		enum: [-1, 0, 1]
	},
	forwardToGA: {
		type: Number,
		required: true,
		enum: [-1, 0, 1]
	}
});

const model = mongoose.model("Event", schema);
module.exports = model;
