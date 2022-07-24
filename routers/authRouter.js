const express = require("express");
const Router = express.Router();
const {
	protect,
	getUserFromToken,
	signup,
	login,
	confirmEmail
} = require("../controllers/authController");

Router.get("/", protect, getUserFromToken);
Router.post("/signup", signup);
Router.post("/login", login);
Router.get("/confirmEmail/:token", confirmEmail);

module.exports = Router;
