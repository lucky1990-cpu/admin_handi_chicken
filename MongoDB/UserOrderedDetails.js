const mongoose =  require('mongoose')
 const FoodItemsModel = mongoose.model('UserOrderInfos',{
   Qty:{
       type:String
   },
   TotalAmount:{
       type:Number
   },
   FoodName:{
       type:String
   },
   PhoneNo:{
       type:Number
   },
    Name:{
      type:String
      
     },
     Address:{
         type:String
     },
     FoodId:{
         type:String
     },
     Status:{
         type:String
     }
 })

 module.exports= FoodItemsModel
