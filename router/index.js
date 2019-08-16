"use strict";

const express = require("express");

const router = express.Router();
const { getHomeRoute } = require("./home");
const { getSearchRoute } = require("./patients");
const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const registerRoutes = require("./register");
const { getProfileRoute } = require("./profile");
const { getRecordRoute } = require("./record");
const { getHistoryRoute } = require("./history");
const {
  getCreatePatientRoute,
  postCreatePatientRoute
} = require("./create-patient");
const profileEditRoutes = require("./profile-edit");
const createMedicalRecordRoute = require("./create-medical-record");
const updateMedicalRecordRoute = require("./update-medical-record");
/**
 * Define routes
 */

// Home page
router.get("/", getHomeRoute);

// Search page
router.get("/admin/patients/:id", getSearchRoute);

// Profile page
router.get("/admin/profile", getProfileRoute);
router.get("/admin/record", getRecordRoute);
router.get("/admin/history", getHistoryRoute);

// Create patient page
router.get("/admin/create", getCreatePatientRoute);
router.post("/admin/create", postCreatePatientRoute);

// Login page
router.get("/login", loginRoutes.get);
router.post("/login", loginRoutes.post);

// Logout
router.get("/logout", logoutRoutes.get);

// Register page
router.get("/register", registerRoutes.get);
router.post("/register", registerRoutes.post);

// profile edit page
router.get("/profile-edit", profileEditRoutes.get);
router.post("/profile-edit", profileEditRoutes.post);

// create medical record page

router.get("/create-medical-record", createMedicalRecordRoute.get);
router.post("/create-medical-record", createMedicalRecordRoute.post);

// profile edit page
router.get("/update-medical-record", updateMedicalRecordRoute.get);
router.post("/update-medical-record", updateMedicalRecordRoute.post);

module.exports = router;
