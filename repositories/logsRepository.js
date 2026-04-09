const Log = require("../models/logModel")


// exports.getLogsByUser = async (userId,page,limit) => {
//   const skip = (page-1)*limit
// const data =  await Log.find({ userId })
// .sort({ createdAt: -1 })
// .skip(skip)
// .limit(limit);

// const total = await Log.countDocuments({userId})
// return{data,total}
// };

exports.getLogsByUser = async (userId,page,limit,search)=>{
  const skip = (page-1)*limit

  let filter = {userId}

  if(search){
    filter.action = {$regex:search,$options:"i"}
  }
  const data = await Log.find(filter)
  .sort({createdAt:-1})
  .skip(skip)
  .limit(limit)
  const total = await Log.countDocuments(filter)
  return{
    data,total
  }
}