const express = require('express');
const trainerController = require('../controller/trainerController');

const trainerRouter = express.Router();

trainerRouter.post('/trainer/register', trainerController.addTrainer);

trainerRouter.post('/trainer/login', trainerController.loginTrainer);

module.exports = trainerRouter;