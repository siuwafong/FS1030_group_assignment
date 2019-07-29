'use strict';

const express = require('express');

const router = express.Router();
const { getHomeRoute } = require('./home');
const { getSearchRoute } = require('./patients');
const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const registerRoutes = require('./register');
const { getProfileRoute } = require('./profile');
const { getCreatePatientRoute, postCreatePatientRoute } = require('./create-patient');


/**
 * Define routes
 */

// Home page
router.get('/', getHomeRoute);

// Search page
router.get('/admin/patients', getSearchRoute);

// Profile page
router.get('/admin/profile', getProfileRoute);

// Create patient page
router.get('/admin/create', getCreatePatientRoute);
router.post('/admin/create', postCreatePatientRoute);

// Login page
router.get('/login', loginRoutes.get);
router.post('/login', loginRoutes.post);

// Logout
router.get('/logout', logoutRoutes.get);

// Register page
router.get('/register', registerRoutes.get);
router.post('/register', registerRoutes.post);


module.exports = router;
