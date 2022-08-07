const express = require('express');
const adminController = require('../controller/adminController');

const adminRouter = express.Router();

adminRouter.post('/admin/register', adminController.addAdmin);

adminRouter.post('/admin/login', adminController.loginAdmin);

module.exports = adminRouter;