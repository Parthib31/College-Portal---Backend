const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll_no: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },  
  degree: { type: String, required: true },
  year: { type: String, required: true },
  department: { type: String, required: true },
  grade: { type: String, required: true },  
  profession: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Alumni", alumniSchema);