const AdminURL = 'https://handi-chichen.herokuapp.com/AdminValidation'
const onBiryaniMahalLogin = ()=>{
    let user = 'BiryaniMahal';
    let Password = document.querySelector('#BiryaniAdmin').value;
    if(Password==''){
        return;
        
    }

    validateLogin(user,Password);
}

const onHandiAdminLogin = ()=>{
    let user = 'HandiMutton';
    let Password = document.querySelector('#HandiAdmin').value;
    if(Password==''){
        return;
        
    }

    validateLogin(user,Password);
}

const validateLogin = (user,Password)=>{
    const myData = {
        user,
        Password
    }
    $.ajax({
        type: "GET",
        url: AdminURL,
        data: myData,
        cache: false,
        success: function(data){
        //   document.querySelector('.loader').style.visibility='hidden';
        //    EditFormBinding(data)
        console.log(data)
        if(data.length<1){
         alert('Wrong Password!!!')
         return;
        }
        if(data[0].user=='HandiMutton'){
            window.location.href='/UserOrderDetails' 
        }
        if(data[0].user=='BiryaniMahal'){
            window.location.href='/BiryaniMahalUsersFood' 
        }

        }
      });

}