const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentsName: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  pincode: { type: String },
  state: { type: String },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  education: [
    {
      degree: String,
      institution: String,
      year: String,
      additionalInfo: String
    }
  ],
  research: { type: String },
  approved: { type: Boolean, default: false }  // Admin-controlled approval
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);