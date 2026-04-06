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

exports.getAllLogs = async (req, res) => {
  const logs = await service.getAllLogService();
  res.json(logs);
};

exports.getAllUsers = async(req,res)=>{
  try{
    const users  = await service.getAllUsersService()
    res.json(users)
  }
  catch(error){
res.status(500).json({message:"error fetching users"})
  }
}

exports.getAllProjects = async(req,res)=>{
  try{
  const projects = await service.getAllProjectsService()
  res.json(projects)
  }catch(error){
    console.log(error)
    res.status(500).json({message:"error fetching projects"})
  }

}