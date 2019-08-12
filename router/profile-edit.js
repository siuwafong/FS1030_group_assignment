'use strict';


const db = require('../db/users');
const connection = require('../connection');


/**
 * Initial page rendering
 */
function getProfileEditRoute(req, res) {
    const inHealthCardNumber = req.body.healthCardNumber;
    const inDOB = req.body.DOB;
    const inGender = req.body.Gender;
    const inEmail = req.body.Email;
    const inAddress = req.body.Address;
    const inPhone = req.body.Phone;
    const inAction = req.body.Action;
  
    console.log(inHealthCardNumber);
    console.log(inDOB);
    console.log(inGender);
    console.log(inEmail);
    console.log(inAddress);
    console.log(inPhone);
    console.log(inAction);



}

function formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    console.log(day);
    console.log(month);
    console.log(year);
    return [year, month, day].join('-');
}
/**
 * Form submission
 */
function postProfileEditRoute(req, res, next) {    

  // grab data
  const inHealthCardNumber = req.body.healthCardNumber;
  let inDOB = req.body.DOB;
  const inGender = req.body.Gender;
  const inEmail = req.body.Email;
  const inAddress = req.body.Address;
  const inPhone = req.body.Phone;
  const inPatient = req.body.Patient;
  const inAction = req.body.Action;

  if (inAction === 'Edit') {
    inDOB = formatDate(req.body.DOB);
    console.log('render edit');
    console.log(inHealthCardNumber);
    console.log(inDOB);
    console.log(inGender);
    console.log(inEmail);
    console.log(inAddress);
    console.log(inPhone);
    console.log(inPatient);
    console.log(inAction);

    // render profile-edit
    res.render('profile-edit', {
      title: 'MediSquare | Edit Patient Info',
      pageId: 'profileEdit',
      username: req.session.username,
      message: '',
      HealthCardNumber: inHealthCardNumber,
      DOB: inDOB,
      Gender: inGender,
      Email: inEmail,
      Addres: inAddress,
      Phone: inPhone,
      Patient: inPatient,
      Action: inAction,
    }); // end render
  } else {
    console.log('render save');
    console.log(inHealthCardNumber);
    console.log(inDOB);
    console.log(inGender);
    console.log(inEmail);
    console.log(inAddress);
    console.log(inPhone);
    console.log(inPatient);
    console.log(inAction);
    // prepare SQL string
    const updatePatientSQLStr = `UPDATE patients 
                                 SET dob='${inDOB}',
                                     gender='${inGender}',
                                     email='${inEmail}',
                                     address='${inAddress}',
                                     phone='${inPhone}'
                                 
                                 WHERE health_card_number='${inHealthCardNumber}'`;

    
    try {
      console.log(updatePatientSQLStr);
      // update patient profile
      connection.db.query(updatePatientSQLStr, (err2, result2) => {
        if (err2) {
          return res.status(500).send(err2);
        }
        res.redirect(`/admin/profile?healthCardNumber=${inHealthCardNumber}`);
        return result2;
      }); // end insert
    } catch (error) {
      next();
    }
    
  }
}


module.exports = {
  get: getProfileEditRoute,
  post: postProfileEditRoute,
};
