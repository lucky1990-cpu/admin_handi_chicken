const MaintainFood = ()=>{
    window.location.href='/BiryaniMahalFoodItems'
}


const ProdURL = 'https://user-handi-app.herokuapp.com';
const DevUrl = 'https://localhost:3000';
const URLGet =  DevUrl+'/SearchedByPhoneNo';
const URLAllFoodDev = ProdURL + '/BiryaniMahalUserOrderedFood';
const URLStatusDev = ProdURL + '/BiryaniMahalOrderStatus';
const ProdURLGet = ProdURL + '/BiryaniMahalSearchedByPhoneNo';
const StatusGet = ProdURL +'/BiryaniMahalSeachedByStatus';
const DateGet = ProdURL +'/BiryaniMahalSearchByCurrentDate'
const orderDetailsDiv =  document.querySelector('#orderDetailsDiv')
document.querySelector('.loader').style.visibility='hidden';

document.querySelector('#EditBackButton').addEventListener('click',(e)=>{
  e.preventDefault();
  window.location.href='/' 
})

const onTodayOrder= ()=>{
  const todayDate = new Date()
   SerchByDate(todayDate) 
}
const onPendingOrder = ()=>{
  let data = "P"
  SearchedByStatusCode(data)
}
const onRecivedOrder=()=>{
  let data = "R"
  SearchedByStatusCode(data)
}
const onCompletedOrder=()=>{
  let data = "C"
  SearchedByStatusCode(data)

}

 

document.querySelector('#searchByPhone').addEventListener('click',(e)=>{
  e.preventDefault();
  const mobNo = document.querySelector('#PhoneNumber').value;
  if(mobNo==''){
    document.querySelector('#PhoneNumber').style.border='1px solid red'
    return
  }
  document.querySelector('#PhoneNumber').style.border='1px solid black'
  SearchedPhoneCall(mobNo)
})
document.querySelector('#RefreshOrder').addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelector('#PhoneNumber').value='';
    getCalltoRetriveFood()
  })

 

  const getAllOrder = (result)=>{
    FoodListBinding(result)
  }

  $(document).ready(function(){
      
    getCalltoRetriveFood();
  })
  const getCalltoRetriveFood = ()=>{
    document.querySelector('.loader').style.visibility='visible';
    $.getJSON(URLAllFoodDev,(result)=>{
      document.querySelector('.loader').style.visibility='hidden';
        getAllOrder(result)
    })
  }


  const SerchByDate =(data)=>{
    document.querySelector('.loader').style.visibility='visible';
    const DateTime = {DateTime:data}
     $.ajax({
         type: "GET",
         url: DateGet,
         data: DateTime,
         dataType: "text",
         cache: false,
        async: true,
        crossDomain: true,
         success: function(data){
           document.querySelector('.loader').style.visibility='hidden';
           getAllOrder(JSON.parse(data));
            console.log(data)
         }
       });

  }

  const SearchedByStatusCode = (Data)=>{
    document.querySelector('.loader').style.visibility='visible';
     const Statuscode = {Status:Data}
      $.ajax({
          type: "GET",
          url: StatusGet,
          data: Statuscode,
          dataType: "text",
          cache: false,
         async: true,
         crossDomain: true,
          success: function(data){
            document.querySelector('.loader').style.visibility='hidden';
            getAllOrder(JSON.parse(data));
             console.log(data)
          }
        });
  
  }
const SearchedPhoneCall = (mobNo)=>{
  document.querySelector('.loader').style.visibility='visible';
   const phoneData = {mob:parseInt(mobNo)}
    $.ajax({
        type: "GET",
        url: ProdURLGet,
        data: phoneData,
        dataType: "text",
        cache: false,
       async: true,
       crossDomain: true,
        success: function(data){
          document.querySelector('.loader').style.visibility='hidden';
          getAllOrder(JSON.parse(data));
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

    const userDateTime = document.createElement('p')
    const DateTime = new Date(element.DateTime)
    userDateTime.innerHTML=DateTime.toLocaleString();
    userDetailDiv.appendChild(userDateTime)


    const userAddress= document.createElement('h6');
    userAddress.innerHTML=element.Address
    userDetailDiv.appendChild(userAddress)
    listDiv.appendChild(userDetailDiv)
    // const trackingId = document.createElement('span')
    // trackingId.innerText=element._id
    // listDiv.appendChild(trackingId)
  
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
    amountSapn.innerHTML='Rs:'+element.TotalAmount
    QtyAmountDiv.appendChild(amountSapn)
    list.appendChild(QtyAmountDiv)
  
  
    const StatusPendingDiv = document.createElement('div');
    StatusPendingDiv.className='Status'
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
  document.querySelector('.loader').style.visibility='visible';
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
        document.querySelector('.loader').style.visibility='hidden';
      console.log(data)
      getCalltoRetriveFood()
      },
      error:function(e){
        console.log(e)
      }
    });

}