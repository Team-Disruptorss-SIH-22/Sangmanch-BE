const express = require("express");
const Router = express.Router();
const { upload } = require("../utils/Upload");
const { protect, roles } = require("../controllers/authController");
const {
	createEvent,
	getAllEvents,
	getEventByID,
	getEventsOfLoggedUser,
	resolveTicket
} = require("../controllers/eventController");

Router.use(protect);

Router.get("/", roles("ICCRUser"), getEventsOfLoggedUser);
Router.get("/:id").get(getEventByID);
Router.get("/all", roles("financeManager", "governingBody", "generalAssembly"), getAllEvents);

Router.post("/", roles("ICCRUser"), upload.single("invoice"), createEvent);
Router.patch(
	"/resolve/:eventID",
	roles("financeManager", "governingBody", "generalAssembly"),
	resolveTicket
);

module.exports = Router;
