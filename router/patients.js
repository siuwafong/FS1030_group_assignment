"use strict";

const connection = require("../connection");

/**
 * Search page
 */

module.exports = {
  getSearchRoute: (req, res) => {
    const query = "SELECT * FROM `patients` ORDER BY health_card_number ASC";
    const pageNumber = Number(req.params.id);

    // execute query
    connection.db.query(query, (err, result) => {
      if (err) {
        res.redirect("/");
      }

      let patients = result;

      // pagination functions
      const patientCount = patients.length;
      let pageCount = Math.ceil(patientCount / 10);
      let i;
      let patientsPage = new Array();

      function makePage() {
        if (Number(pageNumber) === pageCount || patientCount < 11) {
          for (i = pageNumber * 10 - 9; i < patients.length; i++)
            patientsPage.push(patients[i]);
        } else {
          for (i = pageNumber * 10 - 9; i < pageNumber * 10; i++)
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
