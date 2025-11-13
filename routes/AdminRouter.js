// External Module
const express = require("express");
const AdminRouter = express.Router();

// Local Module
const AdminController = require("../controllers/AdminController");


AdminRouter.get('/dashboard',AdminController.Dashboard)

AdminRouter.get('/Company-Stock-Management',AdminController.comapanyStockManagement)

AdminRouter.get('/Audit-Report-Management',AdminController.AduitReportManagement)


AdminRouter.get('/Price-Monitoring',AdminController.PriceMonitoring)
AdminRouter.get('/Trade-Management',AdminController.TradeManagement)
AdminRouter.get('/AI-Based-Fraud-Detection',AdminController.AIBasedFraudDetection)
AdminRouter.get('/Prediction-of-Stock-Price',AdminController.PredictionStockPricet)


// router.get('/admin/predictions', adminController.PredictionStockPricet);
// router.post('/admin/predictions/add', adminController.addPrediction);
// router.post('/admin/predictions/edit/:Stockid', adminController.editPrediction);
// router.post('/admin/predictions/delete/:Stockid', adminController.deletePrediction);
// router.get('/admin/predictions/search', adminController.searchPrediction);








AdminRouter.get('/User-details',AdminController.Userdetails)
module.exports = AdminRouter;



