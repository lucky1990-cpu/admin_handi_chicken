const route = require('express').Router()
const fs = require('fs');
const { Router } = require('express')
const control =  require('../controller/control')
const upload = require('../Middleware/multer')
const fileUpload  = require('../MongoDB/FoodItemsCreation')

route.get('/',control.home)



route.post('/FoodItemsUplaod', upload.single('uploaded_file'),(req,res)=>{
     
       let Img  =  fs.readFileSync(req.file.path)
       
       const imgArray = Img.toString('base64')

       let finalImage ={
                foodItem:req.body.FoodName,
                Amount:req.body.FoodAmount,
                foodDescription:req.body.foodDescription,
                contentType: req.file.mimetype,
                ImageBase64:imgArray
            }
          
             const fileData = new fileUpload(finalImage)
             fileData.save().then(()=>{
                res.render('index')
             }).catch((e)=>{
              console.log(e)
             })
})

route.get('/FoodItems',async(req,res)=>{
    try{
        const FoodItems = await fileUpload.find({})
        console.log(FoodItems)
        res.json(FoodItems)
    }
   catch(e){

   }

})

route.get('/AllFoodItems',(req,res)=>{

    res.render('AllFoodItems')

})
route.get('/FoodPage',(req,res)=>{
    res.render('index')

})
route.get('/EditFoodItem',(req,res)=>{
    res.render('EditFoodItem')

})

route.get('/EditFoodItemFetchData',async(req,res)=>{
    console.log(req.query._id);
    try{
        const EditItem = await fileUpload.find({_id:req.query._id})
       
        res.json(EditItem)
    }
   catch(e){
       console.log(e)

   }

})

route.post('/DeleteFoodItem',async(req,res)=>{
     const DeletId = {_id:req.body.Id}
    try{
        const UpdateFoodItem = await fileUpload.deleteOne(DeletId)
        
        res.status(200).json({data:'succssfullly Deleted'})
        
        
       }
       catch(e){
         console.log(e)
       }


})

route.post('/UpdateFoodItem',async(req,res)=>{
     const updatedId =  {_id:req.body.ID}
     const updateValue = {$set:{
        foodItem: req.body.FoodNmae,
        Amount:req.body.Amount,
        foodDescription:req.body.foodDescription
     }}
    // console.log('update food items:'+ req.url)
    // console.log(req.body)
      
    try{
      const UpdateFoodItem = await fileUpload.updateOne(updatedId,updateValue)
      console.log(UpdateFoodItem)
      res.status(200).json({data:'succssfullly updated'})
      
     }
     catch(e){
       console.log(e)
     }

})
module.exports=  route



