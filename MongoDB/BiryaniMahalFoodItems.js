const mongoose =  require('mongoose')
 const BiryaniMahalFoodDetails = mongoose.model('BiryaniMahalFoodDetails',{
   foodItem:{
       type:String
   },
   Amount:{
       type:Number
   },
   foodDescription:{
       type:String
   },
     contentType:{
      type:String
      
     },
     ImageBase64:{
         type:String
     }
 })

 module.exports= BiryaniMahalFoodDetails
