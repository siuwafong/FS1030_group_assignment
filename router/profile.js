'use strict';

const connection = require('../connection');


/**
 * Profile page
 */

module.exports = {
  getProfileRoute: (req, res) => {
    const healthCardNumber = req.query.healthCardNumber;
    if (req.query.healthCardNumber) {
      const query = "SELECT * FROM `patients` WHERE health_card_number LIKE '%" + String(healthCardNumber) + "%' ORDER BY health_card_number ASC";
      // execute query
      connection.db.query(query, (err, result) => {
        if (err) {
          res.redirect('/');
        }

        const patientName = JSON.parse(JSON.stringify(result))[0].first_name + ' ' + JSON.parse(JSON.stringify(result))[0].last_name

        res.render('profile.ejs', {
          patients: result,
          title: 'EMR Database',
          pageId: 'profile',
          username: req.session.username,
          healthCardNumber: healthCardNumber,
          selectedPatient: patientName,
          selectedHealthCardNumber: JSON.parse(JSON.stringify(result))[0].health_card_number,
          selectedBirthDate: JSON.parse(JSON.stringify(result))[0].dob,
        });
      });
    } else {
      const query = "SELECT * FROM `patients` ORDER BY health_card_number ASC";
      // execute query
      connection.db.query(query, (err, result) => {
        if (err) {
          res.redirect('/');
        }

        res.render('profile.ejs', {
          patients: result,
          title: 'EMR Database',
          pageId: 'profile',
          username: req.session.username,
          healthCardNumber: healthCardNumber,
        });
      });

    }

  },


};
