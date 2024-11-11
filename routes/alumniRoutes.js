const express = require("express");
const router = express.Router();
const { getAlumniList } = require("../controllers/alumniController");
const { submitAlumniApplication } = require("../controllers/alumniFormController");
const Alumni = require("../models/alumni");

// Route to get individual faculty details
router.get("/:id", async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);
    if (!alumni) {
      return res.status(404).json({ msg: "Alumni member not found" });
    }
    res.json(alumni);
  } catch (error) {
    console.error("Error fetching alumni details:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/", getAlumniList);
router.post("/apply", submitAlumniApplication);

module.exports = router;