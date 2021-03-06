const route = require('express').Router()
const fs = require('fs');
const { Router } = require('express')
const control =  require('../controller/control')
const upload = require('../Middleware/multer')
const fileUpload  = require('../MongoDB/FoodItemsCreation')
const userFood = require('../MongoDB/UserOrderedDetails')
const AdminLogin = require('../MongoDB/AdminPassword')
const BiryaniMahalFoodDetails = require('../MongoDB/BiryaniMahalFoodItems')

route.get('/',control.home)


// const Login = new AdminLogin( 
//     {
//         user:'HandiMutton',
//         Password:'HandiMutton@2021'
        

// })

// Login.save().then(()=>{
//     console.log(Login)
// }).catch((error)=>{
//   console.log("Error", error);
// })

route.get('/BiryaniMahalFoodItems',(req,res)=>{

   
    res.render('BiryaniMahalFoodItems')
})

route.get('/BiryaniMahalgetFood',async(req,res)=>{

    try{
        const BiryaniMahalFood = await BiryaniMahalFoodDetails.find({})
      res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
            res.json(BiryaniMahalFood)
       
            }
           catch(e){
        
           }
    
    
})
route.post('/BiryaniMahalFoodEdit',async(req,res)=>{
    const updatedId =  {_id:req.body.ID}
    const updateValue = {$set:{
       foodItem: req.body.FoodNmae,
       Amount:req.body.Amount,
       foodDescription:req.body.foodDescription
    }}
   // console.log('update food items:'+ req.url)
   // console.log(req.body)
     
   try{
     const UpdateFoodItem = await BiryaniMahalFoodDetails.updateOne(updatedId,updateValue)
     console.log(UpdateFoodItem)
     res.status(200).json({data:'succssfullly updated'})
     
    }
    catch(e){
      console.log(e)
    }

})
route.get('/BiryaniMahalUsersFood',(req,res)=>{
    res.render('BiryaniMahalUsersFood')

})
route.get('/BiryaniMahalAddNewItems',(req,res)=>{
    res.render('BiryaniMahalAddNewItems')
})

route.get('/BiryaniMahalEditItems',(req,res)=>{
    res.render('BiryaniMahalEditItems')
})


route.get('/AdminValidation',async(req,res)=>{
    try{
     const AdminLoginDetails=   await AdminLogin.find( { $and: [ { user: { $eq: req.query.user } }, { Password: { $eq: req.query.Password } } ] } )
     console.log(AdminLoginDetails)
     res.json(AdminLoginDetails)
     
    }catch(e){
        console.log(e)

    }

})

route.post('/BiryaniMahalPostFoodItems', upload.single('BiryaniMahal_Img'),(req,res)=>{
     
    let BiryaniImg  =  fs.readFileSync(req.file.path)
    
    let BiryaniimgArray = BiryaniImg.toString('base64')

    let BiryanifinalImage ={
             foodItem:req.body.FoodName,
             Amount:req.body.FoodAmount,
             foodDescription:req.body.foodDescription,
             contentType: req.file.mimetype,
             ImageBase64:BiryaniimgArray
         }
       
          let BiryanifileData = new BiryaniMahalFoodDetails(BiryanifinalImage)
          BiryanifileData.save().then(()=>{
             res.render('BiryaniMahalAddNewItems')
          }).catch((e)=>{
           console.log(e)
          })
})


route.post('/FoodItemsUplaod', upload.single('uploaded_file'),(req,res)=>{
     
       let Img  =  fs.readFileSync(req.file.path)
       
       let imgArray = Img.toString('base64')

       let finalImage ={
                foodItem:req.body.FoodName,
                Amount:req.body.FoodAmount,
                foodDescription:req.body.foodDescription,
                contentType: req.file.mimetype,
                ImageBase64:imgArray
            }
          
             let fileData = new fileUpload(finalImage)
             fileData.save().then(()=>{
                res.render('index')
             }).catch((e)=>{
              console.log(e)
             })
})

route.get('/FoodItems',async(req,res)=>{
    try{
        const FoodItems = await fileUpload.find({})
      
        res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
        res.json(FoodItems)
    }
   catch(e){

   }

})



route.get('/AdminHomePage',(req,res)=>{
    res.render('AdminHomePage')

})

route.get('/UserOrderedFood',async(req,res)=>{
    try{
        const userFoodDetails = await userFood.find({})
        res.json(userFoodDetails)
        console.log(userFoodDetails)

    }catch(e){
        res.json(e)
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

route.get('/UserOrderDetails',(req,res)=>{
    res.render('UsersOrderDetails')

})

route.get('/EditFoodItemFetchData',async(req,res)=>{
    console.log(req.query._id);
    try{
        const EditItem = await fileUpload.find({_id:req.query._id})
        res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
       
        res.json(EditItem)
    }
   catch(e){
       console.log(e)

   }

})

route.get('/EditBriyaniMahalFoodItemFetchData',async(req,res)=>{
    console.log(req.query._id);
    try{
        const EditBiryaniMahalItem = await BiryaniMahalFoodDetails.find({_id:req.query._id})
        res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
       
        res.json(EditBiryaniMahalItem)
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
route.post('/DeleteBiryaniMahalFoodItem',async(req,res)=>{
    const DeletBiryaniId = {_id:req.body.Id}
   try{
       const DeleteBiryaniMahalFoodItem = await BiryaniMahalFoodDetails.deleteOne(DeletBiryaniId)
       
       res.status(200).json({data:'succssfullly Deleted'})
       
       
      }
      catch(e){
        console.log(e)
      }


})

route.post('/OrderStatus',async(req,res)=>{
    console.log(req.body)
    const updatedStatusId =  {_id:req.body.StatusFoodId}
    const updateStatusValue = {$set:{
        Status: req.body.FoodStatus
     
    }}
    try{
       const UpdateStatus=  await userFood.findByIdAndUpdate(updatedStatusId, updateStatusValue)
        res.status(200).json({data:'succssfullly updated'})
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

route.post('/UpdateBiryaniMahalFoodItem',async(req,res)=>{
    const updatedBiryaniMahalId =  {_id:req.body.ID}
    const updateBiryaniMahalValue = {$set:{
       foodItem: req.body.FoodNmae,
       Amount:req.body.Amount,
       foodDescription:req.body.foodDescription
    }}
   // console.log('update food items:'+ req.url)
   // console.log(req.body)
     
   try{
     const UpdateBiryaniMahalFoodItem = await BiryaniMahalFoodDetails.updateOne(updatedBiryaniMahalId,updateBiryaniMahalValue)
     console.log(UpdateBiryaniMahalFoodItem)
     res.status(200).json({data:'succssfullly updated'})
     
    }
    catch(e){
      console.log(e)
    }

})
module.exports=  route



