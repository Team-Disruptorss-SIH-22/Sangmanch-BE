const Event = require("../models/Event");
const { cloudinaryLink } = require("../utils/Upload");

exports.createEvent = async (req, res) => {
	try {
		const userID = req.user;
		const { name, type, date, peopleReached, expenses, budget, city, country, status } = req.body;
		console.log(userID);
		// Get Cloudinary Link for Invoice
		// const invoice = await cloudinaryLink(req.file.path).url;
		const event = await Event.create({
			userID,
			name,
			type,
			date,
			peopleReached,
			expenses,
			budget,
			city,
			country,
			status
			// invoice
		});

		res.status(201).json({
			status: "success",
			data: {
				event
			}
		});
	} catch (err) {
		console.log(err.message);
		res.status(400).json({
			status: "fail",
			msg: err.message
		});
	}
};

exports.updateEvent = async (req, res) => {
	try {
		const { id, name, type, date, peopleReached, expenses, budget, city, country, status } =
			req.body;
		console.log(userID);
		// Get Cloudinary Link for Invoice
		// const invoice = await cloudinaryLink(req.file.path).url;
		const event = await Event.findByIdAndUpdate(id, {
			name,
			type,
			date,
			peopleReached,
			expenses,
			budget,
			city,
			country,
			status
			// invoice
		});

		res.status(201).json({
			status: "success",
			data: {
				event
			}
		});
	} catch (err) {
		console.log(err.message);
		res.status(400).json({
			status: "fail",
			msg: err.message
		});
	}
};

exports.getAllEvents = async (req, res) => {
	try {
		const events = await Event.find();
		res.status(200).json({
			status: "success",
			data: {
				events
			}
		});
	} catch (err) {
		console.log(err.message);
		res.status(400).json({
			status: "fail",
			msg: err.message
		});
	}
};

exports.getEventByID = async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: {
				event
			}
		});
	} catch (err) {
		console.log(err.message);
		res.status(400).json({
			status: "fail",
			msg: err.message
		});
	}
};

exports.getEventsOfLoggedUser = async (req, res) => {
	try {
		const events = await Event.find({ userID: req.user });
		res.status(200).json({
			status: "success",
			data: {
				events
			}
		});
	} catch (err) {
		console.log(err.message);
		res.status(400).json({
			status: "fail",
			msg: err.message
		});
	}
};
