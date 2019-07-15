'use strict';


const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig);


/**
 * Reads and returns contents of books.json
 */
async function searchPatients() {
  return db('patients');
}


module.exports = {
  searchPatients: searchPatients,

};
