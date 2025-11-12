const express = require("express");
const InvestorRouter = express.Router();

const InvestorController = require("../controllers/InvestorController");

InvestorRouter.get('/dashboard',InvestorController.Dashboard)
InvestorRouter.get('/profile',InvestorController.profile)
InvestorRouter.get('/stock-transaction',InvestorController.stockTN)
InvestorRouter.post('/add-transaction', InvestorController.postStockTN);

InvestorRouter.get('/fraud-detection', InvestorController.FruadDetection);
InvestorRouter.post('/ai-detect', InvestorController.AiDetect);
InvestorRouter.post('/add-fraud', InvestorController.AddFraud);













module.exports = InvestorRouter;