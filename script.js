
const form = document.getElementById('feedbackForm');
const name = document.getElementById('name');
const email = document.getElementById('email');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError')
const result = document.getElementById('result')
const error = document.getElementById('error')


form.addEventListener('submit',async function(event){
 event.preventDefault();

 nameError.style.display = "none";
 emailError.style.display = "none";
 result.textContent = "";    //clear previous message
 error.textContent = "";

 
 let isValid = true;

 if(name.value.trim() === '')
 {
 nameError.style.display = "block";
 isValid = false;
 }

 let emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 if(!emailRegex.test(email.value.trim()))
 {
     emailError.style.display = "block";
     isValid = false;
 }

if(isValid){
    try{
        const response = await fetch(`https://api.agify.io?name=${name.value.trim()}`)
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        result.textContent = `The age predicted for the name ${name.value.trim()} is ${data.age || "unknown"}`
        setTimeout(()=>{
           form.reset();
           result.textContent = "";
        },6000)
    }
    catch(err){
            error.textContent = "An error occured"+err.message;
    }
    
}


})