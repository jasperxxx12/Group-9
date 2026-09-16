const express = require("express");
const cookieParser = require("cookie-parser");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());
app.use(cookieParser()); 

app.use('/auth', authRoutes);          
app.use('/', verifyToken, studentRoutes); 

module.exports = app;