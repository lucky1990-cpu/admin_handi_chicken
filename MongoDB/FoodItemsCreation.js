const mongoose =  require('mongoose')
 const FoodItemsModel = mongoose.model('FoodItems',{
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

 module.exports= FoodItemsModel
