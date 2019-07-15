'use strict';

/**
 *
 */
module.exports = function authenticationMiddleware(req, res, next) {
  if (req.session.username) {
    next(); // allow the next route to run
  } else {
    // require the user to log in
    res.redirect('/login');
  }
};
