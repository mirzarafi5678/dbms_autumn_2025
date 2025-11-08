// External Module
const express = require("express");
const AdminRouter = express.Router();

// Local Module
const AdminController = require("../controllers/AdminController");


AdminRouter.get('/dashboard',AdminController.Dashboard)

AdminRouter.get('/Company-Stock-Management',AdminController.comapanyStockManagement)


module.exports = AdminRouter;
