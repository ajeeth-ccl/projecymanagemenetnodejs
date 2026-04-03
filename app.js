const express = require("express");
const cors = require("cors");

require("./models/mongo");

const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require("./routes/userRoutes");
const logsRoutes = require("./routes/logsRoutes");
const adminRoutes = require("./routes/adminRoutes")




const app = express();

app.use(cors());
app.use(express.json());

app.use("/projects", projectRoutes);
app.use("/users", userRoutes);
app.use("/logs", logsRoutes);
app.use("/admin",adminRoutes)
 

module.exports = app;