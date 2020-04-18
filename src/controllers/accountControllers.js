const {validationResult}= require('express-validator');
// can be reused by many routes
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({ errors: errors.array() });
  };
};

module.exports = {
  signIn: (req, res) => {

    if (req.route.methods.post) {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.session.errors = errors.errors;
        req.success = false;
        res.render("signIn", {
            layout: false,
            title: "Sign In",
            success: false,
            errors: req.session.errors,
          });
      } else {
        req.session.errors=null;
        req.success = true;
        res.redirect("/");
      }
    } else {
      res.render("signIn", {
        layout: false,
        title: "Sign In",
        success: false,
        errors: req.session.errors,
      });
    }
  },
  signUp: (req, res) => {
    res.render("signUp", { layout: false });
  },
};
