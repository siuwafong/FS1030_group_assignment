'use strict';

const connection = require('../connection');

/**
 * Search page
 */

module.exports = {
  getSearchRoute: (req, res) => {
    const query = "SELECT * FROM `patients` ORDER BY health_card_number ASC";

    // execute query
    connection.db.query(query, (err, result) => {
      if (err) {
        res.redirect('/');
      }

      res.render('patients.ejs', {
        patients: result,
        title: 'Medisquare | Patients',
        pageId: 'patients',
        username: req.session.username,
      });
    });
  },
};
