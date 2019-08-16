'use strict';


const db = require('../db/patients');
const connection = require('../connection');

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
      // get data
      const queryStr = `SELECT *
      FROM patients
      INNER JOIN vitals
      ON patients.health_card_number  = vitals.health_card_number
      INNER JOIN immunology
      ON patients.health_card_number  = immunology.health_card_number
      WHERE patients.health_card_number = "${healthCardNumber}"
      `;
      connection.db.query(queryStr, (err, result) => {
        if (err) {
          res.redirect('/');
        }

        if (result.length <= 0) {
          console.log('no result');
          // render create new record
          // it should not hit here if routes are done correctly
          // if it's here something went terribly wrong
          res.render('create-medical-record.ejs', {
            title: 'Create Medical Record',
            pageId: 'createMedicalReCord',
            username: req.session.username,
            healthCardNumber: healthCardNumber,
          });
        } else {
          // data found

          // consolidate results
          /* Patient's name */
          const patientName = `${JSON.parse(JSON.stringify(result))[0].first_name} ${JSON.parse(JSON.stringify(result))[0].last_name}`;

          /* Vitals */
          const height = JSON.parse(JSON.stringify(result))[0].body_height;
          const weight = JSON.parse(JSON.stringify(result))[0].body_weight;
          const bmi = Math.round((weight * 0.4535 / ((height * 0.3048) ** 2)) * 100) / 100;
          const recordDate = JSON.parse(JSON.stringify(result))[0].record_date;
          const immunologyType = JSON.parse(JSON.stringify(result))[0].immunology_type;
          const doses = JSON.parse(JSON.stringify(result))[0].doses;

          console.log('will render update page');
          res.render('update-medical-record.ejs', {
            title: 'MediSquare | Update Medical Record',
            pageId: 'updateMedicalRecord',
            username: req.session.username,
            healthCardNumber: healthCardNumber,
            patientName: patientName,
            height: height,
            weight: weight,
            bmi: bmi,
            recordDate: formatDate(recordDate),
            immunologyType: immunologyType,
            doses: doses,
          });
        }
      }); //  end fetch patient data and render udpate page
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

      // grab original data

      const queryStr = `SELECT *
      FROM patients
      INNER JOIN vitals
      ON patients.health_card_number  = vitals.health_card_number
      INNER JOIN immunology
      ON patients.health_card_number  = immunology.health_card_number
      WHERE patients.health_card_number = "${healthCardNumber}"
      `;
      connection.db.query(queryStr, (err, result) => {
        if (err) {
          res.redirect('/');
        }

        if (result.length <= 0) {
          console.log('no result');
          // render create new record
          // it should not hit here if routes are done correctly
          // if it's here something went terribly wrong
          res.render('create-medical-record.ejs', {
            title: 'Create Medical Record',
            pageId: 'createMedicalReCord',
            username: req.session.username,
            healthCardNumber: healthCardNumber,
          });
        } else {
          // data found

          // consolidate results
          /* Patient's name */
          // eslint-disable-next-line max-len
          // const patientName = `${JSON.parse(JSON.stringify(result))[0].first_name} ${JSON.parse(JSON.stringify(result))[0].last_name}`;

          /* Vitals */
          // const Originheight = JSON.parse(JSON.stringify(result))[0].body_height;
          // const Originweight = JSON.parse(JSON.stringify(result))[0].body_weight;
          // const Originbmi = Math.round((weight * 0.4535 / ((height * 0.3048) ** 2)) * 100) / 100;
          const OriginrecordDate = JSON.parse(JSON.stringify(result))[0].record_date;
          const OriginimmunologyType = JSON.parse(JSON.stringify(result))[0].immunology_type;
          // const Origindoses = JSON.parse(JSON.stringify(result))[0].doses;

          // update vitals
          db.updateVitals(healthCardNumber, weight, height, recordDate)
            .then(resultVitals => resultVitals)
            .catch((error) => {
              console.log(error);
              console.log('error');
            });
          // update new immunology entry
          db.updateImmunologyEntry(healthCardNumber,
            immunologyType,
            doses,
            recordDate,
            OriginimmunologyType,
            formatDate(OriginrecordDate))
            .then(resultImmunology => resultImmunology)
            .catch(next);
        }

        res.status(200).redirect(`/admin/record?healthCardNumber=${healthCardNumber}`);
      });
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
