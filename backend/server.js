const express = require("express");
const cors = require("cors");

const con = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {

    res.send("Academic Management System Backend Running");

});

// Start Server
app.listen(5000, () => {

    console.log("Server running on port 5000");

});