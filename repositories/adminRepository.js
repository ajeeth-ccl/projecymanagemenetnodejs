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


exports.getAllUsers = async()=>{
    const result = await pool.query("select id,username,role from users")
    return result.rows
}

exports.getAllProjects = async()=>{
    const result = await pool.query(
        `select projects.id,projects.name,projects.description,users.username from projects
        join users on projects.user_id  = users.id `
       )
       return result.rows
}