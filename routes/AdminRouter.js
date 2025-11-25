// External Module
const express = require("express");
const AdminRouter = express.Router();

// Local Module
const AdminController = require("../controllers/AdminController");
const auth = require('../middleware/auth');

// Protect all admin routes
// AdminRouter.use(auth.isAdmin);


AdminRouter.get('/dashboard',AdminController.Dashboard)

AdminRouter.get('/Company-Stock-Management',AdminController.comapanyStockManagement)

AdminRouter.get('/Audit-Report-Management',AdminController.AduitReportManagement)


// Show all predictions
AdminRouter.get('/Prediction-of-Stock-Price', AdminController.PredictionStockPricet);

// Search predictions
AdminRouter.get('/predictions/search', AdminController.searchPredictions);

// Add prediction
AdminRouter.post('/predictions/add', AdminController.addPrediction);

// Edit prediction
AdminRouter.post('/predictions/edit/:Stockid', AdminController.editPrediction);

// Delete prediction
AdminRouter.post('/predictions/delete/:id', AdminController.deletePrediction);




AdminRouter.get('/Price-Monitoring',AdminController.TradeManagement)


AdminRouter.get('/Trade-Management',AdminController.TradeManagement)
AdminRouter.get('/AI-Based-Fraud-Detection',AdminController.AIBasedFraudDetection)
AdminRouter.get('/Prediction-of-Stock-Price',AdminController.PredictionStockPricet)










AdminRouter.get('/User-details',AdminController.Userdetails)
module.exports = AdminRouter;



