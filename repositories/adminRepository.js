const pool = require("../models/pg")
const Log = require("../models/logModel")

exports.createUser = async(username,hashedPassword) =>{
    const result = await pool.query(
        "insert into users (username,password) values($1,$2) returning id,username,role",
        [username,hashedPassword]
    )
    return result.rows[0]
}

exports.getAllLogs = async () => {
  return await Log.find().sort({ createdAt: -1 });
};