'use strict';

const connection = require('../connection');


/**
 * Profile page
 */

module.exports = {
  getProfileRoute: (req, res) => {
    const healthCardNumber = req.query.healthCardNumber;
    if (healthCardNumber) {
      const query = "SELECT * FROM `patients` WHERE health_card_number LIKE '%" + String(healthCardNumber) + "%' ORDER BY health_card_number ASC";
      // execute query
      connection.db.query(query, (err, result) => {
        if (err) {
          res.redirect('/');
        }

        const patientName = JSON.parse(JSON.stringify(result))[0].first_name + ' ' + JSON.parse(JSON.stringify(result))[0].last_name
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(JSON.parse(JSON.stringify(result))[0].dob);
        const dob = date.toLocaleDateString('en-US', options);
        const gender =  JSON.parse(JSON.stringify(result))[0].gender;
        const email = JSON.parse(JSON.stringify(result))[0].email;
        const address = JSON.parse(JSON.stringify(result))[0].address;
        const phone = JSON.parse(JSON.stringify(result))[0].phone;

        res.render('profile.ejs', {
          patients: result,
          title: 'EMR Database',
          pageId: 'profile',
          username: req.session.username,
          healthCardNumber: healthCardNumber,
          selectedPatient: patientName,
          selectedHealthCardNumber: JSON.parse(JSON.stringify(result))[0].health_card_number,
          selectedBirthDate: dob,
          selectedGender: gender,
          selectedEmail: email,
          selectedAddress: address,
          selectedPhone: phone,
        });
      });
    } else {
      const query = "SELECT * FROM `patients` ORDER BY health_card_number ASC";
      // execute query
      connection.db.query(query, (err, result) => {
        if (err) {
          res.redirect('/');
        }

        res.render('profile.ejs', {
          patients: result,
          title: 'EMR Database',
          pageId: 'profile',
          username: req.session.username,
          healthCardNumber: healthCardNumber,          
        });
      });
    }
  },
};
