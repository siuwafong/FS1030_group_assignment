'use strict';


const db = require('../db/patients');


/**
 * Initial page rendering
 */
function getCreateMedicalRecordRoute(req, res) {
  res.render('create-medical-record', {
    pageId: 'Create Medical Record',
    title: 'CreateMedicalRecord',
    username: req.session.username,
    healthCardNumber: req.body.healthCardNumber,
  });
}


/** TODO:
 * Form submission
 */
function postCreateMedicalRecordRoute(req, res, next) {
  const healthCardNumber = req.body.healthCardNumber;
  const weight = req.body.weight;
  const height = req.body.height;
  const recordDate = req.body.recordDate;
  const immunologyType = req.body.immunologyType;
  const doses = req.body.doses;
  console.log(req.query.healthCardNumber);

  if (healthCardNumber || weight || height || recordDate || immunologyType || doses) {
    console.log('DO THIS: handle post create medical record');
    console.log(`health card: ${healthCardNumber}`);
    console.log(weight);
    console.log(height);
    console.log(recordDate);
    console.log(immunologyType);
    console.log(doses);
    // create new vitals entry
    db.createNewVitals(healthCardNumber, weight, height, recordDate)
      .then(result => result)
      .catch((error) => {
        console.log(error);
        console.log('error');
      });
    // create new immunology entry
    db.createNewImmunologyEntry(healthCardNumber, immunologyType, doses, recordDate)
      .then(result => result)
      .catch(next);

    res.status(200).redirect(`/admin/record?healthCardNumber=${healthCardNumber}`);
  }
}


module.exports = {
  get: getCreateMedicalRecordRoute,
  post: postCreateMedicalRecordRoute,
};
