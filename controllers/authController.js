const jwt = require("jsonwebtoken");
const User = require("../models/User");
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

// Protect from non-logged user
exports.protect = async (req, res, next) => {
	let token;
	// Get token
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
		token = req.headers.authorization.split(" ")[1];

	if (!token) {
		return res.status(401).json({ status: "fail", msg: "Authorization denied" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded.id;
		next();
	} catch (err) {
		console.log(err.message);
		res.status(401).json({ status: "fail", msg: err.message });
	}
};

// Only for certain roles
exports.roles = (roles) => {
	return async (req, res, next) => {
		const user = await User.findById(req.user);
		if (!roles.includes(user.role)) {
			return res.status(403).json({
				status: "fail",
				msg: "You are not authorized to access this page"
			});
		}
		next();
	};
};

// Get User from token
exports.getUserFromToken = async (req, res) => {
	try {
		const user = await User.findById(req.user).select("-password");
		res.json({ status: "success", data: { user } });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ status: "fail", msg: "Server Error" });
	}
};

// Signup
exports.signup = async (req, res) => {
	const { licenceID, name, email, password, confirmPassword, role } = req.body;

	let user = await User.findOne({ email });
	try {
		if (user) {
			return res.status(400).json({ status: "error", msg: "User already exists" });
		}
		user = await User.create({
			licenceID,
			name,
			email,
			password,
			confirmPassword,
			role
		});
		const token = getToken(user.id);
		// Confirm Email Token
		const emailToken = EmailVerfication(user.id);
		// Confirm Email URL
		if (process.env.NODE_ENV === "development") base_url = "http://localhost:5000";
		else base_url = "https://sangmanch.tech";
		const url = `${base_url}/verify/${emailToken}`;
		await new Email(user, url).verifyEmail();
		res.status(201).json({ status: "success", data: { user, token } });
	} catch (err) {
		console.log(err.message);
		res.status(400).json({ status: "fail", msg: err.message });
	}
};

// Login
exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email }).select("+password");

		if (!user || !(await user.verifyPassword(password, user.password))) {
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

		const token = getToken(user.id);
		const cookieOptions = {
			expires: new Date(Date.now() + process.env.COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000),
			httpOnly: true
		};

		res.cookie("jwt", token, cookieOptions);

		res.status(200).json({
			status: "success",
			data: {
				token,
				user
			}
		});
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
