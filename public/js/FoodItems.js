

$(document).ready(function(){
    const ProdUrl = 'http://handi-chichen.herokuapp.com/FoodItems';
    const DevUrl = 'http://localhost:3000/FoodItems';
    $.get(DevUrl,(result)=>{
        document.querySelector('.loader').style.visibility='hidden';
        var maindiv = document.getElementById('CardContainer');
        if(result.length>0){
            result.forEach(element => {
                let spaceDiv = document.createElement('div');
                spaceDiv.style.height='3%'
                
                maindiv.appendChild(spaceDiv);
                let div1 = document.createElement('div');
                div1.className='card';
                
                div1.style.width='15rem';
                div1.style.fontFamily='emoji';
                div1.id="cardDetails"
                var img = document.createElement('img');
                img.className='card-img-top';
                var s = 'data:'+element.contentType+';base64,'+element.ImageBase64+''
                img.src=s;
                div1.appendChild(img);
                let div2 = document.createElement('div');
                div2.className='card-body';
                // div2.style.textAlign ='center';
                let h3 = document.createElement('h4');
                h3.innerHTML=element.foodItem;
                let h4 = document.createElement('h5')
                // h4.style.textAlign='end';
                // h4.style.marginTop='-16%';
                h4.innerHTML='Rs:'+element.Amount;
                let a = document.createElement('a');
              
                a.className='btn btn-primary EditFood'
                a.innerHTML="Edit Food Item";
                
                let p = document.createElement('p');
                p.className="editFoodID";
                
                p.innerHTML=element._id;
                
                div2.appendChild(h3);
                div2.appendChild(h4);
                div2.appendChild(a);
                div2.appendChild(p);

                div1.appendChild(div2);
                maindiv.appendChild(div1);
                
            });

        }
        $('.EditFood').click( ((e)=>{
            const foodSibling = e.target.nextElementSibling;
            const foodId = foodSibling.getInnerHTML();
            localStorage.setItem("ID", foodId);
            window.location.href='/EditFoodItem';
        
        
        
            }))
       
    

    });
 
   
  
  });

 const  onAddNewFoodItems =(()=>{
    window.location.href='/FoodPage'
 })

 

 

 
 