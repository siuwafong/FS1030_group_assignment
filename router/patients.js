"use strict";

const connection = require("../connection");

/**
 * Search page
 */

module.exports = {
  getSearchRoute: (req, res) => {
    let healthCardNumber = req.param("healthCardNumber");

    let query;
    if (!healthCardNumber) {
      query = "SELECT * FROM `patients` ORDER BY health_card_number ASC";
    } else {
      query =
        "SELECT * FROM `patients` WHERE health_card_number LIKE '%" +
        healthCardNumber +
        "%'";
    }

    const pageNumber = Number(req.params.id.charAt(0));

    // execute query
    connection.db.query(query, [healthCardNumber], (err, result) => {
      if (err) {
        res.redirect("/");
      }
      let patientsPage = new Array();

      let patients = result;

      if (patients.length === 0) {
        let emptyPatient = new Object();
        emptyPatient.health_card_number =
          "No patient with the health card number " +
          healthCardNumber +
          " found.";
        emptyPatient.first_name = "";
        emptyPatient.last_name = "";
        emptyPatient.age = "";
        patientsPage[0] = emptyPatient;
      }
      // pagination functions
      const patientCount = patients.length;
      let pageCount;
      if (patientCount === 0) {
        pageCount = 1;
      } else {
        pageCount = Math.ceil(patientCount / 10);
      }

      let i;
      function makePage() {
        if (patientCount < 11) {
          for (i = 0; i < patients.length; i++) patientsPage.push(patients[i]);
        } else if (Number(pageNumber) === pageCount) {
          for (i = pageNumber * 10 - 10; i < patients.length; i++)
            patientsPage.push(patients[i]);
        } else {
          for (i = pageNumber * 10 - 10; i < pageNumber * 10; i++)
            patientsPage.push(patients[i]);
        }
      }
      makePage();

      let pageArray = new Array();
      function makePageArray() {
        for (i = 1; i < pageCount + 1; i++) pageArray.push(i);
      }
      makePageArray();

      res.render("patients.ejs", {
        patients: result,
        title: "EMR Database",
        pageId: "patients",
        username: req.session.username,
        pageArray,
        patientCount,
        patientsPage,
        pageCount: pageCount,
        currentPage: pageNumber
      });
    });
  }
};
