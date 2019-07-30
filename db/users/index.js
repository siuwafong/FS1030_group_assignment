'use strict';

const connection = require('../../connection');

const db = connection.db;


async function getUsers() {
  const qryStrSelectAllUsers = 'SELECT * FROM users';
  return db.query(qryStrSelectAllUsers, (err, result) => {
    if (err) throw err;
    console.log(result);
    return result;
  });
}


async function getUsersByName(username) {
  const qryStrSelectAllUsers = `SELECT username FROM users WHERE username = "${username}"`;
  return db.query(qryStrSelectAllUsers, (err, result) => {
    if (err) throw err;
    console.log(result);
    return result;
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

async function usernameExists(username) {
  const resultUserName = await getUsersByName(username);
  return !!resultUserName;
}


async function getUsersById(id) {
  const qryStrSelectUserByID = `SELECT username FROM users WHERE id = "${id}"`;
  return db.query(qryStrSelectUserByID, (err, result) => {
    if (err) throw err;
    console.log(result);
    return result;
  });
}


async function createUser(user) {
  const qryStrNewUser = `INSERT INTO users (username,password) VALUES "${user}"`;
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

async function removeUserById(id) {
  const qryStrRemoveUser = `DELETE FROM users WHERE id ="${id}"`;
  return db.query(qryStrRemoveUser, (err, result) => {
    if (err) throw err;
    console.log(result);
    return result;
  });
}


module.exports = {
  getUsers,
  getUsersById,
  createUser,
  userupdateUserById,
  removeUserById,
  getUsersByName,
  removeUserByName,
  updateUserPassword,
  usernameExists,
  getUserPasswordHash,
};
