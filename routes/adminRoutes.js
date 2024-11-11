const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { login, getFacultyApplications, approveFacultyApplication, rejectFacultyApplication, getAlumniApplications, approveAlumniApplication,rejectAlumniApplication, signup } = require("../controllers/adminController");

router.post("/login", login);
router.post("/signup", signup);

router.get("/faculty/applications", auth, getFacultyApplications);
router.patch("/faculty/applications/:id/true", auth, approveFacultyApplication); 
router.patch("/faculty/applications/:id/false", auth, rejectFacultyApplication); 

router.get("/alumni/applications", auth, getAlumniApplications);
router.patch("/alumni/applications/:id/true", auth, approveAlumniApplication); 
router.patch("/alumni/applications/:id/false", auth, rejectAlumniApplication); 

module.exports = router;