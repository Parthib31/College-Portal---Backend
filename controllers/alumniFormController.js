const AlumniApplication = require("../models/alumniForm");

exports.submitAlumniApplication = async (req, res) => {
  try {
    const alumniApplication = new AlumniApplication(req.body);
    await alumniApplication.save();
    res.json({ msg: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error submitting application" });
  }
};

