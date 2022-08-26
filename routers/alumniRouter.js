const express = require("express");
const { alumniSignup, alumniLogin } = require("../controllers/alumniController");
const Router = express.Router();

Router.post("/signup", alumniSignup);
Router.post("/login", alumniLogin);
module.exports = Router;
