'use strict';

const connection = require('../connection');


/**
 * Profile page
 */

module.exports = {
  getRecordRoute: (req, res) => {
    const healthCardNumber = req.query.healthCardNumber;
    if (healthCardNumber) {
      const queryRecord = "SELECT * FROM `patients` INNER JOIN vitals ON patients.health_card_number  = vitals.health_card_number WHERE patients.health_card_number LIKE '%" + String(healthCardNumber) + "%' ORDER BY patients.health_card_number ASC";

      connection.db.query(queryRecord, (err, result) => {
        if (err) {
          res.redirect('/');
        }


        const height = JSON.parse(JSON.stringify(result))[0].body_height;
        const weight = JSON.parse(JSON.stringify(result))[0].body_weight;
        const bmi = Math.round((weight * 0.4535 / ((height * 0.3048) ** 2)) * 100) / 100;
        const patientName = JSON.parse(JSON.stringify(result))[0].first_name + ' ' + JSON.parse(JSON.stringify(result))[0].last_name;

        res.render('profile.ejs', {
          patients: result,
          title: 'EMR Database',
          pageId: 'record',
          username: req.session.username,
          healthCardNumber: healthCardNumber,
          selectedHealthCardNumber: JSON.parse(JSON.stringify(result))[0].health_card_number,
          selectedPatient: patientName,
          selectedHeight: height,
          selectedWeight: weight,
          selectedBmi: bmi,
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
