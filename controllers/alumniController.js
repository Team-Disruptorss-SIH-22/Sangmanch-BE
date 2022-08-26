const jwt = require("jsonwebtoken");
const Alumni = require("../models/Alumni");
const Email = require("../utils/Email");

// Create email verification link
function EmailVerfication(id) {
	return jwt.sign({ id }, process.env.EMAIL_SECRET, {
		expiresIn: "24h"
	});
}

// Get Token
const getToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRESIN
	});
};

// Signup
exports.alumniSignup = async (req, res) => {
	let { licenceID, name, email, password, country } = req.body;

	let alumni = await Alumni.findOne({ email });
	try {
		if (alumni) {
			return res.status(400).json({ status: "error", msg: "alumni already exists" });
		}
		alumni = await Alumni.create({
			licenceID,
			name,
			email,
			password,
			country
		});
		const token = getToken(alumni.id);
		// Confirm Email Token
		const emailToken = EmailVerfication(alumni.id);
		// Confirm Email URL
		if (process.env.NODE_ENV === "development") base_url = "http://localhost:5000";
		else base_url = "https://sangmanch.tech";
		const url = `${base_url}/verify/${emailToken}`;
		await new Email(alumni, url).verifyEmail();
		res.status(201).json({ status: "success", data: { alumni, token } });
	} catch (err) {
		res.status(400).json({ status: "fail", msg: err.message });
	}
};

exports.alumniLogin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const alumni = await Alumni.findOne({ email }).select("+password");

		if (!alumni || !(await alumni.verifyPassword(password, alumni.password))) {
			return res.status(400).json({
				status: "fail",
				msg: "Incorrect Username or Password"
			});
		}

		if (!user.confirm) {
			return res.status(400).json({
				status: "fail",
				msg: "Please verify your email first"
			});
		}

		const token = getToken(alumni.id);
		res.status(201).json({ status: "success", data: { alumni, token } });
	} catch (err) {
		res.status(400).json({ status: "fail", msg: err.message });
	}
};

// Confirm email
exports.confirmEmail = async (req, res) => {
	const token = req.params.token;
	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.EMAIL_SECRET);
		// Check is user exists or not
		const user = await User.findByIdAndUpdate(decoded.id, { confirm: true });
		if (!user)
			return res.status(400).json({
				status: "fail",
				msg: "User does not exist"
			});

		res.status(200).json({
			status: "success",
			msg: "Email Verified"
		});
	} catch (err) {
		res.status(400).json({ status: "fail", msg: err.message });
	}
};
