// External Module
const express = require("express");
const AdminRouter = express.Router();

// Local Module
const AdminController = require("../controllers/AdminController");


AdminRouter.get('/dashboard',AdminController.Dashboard)

AdminRouter.get('/Company-Stock-Management',AdminController.comapanyStockManagement)

AdminRouter.get('/Audit-Report-Management',AdminController.AduitReportManagement)

AdminRouter.get('/analytics',AdminController.AduitReportManagement)
AdminRouter.get('/Price-Monitoring',AdminController.AduitReportManagement)
AdminRouter.get('/Trade-Management',AdminController.AduitReportManagement)
AdminRouter.get('/AI-Based-Fraud-Detection',AdminController.AduitReportManagement)
AdminRouter.get('/Prediction-of-Stock-Price',AdminController.AduitReportManagement)


module.exports = AdminRouter;



