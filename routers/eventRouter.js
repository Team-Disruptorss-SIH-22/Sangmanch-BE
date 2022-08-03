const express = require("express");
const Router = express.Router();
const { upload } = require("../utils/Upload");

const {
	createEvent,
	getAllEvents,
	getEventByID,
	getEventsOfLoggedUser
} = require("../controllers/eventController");
const { protect, roles } = require("../controllers/authController");

Router.use(protect);
Router.get("/", roles("ICCRUser"), getEventsOfLoggedUser);
Router.get("/all", roles("financeManager", "governingBody", "generalAssembly"), getAllEvents);
Router.post("/", roles("ICCRUser"), upload.single("invoice"), createEvent);
Router.post("/:id").get(getEventByID);

module.exports = Router;
