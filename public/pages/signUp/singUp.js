let loggedIn = JSON.parse(localStorage.getItem('loggedIn'))
let getUsers = JSON.parse(localStorage.getItem('uesrsData')) || []
if (loggedIn) {
    location.replace('../dashboard/dashboard.html')
}

let name = document.getElementById('name')
let email = document.getElementById('email')
let password = document.getElementById('password')
let images = document.getElementById('images')
let messages = document.getElementById('messages') // messages div get
let errorMesg = document.getElementById('errorMesg') // messages send error


// password show and hide 

const showPass = (elm , val)=>{
val === 'on' ? elm.type = 'text' : elm.type = 'password'

}

// show messages alert function

const messagesShow  = (messagesShow)=>{
errorMesg.innerHTML = messagesShow
    messages.classList.add('alert')
    setTimeout(()=>{
    messages.classList.remove('alert')

    },3000)
}

const createAccount = ()=>{
    let nameValue , emailValue , passwordValue , imagesValue
    nameValue = name.value;
    emailValue = email.value;
    passwordValue = password.value;
    imagesValue = images.value;

let emailCheck = getUsers.find((email)=>{
    if(email.emailValue === emailValue)
    {
        return true
    }
})
if(emailCheck){
    return messagesShow('Email Alredy Exits')
}
    // check inputs 

if(nameValue === '' ||
emailValue === '' ||
passwordValue === '' ||
imagesValue === ''
 )
 {
    messagesShow('Please Enter Value')
    return 
 }
if(nameValue[0].toUpperCase() + nameValue.slice(1) !== nameValue )
{
    messagesShow('Name First Letter Must be Captil')
    return
}
if(nameValue.length < 3)
    {
        return messagesShow('Name Must be 3 letter')
    }  
if(!emailValue.includes('@'))
{

    return messagesShow('Missing @')
}
if(!emailValue.includes('.'))
{
    return messagesShow('Missing dot')
}
if(!emailValue.includes('com'))
{
    return messagesShow('Missing com')
}

if(passwordValue.length < 8){
    return messagesShow('Password Must be 8 Character ')
}

if(!imagesValue.includes('https'))
{
    return messagesShow('Only Live image link')
}
let userInfo = {
    nameValue,
    emailValue,
    passwordValue,
    imagesValue,
}
getUsers.push(userInfo)
localStorage.setItem('uesrsData' , JSON.stringify(getUsers))
    
name.value = ''
email.value  = ''
password.value = ''
images.value = ''
messagesShow('Create Account Success!')
setTimeout(()=>{
    location.replace('../login/login.html')
},4000)

}