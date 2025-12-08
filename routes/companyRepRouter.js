const express = require("express");
const companyRepRouter = express.Router();

const companyRepController = require("../controllers/companyRepController");
const auth = require('../middleware/auth');

companyRepRouter.use(auth.isCompanyRep);


companyRepRouter.get('/dashboard',companyRepController.Dashboard)

companyRepRouter.get('/my-company',companyRepController.myCompany)
companyRepRouter.get('/recent-stock-buyer',companyRepController.recentBuyer)






companyRepRouter.post('/my-company/save-company', companyRepController.addCompanyInfo);
companyRepRouter.post('/my-company/update-company', companyRepController.updateCompanyInfo);

// POST: Add a New Stock
companyRepRouter.post('/my-company/add-stock', companyRepController.addStock);

// POST: Update Stock (from popup edit modal)
companyRepRouter.post('/my-company/update-stock', companyRepController.updateStock);

// POST: Delete Stock
companyRepRouter.post('/my-company/delete-stock', companyRepController.deleteStock);








module.exports = companyRepRouter;