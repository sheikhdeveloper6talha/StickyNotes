let loggedIn = JSON.parse(localStorage.getItem('loggedIn'))
let getUsers = JSON.parse(localStorage.getItem('uesrsData')) // get users from localStorage
let password = document.getElementById('password')
let email = document.getElementById('email')
if (loggedIn) {
    location.replace('../dashboard/dashboard.html')
}

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
const loginUser = () => {
        // check inputs 

if(
email.value === '' ||
password.value === '' )
 {
    messagesShow('Please Enter Value')
    return 
 }
    if(getUsers){

    
    let loginCheck = getUsers.find((user) => {
        if (email.value === user.emailValue &&
            password.value === user.passwordValue) {
            return true
        }
    })
    if(loginCheck)
        {
            messagesShow('Success fully Login Users')
            setTimeout(()=>{
                location.replace('../dashboard/dashboard.html')
            },4000)
            localStorage.setItem('currentUsers' , JSON.stringify(loginCheck))
            localStorage.setItem('loggedIn' , JSON.stringify(true))
            return
        }
        else
            {
                messagesShow('Users Not Found')
                return
            }
        }else{
            messagesShow('Users Not Found')
        }

}