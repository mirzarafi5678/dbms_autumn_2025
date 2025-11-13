const express = require("express");
const ManagerRouterRouter = express.Router();

const ManagerController = require("../controllers/ManagerController");



ManagerRouterRouter.get('/dashboard',ManagerController.Dashboard)






module.exports = ManagerRouterRouter;