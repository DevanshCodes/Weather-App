console.log("client side javascript is running!");



const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
const messageOne = document.querySelector('#messageone');
const messageTwo = document.querySelector('#messagetwo');



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const location = address.value;
    const addressURL = 'http://localhost:3000/weather?address='+location;
    messageOne.textContent='loading';
    messageTwo.textContent='';
    fetch(addressURL).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error;
        }
        else{
        console.log(data);
        messageOne.textContent=data.temperature+' degree Celsius';
        messageTwo.textContent=data.location;

        }
    })
})
    console.log(location);
})