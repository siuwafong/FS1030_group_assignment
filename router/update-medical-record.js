'use strict';


const db = require('../db/patients');

// eslint-disable-next-line no-unused-vars
function formatDate(date) {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  console.log(day);
  console.log(month);
  console.log(year);
  return [year, month, day].join('-');
}

/**
 * Initial page rendering
 */
function getudpateMedicalRecordRoute(req, res) {
  const healthCardNumber = req.query.healthCardNumber;
  console.log(req.session.username);

  // must be logged in
  if (!req.session.username) {
    res.status(400).redirect('/');
  } else {
    console.log('user logged');
    console.log(healthCardNumber);
    // validate
    // eslint-disable-next-line no-lonely-if
    if (healthCardNumber) {
      console.log('will render update page');
      res.render('update-medical-record.ejs', {
        title: 'MediSquare | Update Medical Record',
        pageId: 'updateMedicalRecord',
        username: req.session.username,
        HealthCardNumber: healthCardNumber,
      });
    } else {
      res.status(400).redirect('/');
    }// end health card check
  } // end log in check
}

// eslint-disable-next-line no-unused-vars

/**
 * Form submission
 */
function postudpateMedicalRecordRoute(req, res, next) {
  // grab data
  const healthCardNumber = req.body.healthCardNumber;
  const weight = req.body.weight;
  const height = req.body.height;
  const recordDate = req.body.recordDate;
  const immunologyType = req.body.immunologyType;
  const doses = req.body.doses;
  // must be logged in
  if (!req.session.username) {
    res.status(400).redirect('/');
  } else {
    console.log('user logged');
    console.log(healthCardNumber);

    // validate
    if (healthCardNumber || weight || height || recordDate || immunologyType || doses) {
      // health Card is not empty
      console.log('will render update page');
      console.log('will handle post - update db');
      console.log('DO THIS: handle post create medical record');
      console.log(weight);
      console.log(height);
      console.log(recordDate);
      console.log(immunologyType);
      console.log(doses);
      console.log(healthCardNumber);

      db.updateVitals(healthCardNumber, weight, height, recordDate)
        .then(result => result)
        .catch((error) => {
          console.log(error);
          console.log('error');
        });
      // create new immunology entry
      db.updateImmunologyEntry(healthCardNumber, immunologyType, doses, recordDate)
        .then(result => result)
        .catch(next);
    } else {
      // invalid input
      res.status(400).redirect('/');// end health card check
    } // end handle empty health card number
  } // end else block, handles update for logged in users
}


module.exports = {
  get: getudpateMedicalRecordRoute,
  post: postudpateMedicalRecordRoute,
  formatDate,
};
