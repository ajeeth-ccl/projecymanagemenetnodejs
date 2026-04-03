const pool = require("../models/pg")
const Log = require("../models/logModel")


exports.getProjectsByUser = async(userId)=>{
    const result = await pool.query(
        "select * from projects where user_id = $1",[userId]
    )
    return result.rows
}
exports.createProject = async(userId,{name,description}) =>{
    const result = await pool.query(
        "insert into projects (name,description,user_id) values($1,$2,$3) returning *",
        [name,description,userId]
    )
    return result.rows[0]
}

exports.deleteProject = async(userId,projectId)=>{
    const result = await pool.query(
        "select * from projects where id = $1 and user_id = $2",[projectId,userId]
    )
    if(result.rows.length === 0){
        return null
    }
    await pool.query("delete from projects where id = $1",[projectId])
    return {id:Number(projectId)}
}


//mongo log

exports.createLog = async(log)=>{
    return await Log.create(log)
}