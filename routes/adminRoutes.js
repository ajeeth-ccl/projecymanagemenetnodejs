const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController")
const authMiddleware = require("../middlewares/authMiddleware")
const adminMiddleware = require("../middlewares/adminMiddleware")

router.post("/users",authMiddleware,adminMiddleware,adminController.createUser)

router.get("/logs",authMiddleware,adminMiddleware,adminController.getAllLogs)

router.get("/projects",authMiddleware,adminMiddleware,adminController.getAllProjects)

router.get("/users",authMiddleware,adminMiddleware,adminController.getAllUsers)

module.exports = router