const ProdUrl = 'https://handi-chichen.herokuapp.com';

//const URLGet =  DevUrl+'/EditFoodItemFetchData';
const ProdURLGet = ProdUrl+'/EditBriyaniMahalFoodItemFetchData';
const UpdateFood = ProdUrl + '/UpdateBiryaniMahalFoodItem';
const URLDeleteFood = ProdUrl + '/DeleteBiryaniMahalFoodItem';
const _id = localStorage.getItem("ID");
const myData = {
    _id:_id
}
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

 
  
  
 