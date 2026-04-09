const pool = require("../models/pg")
const Log = require("../models/logModel")


// exports.getProjectsByUser = async(userId,page,limit)=>{
//     const offset = (page-1)*limit

//     const dataQuery = await pool.query(
//         `select * from projects where user_id = $1
//         order by id desc
//         limit $2 offset $3`
//         ,[userId,limit,offset]
//      )
//        const countQuery = await pool.query(`select count(*) from projects where user_id = $1`,[userId])
//     return{
//         data:dataQuery.rows,
//         total:parseInt(countQuery.rows[0].count)
//     }
// }
exports.getProjectsByUser = async (userId,page,limit,search)=>{
    const offset = (page-1)*limit
    let values = [userId]
     let query = `select * from projects where user_id = $1 `

     let countQuery = `select count(*) from projects where user_id = $1`

     if(search){
        values.push(`%${search}%`)
        query += ` AND projects.name ILIKE $${values.length}`
        countQuery += ` AND projects.name ILIKE $${values.length}`
     }
     values.push(limit,offset)

     query += ` order by id desc limit $${values.length-1} offset $${values.length}`

     const dataQuery = await pool.query(query,values)
     const countQueryResult = await pool.query(countQuery,values.slice(0,search?values.length-2:1))

     return{
        data:dataQuery.rows,
        total:parseInt(countQueryResult.rows[0].count)
     }
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