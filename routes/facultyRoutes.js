const express = require("express");
const router = express.Router();
const { getFacultyList } = require("../controllers/facultyController");
const { submitApplication } = require("../controllers/facultyFormController");
const Faculty = require("../models/faculty");

// Route to get individual faculty details
router.get("/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ msg: "Faculty member not found" });
    }
    res.json(faculty);
  } catch (error) {
    console.error("Error fetching faculty details:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/", getFacultyList);
router.post("/apply", submitApplication);

module.exports = router;