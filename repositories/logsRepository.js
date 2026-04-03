const Log = require("../models/logModel")


exports.getLogsByUser = async (userId) => {
  return await Log.find({ userId }).sort({ createdAt: -1 });
};