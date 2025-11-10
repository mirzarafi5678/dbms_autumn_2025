const express = require("express");
const InvestorRouter = express.Router();

const InvestorController = require("../controllers/InvestorController");

InvestorRouter.get('/dashboard',InvestorController.Dashboard)

module.exports = InvestorRouter;