const repo = require("../repositories/logsRepository");

exports.getLogsByUser = async (userId,page,limit,search) => {
  return await repo.getLogsByUser(userId,page,limit,search);
};