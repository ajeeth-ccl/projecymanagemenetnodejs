const service = require("../services/logsService");

exports.getLogsByUser = async (req, res) => {
  try {
    const logs = await service.getLogsByUser(req.user.id);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching logs" });
  }
};