const Application = require("../models/facultyform");

exports.submitApplication = async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.json({ msg: "Application submitted successfully" });
  } catch (error) {
    console.log(error);    
    res.status(500).json({ msg: "Error submitting application" });
  }
};