const express = require("express");
const router = express.Router();
const logscontroller = require("../controllers/logsController");
const authMiddleware = require("../middlewares/authMiddleware")
router.get("/", authMiddleware,logscontroller.getLogsByUser);

module.exports = router;