'use strict';

const connection = require('../connection');

module.exports = {
  getCreatePatientRoute: (req, res) => {
    res.render('create-patient', {
      title: 'MediSquare | Create patient',
      pageId: 'create',
      username: req.session.username,
      message: '',
    });
  },

  postCreatePatientRoute: (req, res, next) => {

    // grab form data
    const inFirstName = req.body.firstName;
    const inLastName = req.body.lastName;
    const inHealthCardNumber = req.body.healthCardNumber;
    const indob = req.body.dob;
    const inGender = req.body.gender;
    const inEmail = req.body.email;
    const inAddress = req.body.address;
    const inPhone = req.body.phone;
    // check form
    const formErrors = {
      FirstName: inFirstName ? null : 'Invalid FirstName',
      LastName: inLastName ? null : 'Invalid LastName',
      HealthCardNumber: inHealthCardNumber  ? null : 'Invalid HealthCardNumber',
      dob: indob ? null : 'Invalid dob',
      Gender: inGender ? null : 'Invalid Gender',
      Email: inEmail ? null : 'Invalid Email',
      Address: inAddress ? null : 'Invalid Address',
      Phone: inPhone ? null : 'Invalid Phone',
    };// end formErrors

    console.log(formErrors);
    // If there are any errors do not create patient
    // validate form data
    if (formErrors.FirstName
        || formErrors.LastName
        || formErrors.HealthCardNumber
        || formErrors.dob
        || formErrors.Gender
        || formErrors.Email
        || formErrors.Address
        || formErrors.Phone) {
      console.log('invalid form');
      console.log(formErrors);
    } else {
      // create patient
      console.log('valid form');
      const healthCardNumberQuery = `SELECT * 
                                     FROM patients 
                                     WHERE health_card_number = '${String(inHealthCardNumber)}'`;
      console.log(String(inHealthCardNumber));

      // get health card
      connection.db.query(healthCardNumberQuery, (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (result.length > 0) {
          const message = 'Health Card Number already exists';
          res.render('create-patient.ejs', {
            message,
            title: 'MediSquare | Create patient',
            pageId: 'create',
            username: req.session.username,
          });
        } else {
          // create new patient
          const query = `INSERT INTO patients 
                         (first_name
                           ,last_name
                           ,health_card_number
                           ,dob
                           ,gender
                           ,email
                           ,address
                           ,phone )
                           VALUES
                           (
                           '${inFirstName}',
                           '${inLastName}',
                           '${inHealthCardNumber}',
                           '${indob}',
                           '${inGender}',
                           '${inEmail}',
                           '${inAddress}',
                           '${inPhone}'
                           );
                           `;
          console.log(query);
          connection.db.query(query, (err2, result2) => {
            if (err2) {
              return res.status(500).send(err2);
            }
            res.redirect('/admin/patients');
            return result2;
          }); // end insert
        }
      });
    }
  }, // end postCreatePatientRoute
}; // end module export
