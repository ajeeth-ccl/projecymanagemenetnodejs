const bcrypt = require("bcrypt")
const repo = require("../repositories/adminRepository")


exports.createUserService = async(username,password)=>{
    const hashed = await bcrypt.hash(password,10)
    return await repo.createUser(username,hashed)
}

exports.getAllLogService = async(page,limit,search)=>{
    return await repo.getAllLogs(page,limit,search)
}

exports.getAllUsersService = async(page,limit,search)=>{
    return await repo.getAllUsers(page,limit,search)
}

exports.getAllProjectsService = async(page,limit,search)=>{
    return await repo.getAllProjects(page,limit,search)
}
exports.toggleUserStatusService = async(userId,isActive)=>{
    return await repo.toggleUserStatus(userId,isActive)
}
