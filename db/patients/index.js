'use strict';

const connection = require('../../connection');

const db = connection.db;

// create medical record
async function createNewVitals(healthCardNumber, weight, height, recordDate) {
  const newVitalSQLStr = `INSERT INTO
    vitals (health_card_number, body_weight, body_height, record_date)
    VALUES
    ('${healthCardNumber}', ${weight}, ${height}, '${recordDate}')`;
  console.log(newVitalSQLStr);
  return db.query(newVitalSQLStr, (err, result) => {
    if (err) throw err;
    console.log(result);
    return result;
  });
}

async function createNewImmunologyEntry(healthCardNumber, type, dose, recordDate) {
  const newImmunologySQLStr = `INSERT INTO
    immunology (health_card_number, immunology_type, doses, record_date)
    VALUES  
    ('${healthCardNumber}', '${type}', ${dose}, '${recordDate}')`;
  console.log(newImmunologySQLStr);
  return db.query(newImmunologySQLStr, (err, result) => {
    if (err) throw err;
    console.log(result);
    return result;
  });
}

// update medical record
async function updateVitals(healthCardNumber, weight, height, recordDate) {
  const updateVitalsSQLStr = `
  UPDATE vitals 
  SET 
  body_weight = ${weight},
  body_height = ${height},
  record_date = '${recordDate}'
  WHERE health_card_number= '${healthCardNumber}';`;
  console.log(updateVitalsSQLStr);
  return db.query(updateVitalsSQLStr, (err, result) => {
    if (err) throw err;
    console.log(result);
    return result;
  });
}

async function updateImmunologyEntry(healthCardNumber, type, dose, recordDate) {
  const updateImmunologySQLStr = `UPDATE immunology 
  SET
  immunology_type = '${type}',
  doses = ${dose},
  record_date = '${recordDate}'
  WHERE health_card_number= '${healthCardNumber}';`;
  console.log(updateImmunologySQLStr);
  return db.query(updateImmunologySQLStr, (err, result) => {
    if (err) throw err;
    console.log(result);
    return result;
  });
}


module.exports = {
  createNewVitals,
  createNewImmunologyEntry,
  updateVitals,
  updateImmunologyEntry,
};
