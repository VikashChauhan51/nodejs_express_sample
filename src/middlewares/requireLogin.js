const { getAllActiveSessions } = require('../redis');

function requireLogin(req, res, next) {
    if (!req.session && !req.session.user) {
        res.redirect('/signIn');
      } else {
        next();
      }
  }