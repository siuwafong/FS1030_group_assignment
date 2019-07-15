'use strict';

const express = require('express');

const router = express.Router();
const homeRoutes = require('./home');
const searchRoutes = require('./search');
const loginRoutes = require('./login');
const logoutRoutes = require('./logout');
const registerRoutes = require('./register');


/**
 * Define routes
 */

// Home page
router.get('/', homeRoutes.get);

// Search page + delete function
router.get('/admin/search', searchRoutes.get);


// Login page
router.get('/login', loginRoutes.get);
router.post('/login', loginRoutes.post);

// Logout
router.get('/logout', logoutRoutes.get);

// Register page
router.get('/register', registerRoutes.get);
router.post('/register', registerRoutes.post);


module.exports = router;
