'use strict';

/**
 * Search page
 */

const db = require('../db/patients');

async function getSearchRoute(req, res, next) {
  try {
    const patients = await db.readPatients();
    res.render('search', {
      patients,
      pageId: 'search',
      title: 'Search',
      username: req.session.username,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  get: getSearchRoute,
};
