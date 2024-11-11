const Faculty = require("../models/faculty");

exports.getFacultyList = async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving faculty list" });
  }
};
