const express = require('express');
const traineeController = require('../controller/traineeController');

const traineeRouter = express.Router();

traineeRouter.post('/trainee/register', traineeController.addTrainee);

traineeRouter.post('/trainee/login', traineeController.loginTrainee);

module.exports = traineeRouter;