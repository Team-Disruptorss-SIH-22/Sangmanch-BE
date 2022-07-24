const express = require("express");
const Router = express.Router();
const {
	createEvent,
	getAllEvents,
	getEventByID
} = require("../controllers/eventController");
const { protect } = require("../controllers/authController");

Router.use(authController.protect);
Router.route("/").get(getAllEvents).post(createEvent);
Router.post("/:id").get(getEventByID);

module.exports = Router;
