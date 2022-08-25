const express = require("express");
const { getDashboardDetails } = require("../controllers/dashboard");
const Router = express.Router();

// Router.use(protect);

Router.get("/details", getDashboardDetails);

module.exports = Router;
