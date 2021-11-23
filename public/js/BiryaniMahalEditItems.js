const ProdUrl = 'https://handi-chichen.herokuapp.com';
//const URLGet =  DevUrl+'/EditFoodItemFetchData';
const ProdURLGet = ProdUrl+'/EditBriyaniMahalFoodItemFetchData';
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
       EditFormBinding(data)
    }
  });