require("dotenv").config();
const express = require("express");
const cors = require("cors");

const session = require("express-session");

require("./config/db");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const markRoutes = require("./routes/markRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({

    origin: "http://localhost:3000",

    credentials: true

}));

app.use(session({

    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {

        maxAge: 1000 * 60 * 60

    }

}));

app.use("/auth", authRoutes);
app.use("/session", sessionRoutes);
app.use("/admins", adminRoutes);
app.use("/students", studentRoutes);
app.use("/marks", markRoutes);

// Start Server
app.listen(process.env.PORT, () => {

    console.log("Server running on port 5000");

});