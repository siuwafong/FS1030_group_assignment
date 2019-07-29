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

  postCreatePatientRoute: (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const healthCardNumber = req.body.healthCardNumber;

    const healthCardNumberQuery = "SELECT * FROM `patients` WHERE health_card_number = '" + String(healthCardNumber) + "'";
    console.log(String(healthCardNumber));

    connection.db.query(healthCardNumberQuery, (err, result) => {
      console.log(result);
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
      // send patient's details to the database
        const query = "INSERT INTO `patients` (first_name, last_name, health_card_number) VALUES ('" + firstName + "', '" + lastName + "', '" + healthCardNumber + "')";
        connection.db.query(query, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.redirect('/admin/patients');
        });
      }
    });
  },


};
