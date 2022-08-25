const mongoose = require("mongoose");

const schema = mongoose.Schema(
	{
		userID: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true
		},
		title: {
			type: String,
			required: [true, "Please enter a title"]
		},
		type: {
			type: String,
			required: true,
			enum: ["scholarship", "festival", "seminar", "languageFest", "culturalFest", "exhibition"]
		},
		requirements: {
			type: String,
			required: [true, "Please enter requirements"],
			minlength: [50, "Please enter at least 50 characters"]
		},
		budget: Number,
		description: {
			type: String,
			required: [true, "Please enter a description"],
			minlength: [200, "Please enter at least 200 characters"]
		},
		date: {
			type: Date,
			required: [true, "Please enter a date"]
		},
		address: {
			type: String,
			required: [true, "Please enter an address"]
		},
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
			// { Rejected By OL2, Rejected By OL1, Pending, Forwarded, Approved }
			enum: [-2, -1, 0, 1, 2],
			default: 0
		},
		comment: [
			{
				text: String,
				userID: mongoose.SchemaTypes.ObjectId,
				default: []
			}
		]
	},
	{
		timestamps: true
	}
);

const model = mongoose.model("Request", schema);
module.exports = model;
