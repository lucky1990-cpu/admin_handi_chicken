const ProdUrl = 'https://handi-chichen.herokuapp.com';

//const URLGet =  DevUrl+'/EditFoodItemFetchData';
const ProdURLGet = ProdUrl+'/EditBriyaniMahalFoodItemFetchData';
const URLEditFood = ProdUrl + '/UpdateBiryaniMahalFoodItem';
const URLDeleteFood = ProdUrl + '/DeleteBiryaniMahalFoodItem';
const _id = localStorage.getItem("ID");
const myData = {
    _id:_id
}

document.querySelector('#EditBackButton').addEventListener('click',(e)=>{
  e.preventDefault();
  window.location.href='/' 
})
$.ajax({
    type: "GET",
    url: ProdURLGet,
    data: myData,
    cache: false,
    success: function(data){
      document.querySelector('.loader').style.visibility='hidden';
      EditBiryaniMahalFormBinding(data)
    }
  });

  function EditBiryaniMahalFormBinding(data){
    
    document.getElementById('EditBiryaniMahalFoodID').innerHTML= data[0]._id;
    document.getElementById('EditBiryaniMahalFoodName').value= data[0].foodItem;
    document.getElementById('EditBiryaniMahalFoodAmount').value= data[0].Amount;
    const ImgVal = 'data:'+data[0].contentType+';base64,'+data[0].ImageBase64+'';
    document.getElementById('HeaderImg').src=ImgVal;
    
  }

  document.querySelector('#UpdateFood').addEventListener('click',(e)=>{
    e.preventDefault();
    const updatedFood = {
      ID:document.getElementById('EditBiryaniMahalFoodID').innerHTML,
      FoodNmae :document.getElementById('EditBiryaniMahalFoodName').value,
      Amount:  document.getElementById('EditBiryaniMahalFoodAmount').value,
      foodDescription:document.getElementById('FoodBiryaniMahalDescription').value
  
  }
   UpdateFoodItem(updatedFood)
   })
   function UpdateFoodItem(updatedFood){
    const EditData = JSON.stringify(updatedFood)
   $.ajax({
     type: "POST",
     url: URLEditFood,
     dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: EditData,
     success: function(data){
       alert(data.data)
     },
     error:function(e){
       console.log(e)
     }
   });
 
  }

  document.querySelector('#DeleteFood').addEventListener('click',(e)=>{
    e.preventDefault();
    const deleteId = document.getElementById('EditFoodID').innerHTML;
    DeleteRecord({Id:deleteId})
  
   })
   function DeleteRecord(deleteId){
     const delData =  JSON.stringify(deleteId);
    $.ajax({
      type: "POST",
      url: URLDeleteFood,
      dataType: "json",
     contentType: "application/json; charset=utf-8",
     data: delData,
      success: function(data){
        alert(data.data)
        window.location.href='/'
      },
      error:function(e){
        console.log(e)
      }
    });
   }

 
  
  
 