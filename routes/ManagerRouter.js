const express = require("express");
const ManagerRouterRouter = express.Router();

const ManagerController = require("../controllers/ManagerController");



ManagerRouterRouter.get('/profile-info',ManagerController.ProfileInfo)

ManagerRouterRouter.get('/analytics',ManagerController.analytic)
ManagerRouterRouter.get('/view-stakeholder',ManagerController.viewStackHolder)




module.exports = ManagerRouterRouter;