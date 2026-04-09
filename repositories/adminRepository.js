const pool = require("../models/pg")
const Log = require("../models/logModel")

exports.createUser = async(username,hashedPassword) =>{
    const result = await pool.query(
        "insert into users (username,password) values($1,$2) returning id,username,role",
        [username,hashedPassword]
    )
    return result.rows[0]
}

// exports.getAllLogs = async () => {
//   return await Log.find().sort({ createdAt: -1 });
// };


// exports.getAllUsers = async()=>{
//     const result = await pool.query("select id,username,role from users")
//     return result.rows
// }

// exports.getAllProjects = async()=>{
//      const result = await pool.query( 
    
//     `select projects.id,projects.name,
//     projects.description,users.username 
//     from projects 
//     join users on projects.user_id = users.id`)

//      return result.rows }



     

// exports.getAllLogs = async (page,limit) => {
// const skip = (page - 1)*limit
//   const data =  await Log.find()
//   .sort({ createdAt: -1 })
//   .skip(skip)
//   .limit(limit);

//   const total = await Log.countDocuments()
//   return{
//     data,total
//   }


// };


// exports.getAllUsers = async(page,limit)=>{
//     const offset  = (page-1)*limit

//     const dataQuery = await pool.query(
//         `select id,username,role from users 
//         order by id desc
//         limit $1 offset $2`,[limit,offset]
//     )
//     const  countQuery  = await pool.query(`
//         select count(*) from users`)
//     return {
//         data : dataQuery.rows,
//         total:parseInt(countQuery.rows[0].count)
//     }
// }

// exports.getAllProjects = async(page,limit)=>{
//     const offset = (page - 1)*limit
//     const dataQuery = await pool.query(
//         `select projects.id,projects.name,projects.description,users.username from projects
//         join users on projects.user_id  = users.id
//         order by projects.id DESC
//         limit $1 offset $2 `,[limit,offset]
    
//        )
//        const countQuery = await pool.query(
//         `select count(*) from projects`
//        )

//        return {
//         data:dataQuery.rows,
//         total:parseInt(countQuery.rows[0].count)
//        }
// }

exports.getAllProjects = async(page,limit,search)=>{
    const offset = (page - 1)*limit

    let query = `select projects.id, projects.name, projects.description, users.username
    from projects
    join users on projects.user_id = users.id
    where 1=1 `;
    let countQuery = `select count(*) from projects 
    join users on projects.user_id = users.id
    where 1=1`;
    let values = []
    if(search){
        values.push(`%${search}%`)
        query += ` AND projects.name ILIKE $${values.length}`
        countQuery += ` AND projects.name ILIKE $${values.length}`
    }
    query += ` order by projects.id desc limit $${values.length+1} offset $${values.length+2}`
    values.push(limit,offset)

    const dataQuery = await pool.query(query,values)
    const countQueryResult = await pool.query(countQuery,values.slice(0,values.length - 2))

    return{
        data:dataQuery.rows,
        total:parseInt(countQueryResult.rows[0].count)
    }

}

exports.getAllUsers = async(page,limit,search)=>{
    const offset = (page-1)*limit

    let query = `select id,username,role,is_active
                    from users
                    where 1=1`
   let countQuery = `select count(*) from users where 1=1`

   let values = []
   if(search){
    values.push(`%${search}%`)
    query += ` AND username ILIKE $${values.length} `
    countQuery += ` AND username ILIKE $${values.length}`
   }

   query += ` order by id desc limit $${values.length+1} offset $${values.length+2}`

   values.push(limit,offset)

   const dataQuery = await pool.query(query,values)

   const countQueryResult = await pool.query(countQuery,values.slice(0,values.length-2))

   return{
    data:dataQuery.rows,
    total:parseInt(countQueryResult.rows[0].count)
   }
}

exports.getAllLogs = async (page,limit,search) => {
const skip = (page - 1)*limit

let filter = {}

if(search){
    filter.action = {$regex:search,$options:"i"}  
}
const data = await Log.find(filter)
              .sort({createdAt:-1})
              .skip(skip)
              .limit(limit)
 const total = await Log.countDocuments(filter)

 return{
    data,total,
 }


};

exports.toggleUserStatus = async(userId,isActive)=>{
    const result = await pool.query(`update users set is_active = $1 where id = $2 RETURNING id,username,is_active`,
        [!isActive,userId]
    )
    return result.rows[0]
}