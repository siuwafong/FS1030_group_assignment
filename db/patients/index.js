'use strict';


const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig);


/**
 * Reads and returns contents of 'patients' table
 */
async function readPatients() {
  return db('patients');
}


/**
 * Reads and filters contents of 'patients' table
 */
async function searchPatients(query) {
  let patients = await readPatients();

  if (query.healthCardNumber) {
    const filter = patient => patient.health_card_number.includes(query.healthCardNumber);
    patients = patients.filter(filter);
  }
  return patients;
}


module.exports = {
  readPatients: readPatients,
  searchPatients: searchPatients,
};
