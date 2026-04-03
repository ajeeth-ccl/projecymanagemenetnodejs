const projectRepo = require("../repositories/projectRepository")

exports.getProjectsByUser = async(userId)=>{
    return await projectRepo.getProjectsByUser(userId)
}

exports.createProject = async(userId,projectData)=>{
   const  newProject = await projectRepo.createProject(userId,projectData)


await projectRepo.createLog({
    action:"CREATE_PROJECT",
    data:{
        id:newProject.id,
        name:newProject.name,
        description:newProject.description,
    },
    userId,

})
return newProject
}

exports.deleteProject = async(userId,projectId)=>{
    const deleted = await projectRepo.deleteProject(userId,projectId)

    if(!deleted){
        throw new Error("FORBIDDEN")
    }


    await projectRepo.createLog({
        action:"DELETE_PROJECT",
        data:{id:deleted.id},
        userId,
    })
    return{message:"project deleetd successfully"}
}