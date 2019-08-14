'use strict';

const connection = require('../connection');


/**
 * Patient profile page
 */

module.exports = {
  getRecordRoute: (req, res) => {
    const healthCardNumber = req.query.healthCardNumber;
    const queryRecord = "SELECT * FROM `patients` INNER JOIN vitals ON patients.health_card_number  = vitals.health_card_number INNER JOIN immunology ON patients.health_card_number  = immunology.health_card_number  WHERE patients.health_card_number LIKE '%" + String(healthCardNumber) + "%' ORDER BY patients.health_card_number ASC"

    connection.db.query(queryRecord, (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length > 0) {
        /* Patient's name */
        const patientName = JSON.parse(JSON.stringify(result))[0].first_name + ' ' + JSON.parse(JSON.stringify(result))[0].last_name;

        /* Vitals */
        const height = JSON.parse(JSON.stringify(result))[0].body_height;
        const weight = JSON.parse(JSON.stringify(result))[0].body_weight;
        const bmi = Math.round((weight * 0.4535 / ((height * 0.3048) ** 2)) * 100) / 100;

        /* Count immunology */
        const countVaccines = result.length;

        res.render('profile.ejs', {
          patients: result,
          title: 'Medisquare | Patient Profile',
          pageId: 'record',
          username: req.session.username,
          healthCardNumber: healthCardNumber,
          selectedPatient: patientName,
          selectedHeight: height,
          selectedWeight: weight,
          selectedBmi: bmi,
          countVaccines: countVaccines,
          active: true,
        });
      } else {
        res.redirect(`/admin/profile?healthCardNumber=${healthCardNumber}`)
      }
    });
  },
};
