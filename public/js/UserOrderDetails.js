const ProdURL = 'http://user-handi-app.herokuapp.com';
const DevUrl = 'http://localhost:3000';
const URLGet =  DevUrl+'/SearchedByPhoneNo';
const URLAllFoodDev = ProdURL + '/UserOrderedFood';
const URLStatusDev = ProdURL + '/OrderStatus';
const ProdURLGet = ProdURL + '/SearchedByPhoneNo';
const orderDetailsDiv =  document.querySelector('#orderDetailsDiv')
document.querySelector('.loader').style.visibility='hidden';

document.querySelector('#EditBackButton').addEventListener('click',(e)=>{
  e.preventDefault();
  window.location.href='/' 
})

document.querySelector('#searchByPhone').addEventListener('click',(e)=>{
  e.preventDefault();
  const mobNo = document.querySelector('#PhoneNumber').value;
  SearchedPhoneCall(mobNo)
})
document.querySelector('#RefreshOrder').addEventListener('click',(e)=>{
    e.preventDefault();
    getAllOrder()
  })

  const MaintainFood = ()=>{
    window.location.href='/AllFoodItems'   
  }

  const getAllOrder = (result)=>{
    FoodListBinding(result)
  }

  $(document).ready(function(){
      
    getCalltoRetriveFood();
  })
  const getCalltoRetriveFood = ()=>{
    $.getJSON(URLAllFoodDev,(result)=>{
        getAllOrder(result)
    })
  }
const SearchedPhoneCall = (mobNo)=>{
  document.querySelector('.loader').style.visibility='visible';
   const phoneData = {mob:parseInt(mobNo)}
    $.ajax({
        type: "GET",
        url: URLGet,
        data: phoneData,
        cache: false,
        success: function(data){
          document.querySelector('.loader').style.visibility='hidden';
          FoodListBinding(data);
           console.log(data)
        }
      });

}

const FoodListBinding = (data)=>{
  orderDetailsDiv.innerText='';
  
  data.forEach(element => {
    const unOrderList = document.createElement('ul')
    unOrderList.style='list-style-type:none';
    orderDetailsDiv.appendChild(unOrderList)
    const list = document.createElement('li');
    list.className='list-group-item d-flex justify-content-between align-items-start OrderedItemShadow';
    const listDiv = document.createElement('div');
    listDiv.className='ms-2 me-auto';
    list.appendChild(listDiv);
    unOrderList.appendChild(list)
    
    const subHeadingDiv = document.createElement('div');
    subHeadingDiv.className='fw-bold';
    subHeadingDiv.innerHTML=element.FoodName;
    listDiv.appendChild(subHeadingDiv);
    const userDetailDiv = document.createElement('div')
    const userName = document.createElement('h5')
    userName.innerHTML=element.Name;
    userDetailDiv.appendChild(userName);
    const userPhone = document.createElement('h6')
    userPhone.innerHTML=element.PhoneNo;
    userDetailDiv.appendChild(userPhone)
    const userAddress= document.createElement('h6');
    userAddress.innerHTML=element.Address
    userDetailDiv.appendChild(userAddress)
    listDiv.appendChild(userDetailDiv)
    const trackingId = document.createElement('span')
    trackingId.innerText=element._id
    listDiv.appendChild(trackingId)
  
    const QtyAmountDiv = document.createElement('div');
    QtyAmountDiv.className='QtyAmount';
    const qty = document.createElement('div');
    qty.className='fw-bold'
    qty.innerHTML='Qty'
    const QtyData =  document.createElement('span')
    QtyData.innerHTML= ':' + element.Qty;
    qty.appendChild(QtyData)
    QtyAmountDiv.appendChild(qty)
    const amountSapn = document.createElement('span')
    amountSapn.innerHTML=element.TotalAmount
    QtyAmountDiv.appendChild(amountSapn)
    list.appendChild(QtyAmountDiv)
  
  
    const StatusPendingDiv = document.createElement('div');
    const status =  document.createElement('div');
    status.className='fw-bold'
    status.innerHTML='Status'
    StatusPendingDiv.appendChild(status)
    const pending = document.createElement('div');
   if(element.Status=='P'){
    var PendingButton = document.createElement('button');
    PendingButton.type = 'button';
    PendingButton.innerHTML = 'P';
    PendingButton.className = 'btn btn-danger';
 
    PendingButton.onclick = function() {
        element.Status = 'R';
     updateStatus(element)
    };
    pending.appendChild(PendingButton)
   }
   if(element.Status=='R'){
    var RecivedButton = document.createElement('button');
    RecivedButton.type = 'button';
    RecivedButton.innerHTML = 'R';
    RecivedButton.className = 'btn btn-success';
 
    RecivedButton.onclick = function() {
        element.Status = 'C';
        updateStatus(element)
    };
    pending.appendChild(RecivedButton)
   }

   if(element.Status=='C'){
    var CompletedButton = document.createElement('button');
    CompletedButton.type = 'button';
    CompletedButton.innerHTML = 'C';
    CompletedButton.className = 'btn btn-primary';
 
    CompletedButton.onclick = function() {
        // …
    };
    pending.appendChild(CompletedButton)
   }
 
    StatusPendingDiv.appendChild(pending)
    list.appendChild(StatusPendingDiv)
  });

}

const updateStatus = (element)=>{
    const updatedStatus = {StatusFoodId:element._id,FoodStatus:element.Status}
    const StringifyStatus = JSON.stringify(updatedStatus)
    $.ajax({
      type: "POST",
      url: URLStatusDev,
      data: StringifyStatus,
      contentType: "application/json",
      dataType: "text",
       cache: false,
      async: true,
      crossDomain: true,
      // headers: {  'Access-Control-Allow-Origin': '*',
      // 'accept': 'application/json'
      // },
      success: function(data){
      console.log(data)
      getCalltoRetriveFood()
      },
      error:function(e){
        console.log(e)
      }
    });

}