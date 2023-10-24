const express = require('express');
const registerController = require('../controllers/register.js');
const registerStatistics = require('../controllers/statistics.js');
const loginController = require('../controllers/login.js');

const appRouter = express.Router();

appRouter.get('/', (req, res) => {
    res.send('Welcome to the Titanic Passenger Statistics App');
});
appRouter.post("/register", registerController.registerUser);
appRouter.get("/statistics", registerStatistics.getStatistics);
appRouter.post("/login", loginController.postLoginPage);
appRouter.post("/logout", loginController.logout);

module.exports = appRouter;