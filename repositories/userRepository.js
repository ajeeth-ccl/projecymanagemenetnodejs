const pool = require("../models/pg")

exports.createUser = async(username,hashedPassword)=>{
    const result = await pool.query(
        "insert into users (username,password) values($1,$2) returning id,username,role",
        [ username,hashedPassword]
    )
    return result.rows[0]
}
exports.findUserByUsername = async(username)=>{
    const result = await pool.query(
        "select * from users where username = $1",[username]
    )
    return result.rows[0]
}

exports.getAllUsers = async()=>{
    const result  = await pool.query(
        " select id,username,role  from users")
        return result.rows
}