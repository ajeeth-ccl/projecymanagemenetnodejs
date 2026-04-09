const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const repo = require("../repositories/userRepository")

const JWT_SECRET = "your_jwt_secret"

exports.registerUser = async({username,password})=>{

    if(!username || !password) throw new Error("username and password are required")

    const existingUser = await repo.findUserByUsername(username)
    if(existingUser) throw new Error("username already taken")

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await repo.createUser(username,hashedPassword)
    return user
}

exports.loginUser = async({username,password})=>{
    if(!username || !password) throw new Error("username and password are required")

    const user = await repo.findUserByUsername(username)

    if(!user) throw new Error("no user found")
   if(!user.is_active){
throw new Error("account is deactivated contact admin")
   }

const valid = await bcrypt.compare(password,user.password)
if(!valid) throw new Error ("Invalid password")

    const token = jwt.sign(
        {id:user.id,username:user.username,role:user.role},
        JWT_SECRET,
        {expiresIn:"1h"}
    )
    return{token,user:{id:user.id,username:user.username,role:user.role}}
}

exports.getAllUsers = async()=>{
    return await repo.getAllUsers()
}