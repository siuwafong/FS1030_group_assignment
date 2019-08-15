'use strict';

const connection = require('../connection');


/**
 * Visit history page
 */

module.exports = {
  getHistoryRoute: (req, res) => {
    const healthCardNumber = req.query.healthCardNumber;
    if (healthCardNumber) {
      const queryRecord = "SELECT * FROM `patients` INNER JOIN history_visit ON patients.health_card_number  = history_visit.health_card_number WHERE patients.health_card_number LIKE '%" + String(healthCardNumber) + "%' ORDER BY history_visit.visit_date DESC"

      // const queryRecord = "SELECT * FROM `patients` INNER JOIN vitals ON patients.health_card_number  = vitals.health_card_number WHERE patients.health_card_number LIKE '%" + String(healthCardNumber) + "%' ORDER BY patients.health_card_number ASC";

      connection.db.query(queryRecord, (err, result) => {
        if (err) {
          res.redirect('/');
        }

        if (result.length > 0) {

          /* Patient's name */
          const patientName = JSON.parse(JSON.stringify(result))[0].first_name + ' ' + JSON.parse(JSON.stringify(result))[0].last_name;



          // /* Visits */
          const visitsDate = JSON.parse(JSON.stringify(result))[0].visit_date;
          const visitsPractitian = 'Dr.' + JSON.parse(JSON.stringify(result))[0].practitian_last_name;
          const visitsNote = JSON.parse(JSON.stringify(result))[0].note;


          res.render('profile.ejs', {
            patients: result,
            title: 'EMR Database',
            pageId: 'history',
            username: req.session.username,
            healthCardNumber: healthCardNumber,
            selectedHealthCardNumber: JSON.parse(JSON.stringify(result))[0].health_card_number,
            selectedPatient: patientName,
            selectedVisitsDate: visitsDate,
            selectedVisitsPractitian: visitsPractitian,
            selectedVisitsNote: visitsNote,
          });
        } else {
          res.redirect(`/admin/profile?healthCardNumber=${healthCardNumber}`)
        }
      });
    }
  },
};
