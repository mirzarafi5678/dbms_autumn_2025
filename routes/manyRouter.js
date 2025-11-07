// External Module
const express = require("express");
const Router = express.Router();

// Local Module
const ManyController = require("../controllers/ManyController");

Router.get("/", ManyController.homeindex);

Router.get("/login", ManyController.login);
Router.get("/signup", ManyController.signup )


module.exports = Router;
