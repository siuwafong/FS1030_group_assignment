'use strict';

/**
 * Profile page
 */

const db = require('../db/patients');

async function getProfileRoute(req, res, next) {
  try {
    const patients = await db.searchPatients(req.query);
    res.render('profile', {
      patients,
      title: 'EMR Database',
      pageId: 'profile',
      username: req.session.username,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  get: getProfileRoute,
};
