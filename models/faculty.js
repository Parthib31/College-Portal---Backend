// const mongoose = require("mongoose");

// const FacultySchema = new mongoose.Schema({
//   name: String,
//   photoUrl: String,
//   phone: String,
//   email: String,
// });

// module.exports = mongoose.model("Faculty", FacultySchema);

const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  photoUrl: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  education: [
    {
      degree: String,
      institution: String,
      year: String,
      additionalInfo: String
    }
  ],
  research: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Faculty", facultySchema);