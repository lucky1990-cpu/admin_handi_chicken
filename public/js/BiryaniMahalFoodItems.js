const BiryaniFoodItemsURL= 'handi-chichen.herokuapp.com/BiryaniMahalFoodItems';
const onAddNewFoodItems = ()=>{
    window.location.href='/BiryaniMahalAddNewItems'

}
$.get(BiryaniFoodItemsURL,(result)=>{
    BiryaniFoodBinding(result)
    document.querySelector('.loader').style.visibility='hidden';
})







 const unOrderList = document.querySelector('BiryaniMahalFoodContainer');
const BiryaniFoodBinding = (data)=>{
    
      const listItem = document.createElement('li');
      listItem.className='list-group-item d-flex justify-content-between align-items-start'
      const div1 = document.createElement('div');
      dev1.className='ms-2 me-auto';
      const div2 = document.createElement('div')
      div2.className='fw-bold';
      div2.innerHTML='Chicken Biryani';
      div1.appendChild(div2);
      const per = document.createElement('p');
      const bold = document.createElement('b');
      bold.innerHTML='RS:140'
      per.appendChild(bold)
      div1.appendChild(per)
      const foodButton = document.createElement('button')
      foodButton.className='btn btn-primary';
      foodButton.innerHTML='Order Now'
      div1.appendChild(foodButton)
      listItem.appendChild(div1);
      const foodImg = document.createElement('img')
      foodImg.className='img-fluid rounded'
      foodImg.src='Img/Restaurant.jpg'
      foodImg.style.width='8rem';
      listItem.appendChild(foodImg)
      unOrderList.appendChild(listItem)



}