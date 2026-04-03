const repo = require("../repositories/logsRepository");

exports.getLogsByUser = async (userId) => {
  return await repo.getLogsByUser(userId);
};