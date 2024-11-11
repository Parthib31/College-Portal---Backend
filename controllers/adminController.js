const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const Application = require("../models/facultyform");
const Faculty = require("../models/faculty");
const Alumni = require("../models/alumni");
const AlumniApplication = require("../models/alumniForm");

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already in use
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Username is already taken" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new admin
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });
    await newAdmin.save();

    res.json({ msg: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error during admin registration" });
  }
};
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ msg: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

exports.getFacultyApplications = async (req, res) => {
  const applications = await Application.find({ approved: false });
  res.json(applications);
};

exports.approveFacultyApplication = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the application by ID
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ msg: "Application not found" });
    }

    // Create a new Faculty member from the application details
    const newFaculty = new Faculty({
      name: application.name,
      email: application.email,
      phone: application.phone,
      education: application.education,  // Array or string, depending on schema setup
      research: application.research
    });
    
    // Save the new faculty member
    await newFaculty.save();

    // Update the application to mark it as approved or delete it
    application.approved = true;  // Mark application as approved
    await application.save();     // Save the updated application
    
    //delete the application after approval
    await Application.findByIdAndDelete(id);

    res.json({ msg: "Application approved and added to faculty list" });
  } catch (error) {
    console.error("Error approving application:", error);
    res.status(500).json({ msg: "Error approving application" });
  }
};
  
exports.rejectFacultyApplication = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Check if the application exists
      const application = await Application.findById(id);
      if (!application) {
        return res.status(404).json({ msg: "Application not found" });
      }

      // Remove the rejected application from the Applications collection
      await Application.findByIdAndDelete(id);
  
      res.json({ msg: "Application rejected" });
    } catch (error) {
      console.error("Error :", error); // Log error details
      res.status(500).json({ msg: "Error occured" });
    }
  };
  

// Controlling the alumni details
exports.getAlumniApplications = async (req, res) => {
  const alumniApplications = await AlumniApplication.find({ approved: false });
  res.json(alumniApplications);
};

exports.approveAlumniApplication = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the application by ID
    const alumniApplication = await AlumniApplication.findById(id);
    if (!alumniApplication) {
      return res.status(404).json({ msg: "alumniApplication not found" });
    }

    // Create a new Faculty member from the alumniApplication details
    const newAlumni = new Alumni({
      name: alumniApplication.name,
      roll_no: alumniApplication.roll_no,  // Array or string, depending on schema setup
      email: alumniApplication.email,
      phone: alumniApplication.phone,
      degree: alumniApplication.degree,  // Array or string, depending on schema setup
      year: alumniApplication.year,  // Array or string, depending on schema setup
      department: alumniApplication.department,  // Array or string, depending on schema setup
      grade: alumniApplication.grade,  // Array or string, depending on schema setup
      profession: alumniApplication.profession
    });
    
    // Save the new faculty member
    await newAlumni.save();
    
    //delete the alumniApplication after approval
    await AlumniApplication.findByIdAndDelete(id);

    res.json({ msg: "Application approved and added to alumni list" });
  } catch (error) {
    console.error("Error approving application:", error);
    res.status(500).json({ msg: "Error approving application" });
  }
};
  
exports.rejectAlumniApplication = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Check if the application exists
      const alumniApplication = await AlumniApplication.findById(id);
      if (!alumniApplication) {
        return res.status(404).json({ msg: "Application not found" });
      }

      // Remove the rejected application from the Applications collection
      await AlumniApplication.findByIdAndDelete(id);
  
      res.json({ msg: "Application rejected" });
    } catch (error) {
      console.error("Error :", error); // Log error details
      res.status(500).json({ msg: "Error occured" });
    }
  };  