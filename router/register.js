'use strict';

const argon2 = require('argon2');
const db = require('../db/users');

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
  // First we check if the username provided already exists
  db.usernameExists(req.body.username)
    .then(async (usernameExists) => {
      console.log("checking if username Exist");
      console.log(usernameExists);
      // Check if form values are valid
      const formErrors = {
        username: (!usernameExists && req.body.username) ? null : 'Invalid username',
        password: (req.body.password && req.body.password.length >= 6) ? null : 'Invalid password',
      };
      console.log(formErrors);
      console.log('post register route');
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
        // TODO: Hash the password and call `db.addUser(newUser)`
        // If successful should redirect to `/login`
        try {
          const hash = await argon2.hash(req.body.password);
          await db.addUser({
            username: req.body.username,
            password: hash,
          });
          res.redirect('/login');
        } catch (err) {
          console.log(err);
        }
      }
    })
    .catch(next);
}


module.exports = {
  get: getRegisterRoute,
  post: postRegisterRoute,
};
