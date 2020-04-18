const routes = require("express").Router();
const homeCtrl = require("./controllers/homeController");
const accountCtrl = require("./controllers/accountControllers");
const { body } = require("express-validator");
//default route action
routes.route("/").get(homeCtrl.home);
routes.route("/signIn").get(accountCtrl.signIn);
routes
  .route("/signIn")
  .post(
    [
      body("email", "Invalid email address").isEmail().normalizeEmail(),
      body("password", "invalid password").isLength({ min: 4 }),
    ],
    accountCtrl.signIn
  );
routes.route("/signUp").get(accountCtrl.signUp);
module.exports = routes;
