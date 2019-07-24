'use strict';

const mysql = require('mysql');

// this has to be a global variable - to be fixed
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'fs1030_new',
});

/**
 * Profile page
 */

module.exports = {
  getProfileRoute: (req, res) => {
    const healthCardNumber = req.query.healthCardNumber;
    if (req.query.healthCardNumber) {
      const query = "SELECT * FROM `patients` WHERE health_card_number LIKE '%" + String(healthCardNumber) + "%' ORDER BY health_card_number ASC";
      // execute query
      db.query(query, (err, result) => {
        if (err) {
          res.redirect('/');
        }

        res.render('profile.ejs', {
          patients: result,
          title: 'EMR Database',
          pageId: 'profile',
          username: req.session.username,
        });
      });
    } else {
      const query = "SELECT * FROM `patients` ORDER BY health_card_number ASC";
      // execute query
      db.query(query, (err, result) => {
        if (err) {
          res.redirect('/');
        }

        res.render('profile.ejs', {
          patients: result,
          title: 'EMR Database',
          pageId: 'profile',
          username: req.session.username,
        });
      });

    }

  },

  // getFilteredRoute: (req, res) => {
  //   const healthCardNumber = req.query.healthCardNumber;

  //   const query = "SELECT * FROM `patients` WHERE health_card_number LIKE '%" + String(healthCardNumber) + "%' ORDER BY health_card_number ASC";

  //   // execute query
  //   db.query(query, (err, result) => {
  //     if (err) {
  //       res.redirect('/');
  //     }
  //     // console.log(result);
  //     res.render('profile.ejs', {
  //       patients: result,
  //       title: 'EMR Database',
  //       pageId: 'profile',
  //       username: req.session.username,
  //     });
  //   });
  // },








};
