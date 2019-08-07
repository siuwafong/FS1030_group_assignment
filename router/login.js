'use strict';

const argon2 = require('argon2');
const db = require('../db/users');
const connection = require('../connection');


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
  const qryUserNameExist = `select count(username) as UsersCount from users where username = '${req.body.username}'`;
  // const resultUserName = await getUsersByName(username);
  connection.db.query(qryUserNameExist, (err, result) => {
    if (err) throw err;
    const usernameExists = result[0].UsersCount > 0;
    // Login is not valid if username does not exist
    if (!usernameExists) {
      console.log('username does not exist');
      return false;
    // If the username exists verify the password is correct
    }
    console.log('username exist');
    const qryStrSelectUserPasswordHash = `SELECT password FROM users WHERE username = "${req.body.username}"`;
    return connection.db.query(qryStrSelectUserPasswordHash, (err, result) => {
      if (err) throw err;
      console.log(result);

      const dbHash = result[0].password;
      const isValid = argon2.verify(dbHash, req.body.password);
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
    });
  });
}


module.exports = {
  get: getLoginRoute,
  post: postLoginRoute,
};
