const express = require("express");
const companyReoRouter = express.Router();

const companyRepController = require("../controllers/companyRepController");


companyReoRouter.get('/dashboard',companyRepController.Dashboard)



module.exports = companyReoRouter;