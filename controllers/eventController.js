const Event = require("../models/Event");
const User = require("../models/User");
const FinanceReport = require("../models/FinanceReport");
const GoverningBodyReport = require("../models/GoverningBodyReport");

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

// Resolve Ticket

exports.resolveTicket = async (req, res) => {
	try {
		const user = await User.findById(req.user);
		if (user.role === "financeManager" && req.body.status == 2) {
			return res.status(401).json({
				status: "fail",
				msg: "You are not authorized to for this action"
			});
		}
		const event = await Event.findByIdAndUpdate(req.params.eventID, { status: req.body.status });
		if (user.role === "financeManager") {
			await FinanceReport.create({
				userID: req.user,
				eventID: req.params.eventID,
				comment: req.body.comment,
				status: req.body.status
			});
		} else if (user.role === "governingBody") {
			await GoverningBodyReport.create({
				userID: req.user,
				eventID: req.params.eventID,
				comment: req.body.comment,
				status: req.body.status
			});
		}

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
