const Alumni = require("../models/alumni");

exports.getAlumniList = async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving alumni list" });
  }
};
