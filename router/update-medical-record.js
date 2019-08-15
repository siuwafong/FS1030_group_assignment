'use strict';


const db = require('../db/users');
const connection = require('../connection');


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
 * Form submission
 */
function postudpateMedicalRecordRoute(req, res, next) {
  // grab data
  const healthCardNumber = req.body.healthCardNumber;
  const pageId = req.body.pageId;

  // must be logged in
  if (!req.session.username) {
    res.status(400).redirect('/');
  } else {
    console.log('user logged');
    console.log(healthCardNumber);

    // validate

    // check healthcard number
    if (healthCardNumber) {
      // health Card is not empty
      console.log(healthCardNumber);
      console.log('will render update page');
      console.log(pageId);
      if (pageId === 'updateMedicalRecord') {
        console.log('will handle post - update db');
      }
    } else {
      // handle empty health card number
      res.status(400).redirect('/');// end health card check
    } // end handle empty health card number
  } // end else block, handles update for logged in users
}


module.exports = {
  get: getudpateMedicalRecordRoute,
  post: postudpateMedicalRecordRoute,
};
