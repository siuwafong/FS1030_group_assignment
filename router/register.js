'use strict';

const argon2 = require('argon2');
const db = require('../db/users');
const connection = require('../connection');

/**
 * Initial page rendering
 */
function getRegisterRoute(req, res) {
  res.render('register', {
    pageId: 'register',
    title: 'Register',
    username: req.session.username,
    formValues: { username: null, password: null },
    formErrors: { username: null, password: null },
  });
}


/**
 * Form submission
 */
function postRegisterRoute(req, res, next) {
  const qryUserNameExist = `select count(username) as UsersCount from users where username = '${req.body.username}'`;
  // const resultUserName = await getUsersByName(username);
  connection.db.query(qryUserNameExist, (err, result) => {
    if (err) throw err;
    const usernameExists = result[0].UsersCount > 0;
    // Check if form values are valid
    const formErrors = {
      username: (!usernameExists && req.body.username) ? null : 'Invalid username',
      password: (req.body.password && req.body.password.length >= 6) ? null : 'Invalid password',
    };

    // If there are any errors do not register the user
    if (formErrors.username || formErrors.password) {
      res
        .status(400)
        .render('register', {
          pageId: 'register',
          title: 'Register',
          username: req.session.username,
          formErrors: formErrors,
          formValues: {
            username: req.body.username,
            password: req.body.password,
          },
        });
    // Else, the form values are valid
    } else {
      // If successful should redirect to `/login`
      try {
        const hash = argon2.hash(req.body.password);
        db.addUser({
          username: req.body.username,
          password: hash,
        });
        res.redirect('/login');
      } catch (err) {
        //...
      }
    }
  });
}


module.exports = {
  get: getRegisterRoute,
  post: postRegisterRoute,
};
