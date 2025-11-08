// External Module
const express = require("express");
const AdminRouter = express.Router();

// Local Module
const AdminController = require("../controllers/AdminController");


AdminRouter.get('/Admin-dashboard',AdminController.Dashboard)


module.exports = AdminRouter;
