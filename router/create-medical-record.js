'use strict';

const argon2 = require('argon2');
const db = require('../db/users');
const connection = require('../connection');

/**
 * Initial page rendering
 */
function getCreateMedicalRecordRoute(req, res) {
  res.render('register', {
    pageId: 'register',
    title: 'CreateMedicalRecord',
    username: req.session.username,
    healthCardNumber: req.body.healthCardNumber,
    
  });
}


/** TODO: 
 * Form submission
 */
function postCreateMedicalRecordRoute(req, res, next) {
  console.log('DO THIS: handle post create medical record');
}


module.exports = {
  get: getCreateMedicalRecordRoute,
  post: postCreateMedicalRecordRoute,
};
