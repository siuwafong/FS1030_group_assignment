'use strict';

const connection = require('../connection');


/**
 * Profile page
 */

module.exports = {
  getRecordRoute: (req, res) => {
    const healthCardNumber = req.query.healthCardNumber;
    if (healthCardNumber) {
      const queryRecord = "SELECT * FROM `patients` INNER JOIN medical_record ON patients.health_card_number  = medical_record.health_card_number WHERE patients.health_card_number LIKE '%" + String(healthCardNumber) + "%' ORDER BY patients.health_card_number ASC";

      connection.db.query(queryRecord, (err, result) => {
        if (err) {
          res.redirect('/');
        }

        console.log(result[0]);

        const record = JSON.parse(JSON.stringify(result))[0].record_type;
        const patientName = JSON.parse(JSON.stringify(result))[0].first_name + ' ' + JSON.parse(JSON.stringify(result))[0].last_name;

        res.render('profile.ejs', {
          patients: result,
          title: 'EMR Database',
          pageId: 'record',
          username: req.session.username,
          healthCardNumber: healthCardNumber,
          selectedHealthCardNumber: JSON.parse(JSON.stringify(result))[0].health_card_number,
          selectedPatient: patientName,
          selectedRecord: record,
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
