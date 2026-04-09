const service = require("../services/adminService")

exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await service.createUserService(username, password);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};



// exports.getAllUsers = async(req,res)=>{
//   try{
//     const users  = await service.getAllUsersService()
//     res.json(users)
//   }
//   catch(error){
// res.status(500).json({message:"error fetching users"})
//   }
// }

// exports.getAllProjects = async(req,res)=>{
//   try{
//   const projects = await service.getAllProjectsService()
//   res.json(projects)
//   }catch(error){
//     console.log(error)
//     res.status(500).json({message:"error fetching projects"})
//   }

// }
// exports.getAllLogs = async (req, res) => {
//   const logs = await service.getAllLogService();
//   res.json(logs);
// };

exports.getAllUsers = async(req,res)=>{
  try{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5
    const search = req.query.search || ""
    const users  = await service.getAllUsersService(page,limit,search)
    res.json(users)
  }
  catch(error){
res.status(500).json({message:"error fetching users"})
  }
}

exports.getAllProjects = async(req,res)=>{
  try{
    const page  = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const search = req.query.search || ""
  const projects = await service.getAllProjectsService(page,limit,search)
  res.json(projects)
  }catch(error){
    console.log(error)
    res.status(500).json({message:"error fetching projects"})
  }

}

exports.getAllLogs = async (req, res) => {
  const page  = parseInt(req.query.page) || 1 
  const limit = parseInt(req.query.limit) || 5
  const search = req.query.search
  const logs = await service.getAllLogService(page,limit,search);
  res.json(logs);
};

exports.toggleUserStatus = async(req,res)=>{
  try{
    const userId = req.params.id
    const {isActive} = req.body
    const  updatedUser = await service.toggleUserStatusService(userId,isActive)
    res.json(updatedUser)
  }catch(err){
     console.log(err.message)
     res.status(500).json({message:"error updating  user status"})
  }
}