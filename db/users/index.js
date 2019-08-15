'use strict';

const connection = require('../../connection');

const db = connection.db;


async function getUsers() {
  const qryStrSelectAllUsers = 'SELECT * FROM users';
  return db.query(qryStrSelectAllUsers, (err, result) => {
    if (err) throw err;
    return result;
  });
}


async function getUsersByName(username) {
  const qryStrSelectAllUsers = `SELECT username FROM users WHERE username = "${username}"`;
  return db.query(qryStrSelectAllUsers, (err, result) => {
    if (err) throw err;
    console.log(result);
    return result[0].password;
  });
}

async function getUserPasswordHash(username) {
  const qryStrSelectUserPasswordHash = `SELECT password FROM users WHERE username = "${username}"`;
  return db.query(qryStrSelectUserPasswordHash, (err, result) => {
    if (err) throw err;
    console.log(result);
    return result;
  });
}

async function countUserNames(username, callback) {
  const qryUserNameExist = `select count(username) as UsersCount from users where username = '${username}'`;
  // const resultUserName = await getUsersByName(username);
  return db.query(qryUserNameExist, (err, result) => {
    if (err) throw err;
    return callback(result[0].UsersCount);
  });
}

async function usernameExists(username, callback) {
  const qryUserNameExist = `select count(username) as UsersCount from users where username = '${username}'`;
  // const resultUserName = await getUsersByName(username);
  return db.query(qryUserNameExist, (err, result) => {
    if (err) throw err;
    return callback(result[0].UsersCount > 0 );
  });
}

async function getUsersById(id) {
  const qryStrSelectUserByID = `SELECT username FROM users WHERE id = "${id}"`;
  return db.query(qryStrSelectUserByID, (err, result) => {
    if (err) throw err;
    console.log(result);
    return result;
  });
}


async function addUser(user) {
  const qryStrNewUser = `INSERT INTO users (username,password) VALUES ("${user.username}", "${user.password}")`;
  console.log(qryStrNewUser);
  return db.query(qryStrNewUser, (err, result) => {
    if (err) throw err;
    console.log(result);
    return result;
  });
}


async function userupdateUserById(id, user) {
  const qryUpdateUser = `UPDATE users SET username="${user}" WHERE id ="${id}"`;
  return db.query(qryUpdateUser, (err, result) => {
    if (err) throw err;
    console.log(result);
    return result;
  });
}

async function updateUserPassword(username, password) {
  const qryUpdateUser = `UPDATE users SET password="${password}" WHERE username ="${username}"`;
  return db.query(qryUpdateUser, (err, result) => {
    if (err) throw err;
    console.log(result);
    return result;
  });
}


async function removeUserByName(username) {
  const qryStrNewUser = `DELETE FROM users WHERE username ="${username}"`;
  return db.query(qryStrNewUser, (err, result) => {
    if (err) throw err;
    console.log(result);
    return result;
  });
}

/**
 * remove user by ID
 * @param {string} id user id
 * @returns {Promise<Object>} Result
 */
async function removeUserById(id) {
  const qryStrRemoveUser = `DELETE FROM users WHERE id ="${id}"`;
  return db.query(qryStrRemoveUser, (err, result) => {
    if (err) throw err;
    console.log(result);
    return result;
  });
}

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

module.exports = {
  getUsers,
  getUsersById,
  addUser,
  userupdateUserById,
  removeUserById,
  getUsersByName,
  removeUserByName,
  updateUserPassword,
  usernameExists,
  getUserPasswordHash,
  countUserNames,
  createNewVitals,
  createNewImmunologyEntry,
};
