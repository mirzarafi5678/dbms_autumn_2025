const express = require("express");
const InvestorRouter = express.Router();
const auth = require('../middleware/auth');
const InvestorController = require("../controllers/InvestorController");



InvestorRouter.use(auth.isInvestor);


InvestorRouter.get('/dashboard',InvestorController.Dashboard)
InvestorRouter.get('/buy-stock',InvestorController.buyStock)
InvestorRouter.post('/buy-stock', InvestorController.postBuyStock)
InvestorRouter.get('/stock-transaction',InvestorController.stockTN)
InvestorRouter.post('/add-transaction', InvestorController.postStockTN);
InvestorRouter.get('/viewAudit',InvestorController.viewAudit)
InvestorRouter.get('/fraud-detection', InvestorController.FruadDetection);
InvestorRouter.post('/ai-detect', InvestorController.AiDetect);
InvestorRouter.post('/add-fraud', InvestorController.AddFraud);





module.exports = InvestorRouter;