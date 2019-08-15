"use strict";

const connection = require("../connection");

/**
 * Visit history page
 */

module.exports = {
  getHistoryRoute: (req, res) => {
    const healthCardNumber = req.query.healthCardNumber;
    if (healthCardNumber) {
      const queryRecord =
        "SELECT * FROM `patients` INNER JOIN history_visit ON patients.health_card_number  = history_visit.health_card_number WHERE patients.health_card_number LIKE '%" +
        String(healthCardNumber) +
        "%' ORDER BY history_visit.visit_date DESC";

      // const queryRecord = "SELECT * FROM `patients` INNER JOIN vitals ON patients.health_card_number  = vitals.health_card_number WHERE patients.health_card_number LIKE '%" + String(healthCardNumber) + "%' ORDER BY patients.health_card_number ASC";
      connection.db.query(queryRecord, (err, result) => {
        if (err) {
          res.redirect("/");
        }

        const patients = result.map(res => {
          return {
            visit_date: res.visit_date,
            practician_last_name: res.practician_last_name,
            note: res.note
          };
        });

        const patientNameQuery =
          "SELECT CONCAT(first_name, ' ', last_name) AS patientName FROM patients WHERE health_card_number = ?";
        connection.db.query(
          patientNameQuery,
          [healthCardNumber],
          (err, result) => {
            if (err) {
              throw err;
            }
            const patientName = result.map(res => {
              return {
                patientName: res.patientName
              };
            });
            res.render("profile.ejs", {
              patients: result,
              title: "EMR Database",
              pageId: "history",
              username: req.session.username,
              healthCardNumber: healthCardNumber,
              selectedHealthCardNumber: healthCardNumber,
              patients: patients,
              selectedPatient: patientName[0].patientName
            });
          }
        );
      });
    }
  }
};
