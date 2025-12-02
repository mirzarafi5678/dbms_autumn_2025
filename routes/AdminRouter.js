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

// Institutes routes
AdminRouter.get('/institutes/search', AdminController.searchInstitute);
AdminRouter.post('/institutes/add', AdminController.addInstitute);
AdminRouter.post('/institutes/edit/:id', AdminController.editInstitute);
AdminRouter.post('/institutes/delete/:id', AdminController.deleteInstitute);
// Reports routes
AdminRouter.get('/reports/search', AdminController.searchReports);
AdminRouter.post('/reports/add', AdminController.addReport);
AdminRouter.post('/reports/edit/:reportId', AdminController.editReport);
AdminRouter.post('/reports/delete/:reportId', AdminController.deleteReport);


// Show all predictions
AdminRouter.get('/Prediction-of-Stock-Price', AdminController.PredictionStockPricet);

// Search predictions
AdminRouter.get('/predictions/search', AdminController.searchPredictions);

// Add prediction
AdminRouter.post('/predictions/add', AdminController.addPrediction);

// Edit prediction (identified by stockId)
AdminRouter.post('/predictions/edit/:stockId', AdminController.editPrediction);

// Delete prediction (by stockId)
AdminRouter.post('/predictions/delete/:stockId', AdminController.deletePrediction);

// Price history routes
AdminRouter.get('/Price-Monitoring', AdminController.PriceMonitoring);
AdminRouter.get('/price-history/search', AdminController.searchPriceHistory);
AdminRouter.post('/price-history/add', AdminController.addPriceRecord);
AdminRouter.post('/price-history/edit/:stockId', AdminController.editPriceRecord);
AdminRouter.post('/price-history/delete/:registrationNumber', AdminController.deletePriceRecord);

// Company routes
AdminRouter.get('/Company-Stock-Management', AdminController.comapanyStockManagement);
AdminRouter.get('/company/search', AdminController.searchCompany);
AdminRouter.post('/company/add', AdminController.addCompany);
AdminRouter.post('/company/edit/:registrationNumber', AdminController.editCompany);
AdminRouter.post('/company/delete/:registrationNumber', AdminController.deleteCompany);

// Stocks routes
AdminRouter.get('/stocks/search', AdminController.searchStocks);
AdminRouter.post('/stocks/add', AdminController.addStock);
AdminRouter.post('/stocks/edit/:stockId', AdminController.editStock);
AdminRouter.post('/stocks/delete/:stockId', AdminController.deleteStock);

// Trades routes
AdminRouter.get('/Trade-Management', AdminController.TradeManagement);
AdminRouter.get('/trades/search', AdminController.searchTrades);
AdminRouter.post('/trades/add', AdminController.addTrade);
AdminRouter.post('/trades/edit/:tradeId', AdminController.editTrade);
AdminRouter.post('/trades/delete/:tradeId', AdminController.deleteTrade);




AdminRouter.get('/Price-Monitoring',AdminController.PriceMonitoring)


AdminRouter.get('/Trade-Management',AdminController.TradeManagement)
AdminRouter.get('/AI-Based-Fraud-Detection',AdminController.AIBasedFraudDetection)
// Fraud routes (alerts)
AdminRouter.get('/fraud/search', AdminController.searchFraud);
AdminRouter.post('/fraud/add', AdminController.addFraud);
AdminRouter.post('/fraud/edit/:alertId', AdminController.editFraud);
AdminRouter.post('/fraud/delete/:alertId', AdminController.deleteFraud);


AdminRouter.get('/Stock-Transaction',AdminController.stocktransaction)

// Transactions (stocks_transaction)
AdminRouter.get('/transactions/search', AdminController.searchTransactions);
AdminRouter.post('/transactions/add', AdminController.addTransaction);
AdminRouter.post('/transactions/edit/:transactionId', AdminController.editTransaction);
AdminRouter.post('/transactions/delete/:transactionId', AdminController.deleteTransaction);
// Investors
AdminRouter.get('/investors/search', AdminController.searchInvestors);
AdminRouter.post('/investors/add', AdminController.addInvestor);
AdminRouter.post('/investors/edit/:iUserId', AdminController.editInvestor);
AdminRouter.post('/investors/delete/:iUserId', AdminController.deleteInvestor);




module.exports = AdminRouter;



