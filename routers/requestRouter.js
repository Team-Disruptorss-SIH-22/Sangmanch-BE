const express = require("express");
const Router = express.Router();
const { protect, roles } = require("../controllers/authController");
const {
	getRequestsOfLoggedUser,
	getRequestByID,
	getAllRequest,
	createRequest,
	resolveRequest
} = require("../controllers/requestController");

Router.use(protect);

Router.get("/", roles("ICCRUser"), getRequestsOfLoggedUser);
Router.get("/:id").get(getRequestByID);
Router.get("/all", roles("DG", "OL1", "OL2"), getAllRequest);

Router.post("/", roles("ICCRUser"), createRequest);
Router.patch("/resolve/:requestID", roles("DG", "OL1", "OL2"), resolveRequest);

module.exports = Router;
