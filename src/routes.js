const routes = require('express').Router();
const homeCtrl = require('./controllers/homeController');
const accountCtrl = require('./controllers/accountControllers');
 //default route action
routes.route('/').get(homeCtrl.home);
routes.route('/signIn').get(accountCtrl.signIn);
routes.route('/signUp').get(accountCtrl.signUp);
module.exports = routes;