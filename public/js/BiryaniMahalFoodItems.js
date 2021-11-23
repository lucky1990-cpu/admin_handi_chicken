const BiryaniFoodItemsURL= '/BiryaniMahalgetFood';
const onAddNewFoodItems = ()=>{
    window.location.href='/BiryaniMahalAddNewItems'

}
$.get(BiryaniFoodItemsURL,(result)=>{
    BiryaniFoodBinding(result)
    console.log(result)
    document.querySelector('.loader').style.visibility='hidden';
})







 const unOrderList = document.querySelector('#BiryaniMahalFoodContainer');
const BiryaniFoodBinding = (data)=>{
    data.forEach(element => {
        const listItem = document.createElement('li');
        listItem.className='list-group-item d-flex justify-content-between align-items-start'
        const div1 = document.createElement('div');
        div1.className='ms-2 me-auto';
        const div2 = document.createElement('div')
        div2.className='fw-bold';
        div2.innerHTML=element.foodItem;
        div1.appendChild(div2);
        const per = document.createElement('p');
        const bold = document.createElement('b');
        bold.innerHTML='RS:' +element.Amount
        per.appendChild(bold)
        div1.appendChild(per)
        const foodButton = document.createElement('button')
        foodButton.className='btn btn-primary';
        foodButton.innerHTML='Order Now'
        div1.appendChild(foodButton)
        const span = document.createElement('span');
        span.className='idVisiblity'
        span.innerHTML=element._id;
        div1.appendChild(span);
        listItem.appendChild(div1);
        const foodImg = document.createElement('img')
        foodImg.className='img-fluid rounded'
        foodImg.src='data:'+element.contentType+';base64,'+element.ImageBase64+''
        foodImg.style.width='8rem';
        listItem.appendChild(foodImg)
        unOrderList.appendChild(listItem)
    });
    
     
     



}