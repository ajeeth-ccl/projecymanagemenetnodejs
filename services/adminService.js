const bcrypt = require("bcrypt")
const repo = require("../repositories/adminRepository")


exports.createUserService = async(username,password)=>{
    const hashed = await bcrypt.hash(password,10)
    return await repo.createUser(username,hashed)
}

exports.getAllLogService = async()=>{
    return await repo.getAllLogs()
}