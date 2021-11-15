console.log('Welocome to home Page')

document.querySelector('#homepage').addEventListener('click',(e)=>{
 e.preventDefault()
 window.location.href='/AllFoodItems'
})