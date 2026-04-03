const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const authMiddleware = require("../middlewares/authMiddleware");


router.get("/", authMiddleware, projectController.getProjectsByUser);
router.post("/", authMiddleware, projectController.createProject);
router.delete("/:id", authMiddleware, projectController.deleteProject);


module.exports = router;