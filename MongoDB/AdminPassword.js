const mongoose =  require('mongoose')
 const AdminModel = mongoose.model('AdminPassword',{
   user:{
       type:String
   },
   Password:{
       type:String
   }
   
 })

 module.exports= AdminModel
