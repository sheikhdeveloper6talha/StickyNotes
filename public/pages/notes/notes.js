let loggedIn = JSON.parse(localStorage.getItem('loggedIn'))
let allNotes = JSON.parse(localStorage.getItem('allNotes'))
let currentUsers = JSON.parse(localStorage.getItem('currentUsers'))
let getNotes = JSON.parse(localStorage.getItem('notesAdd'))

if (!loggedIn) {
    location.replace('../login/login.html')
}

// menuToggle

const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    // Toggles the 'active' class to show/hide mobile menu
    navLinks.classList.toggle('active');

    // Optional: Animate the burger icon
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});


// profile function
let items = document.getElementById('items')
const profile = () => {
    items.classList.toggle('itemsShow')

}


// logout function

const logOut = () => {
    localStorage.removeItem('loggedIn')
    location.replace('../login/login.html')
localStorage.removeItem('currentUsers')
}


// get and render Profile name and Image
let proImg = document.getElementById('proImg')
let proName = document.getElementById('proName')
const profileRender = () => {


    proImg.src = currentUsers.imagesValue
    proName.innerHTML = currentUsers.nameValue
}


let notesGrid = document.getElementById('notes-grid')

const renderUI = ()=>{
    notesGrid.innerHTML = ''
    getNotes.find((value)=>{

        
        if(value.length > 0 && value[0].emailCurrent === allNotes){
value.forEach((elm)=>{
    console.log(elm);
     let renderUI = `
                <div class="note-card">
                    <div class="cardnav">
                        <span class="tag tag-blue">${elm.nameCurrent}</span>
                        <img src="${elm.imagesCurrent}">
                    </div>
                    <h3>${elm.titleValue}</h3>
                    <p>${elm.desValue}</p>
                    <span><i class="far fa-calendar"></i> ${elm.dateCurrent}</span>

                </div>
                `
notesGrid.innerHTML+= renderUI    
})
            
            
        }
    })
}
renderUI()