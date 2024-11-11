const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const facultyRoutes = require("./routes/facultyRoutes");
const alumniRoutes = require("./routes/alumniRoutes")
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
// Apply CORS middleware
app.use(cors()); // Enable CORS for all routes

app.use(express.json());


// Routes
app.use("/api/faculty", facultyRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
