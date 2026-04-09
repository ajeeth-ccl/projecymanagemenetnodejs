const service = require("../services/logsService");

exports.getLogsByUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit)|| 5
    const userId = req.user.id
    const search = req.query.search
    const logs = await service.getLogsByUser(userId,page,limit,search);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching logs" });
  }
}; 