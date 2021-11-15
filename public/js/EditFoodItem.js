const _id = localStorage.getItem("ID");
console.log(_id)
const DevUrl = 'http://localhost:3000';
const ProdUrl = 'http://handi-chichen.herokuapp.com/';
const URLGet =  DevUrl+'/EditFoodItemFetchData';
const ProdURLGet = ProdUrl+'/EditFoodItemFetchData';
const URLEditFood = DevUrl +'/UpdateFoodItem';
const URLDeleteFood =  DevUrl + '/DeleteFoodItem';
const myData = {
    _id:_id
}
$.ajax({
    type: "GET",
    url: ProdURLGet,
    data: myData,
    cache: false,
    success: function(data){
       EditFormBinding(data)
    }
  });

  function EditFormBinding(data){
    document.getElementById('EditFoodID').innerHTML= data[0]._id;
    document.getElementById('EditFoodName').value= data[0].foodItem;
    document.getElementById('EditFoodAmount').value= data[0].Amount;
    const ImgVal = 'data:'+data[0].contentType+';base64,'+data[0].ImageBase64+'';
    document.getElementById('HeaderImg').src=ImgVal;
    

  }

  $('#EditBackButton').click(()=>{
    window.location.href='/AllFoodItems' 
 })
  
 document.querySelector('#UpdateFood').addEventListener('click',(e)=>{
  e.preventDefault();
  const updatedFood = {
    ID:document.getElementById('EditFoodID').innerHTML,
    FoodNmae :document.getElementById('EditFoodName').value,
    Amount:  document.getElementById('EditFoodAmount').value,
    foodDescription:document.getElementById('foodDescription').value

}
 UpdateFoodItem(updatedFood)
 })

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