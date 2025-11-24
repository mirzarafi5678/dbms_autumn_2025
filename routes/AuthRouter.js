const express = require("express");
const AuthRouter = express.Router();

// Local Module
const AuthController = require("../controllers/AuthController");

AuthRouter.get("/",AuthController.homeindex);

AuthRouter.get("/login", AuthController.login);
AuthRouter.get("/signup",AuthController.signup )

// POST handlers
AuthRouter.post('/login', AuthController.postLogin);
AuthRouter.post('/signup', AuthController.postSignup);



module.exports = AuthRouter;