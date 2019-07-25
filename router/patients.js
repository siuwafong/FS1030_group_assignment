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
 * Search page
 */

module.exports = {
  getSearchRoute: (req, res) => {
    const query = "SELECT * FROM `patients` ORDER BY health_card_number ASC";

    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.redirect('/');
      }

      res.render('patients.ejs', {
        patients: result,
        title: 'EMR Database',
        pageId: 'patients',
        username: req.session.username,
      });
    });
  },
};
