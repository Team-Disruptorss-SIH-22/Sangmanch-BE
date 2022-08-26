const Request = require("../models/Request");
const RequestReport = require("../models/RequestReport");

exports.createRequest = async (req, res) => {
	try {
		const userID = req.user;
		const { title, requirements, description, budget, date, status, address, city, country, link } =
			req.body;
		const request = await Request.create({
			userID,
			title,
			type,
			requirements,
			description,
			budget,
			date,
			status,
			address,
			city,
			country,
			link
		});

		res.status(201).json({
			status: "success",
			data: {
				request
			}
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			msg: err.message
		});
	}
};

exports.getAllRequest = async (req, res) => {
	try {
		const requests = await Request.find();
		res.status(200).json({
			status: "success",
			data: {
				requests
			}
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			msg: err.message
		});
	}
};

exports.getRequestByID = async (req, res) => {
	try {
		const request = await Request.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: {
				request
			}
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			msg: err.message
		});
	}
};

exports.getRequestsOfLoggedUser = async (req, res) => {
	try {
		const requests = await Request.find({ userID: req.user });
		res.status(200).json({
			status: "success",
			data: {
				requests
			}
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			msg: err.message
		});
	}
};

// Resolve Request
exports.resolveRequest = async (req, res) => {
	try {
		const user = await User.findById(req.user).select("+pin");
		if (user.role === "DG" && req.body.status == 2) {
			return res.status(401).json({
				status: "fail",
				msg: "You are not authorized for this action"
			});
		}
		if (user.pin !== req.body.pin) {
			return res.status(401).json({
				status: "fail",
				msg: "Please enter Correct Pin"
			});
		}
		const newComment = { text: req.body.comment, userID: req.user };
		const request = await Request.findByIdAndUpdate(
			req.params.requestID,
			{ status: req.body.status, $push: { comments: newComment } },
			{ new: true }
		);

		await RequestReport.create({
			userID: req.user,
			requestID: req.params.requestID,
			comment: req.body.comment,
			status: req.body.status
		});

		res.status(201).json({
			status: "success",
			data: {
				request
			}
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			msg: err.message
		});
	}
};
