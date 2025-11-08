const express = require("express");
const AuthRouter = express.Router();

// Local Module
const AuthController = require("../controllers/AuthController");

AuthRouter.get("/",AuthController.homeindex);

AuthRouter.get("/login", AuthController.login);
AuthRouter.get("/signup",AuthController.signup )


module.exports = AuthRouter;