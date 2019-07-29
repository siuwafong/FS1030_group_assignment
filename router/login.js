'use strict';

const argon2 = require('argon2');
const db = require('../db/users');


/**
 * Initial page rendering
 */
function getLoginRoute(req, res) {
  res.render('login', {
    pageId: 'login',
    title: 'Login',
    username: req.session.username,
    formError: null,
    formValues: { username: null, password: null },
  });
}


/**
 * Form submission
 */
function postLoginRoute(req, res, next) {
  db.usernameExists(req.body.username)

    // Validate
    .then((usernameExists) => {
      // Login is not valid if username does not exist
      if (!usernameExists) {
        return false;
      // If the username exists verify the password is correct
      }
      return db.getUserPasswordHash(req.body.username)
        .then(dbHash => argon2.verify(dbHash, req.body.password));
    })

    // Render on failure or log user in
    .then((isValid) => {
      // If invalid respond with authentication failure
      if (!isValid) {
        res
          .status(401)
          .render('login', {
            pageId: 'login',
            title: 'Login',
            username: req.session.username,
            formError: 'Authentication failed.',
            formValues: {
              username: req.body.username || null,
              password: req.body.password || null,
            },
          });

      // Else log the user in and redirect to home page
      } else {
        req.session.username = req.body.username;
        res.redirect('/');
      }
    })
    .catch(next);
}


module.exports = {
  get: getLoginRoute,
  post: postLoginRoute,
};
