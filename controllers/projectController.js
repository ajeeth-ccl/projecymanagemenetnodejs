const projectService = require("../services/projectService")

exports.getProjectsByUser = async(req,res)=>{
    try{
        const projects = await projectService.getProjectsByUser(req.user.id)
        res.json(projects)
    }catch(err){
           console.log("got project error",err)
           res.status(500).json({message:"server error"})
    }
}

exports.createProject = async(req,res)=>{
    try{
        const newProject = await projectService.createProject(req.user.id,req.body)
        res.json(newProject)
    }catch(err){
        console.log("createprojecterr",err)
        res.status(500).json({message:"server error"})

    }
}

exports.deleteProject = async(req,res)=>{
    try{
        const result = await projectService.deleteProject(req.user.id,req.params.id)
        res.json(result)
    }catch(err){
        if(err.message === "FORBIDDEN"){
            return res.status(403).json({message:"you can not delete this project"})
        }
           console.log("deleteerror",err)
           res.status(500).json({message:"server error"})
    }
}