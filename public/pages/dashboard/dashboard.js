let loggedIn = JSON.parse(localStorage.getItem('loggedIn'))
let currentUsers = JSON.parse(localStorage.getItem('currentUsers'))

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

// show messages alert function

const messagesShow = (messagesShow) => {
    errorMesg.innerHTML = messagesShow
    messages.classList.add('alert')
    setTimeout(() => {
        messages.classList.remove('alert')

    }, 3000)
}

// add notes function
let title = document.getElementById('title')
let des = document.getElementById('des')

let emailCurrent = currentUsers.emailValue
let nameCurrent = currentUsers.nameValue
let imagesCurrent = currentUsers.imagesValue

let getNotes = JSON.parse(localStorage.getItem('notesAdd')) || []

let perantIndex ;
let childIndex ;
let editToggle = true
const addNotes = () => {

    let titleValue = title.value
    let desValue = des.value

    if (titleValue === '' || desValue === '') {
        return messagesShow('Please Enter Notes')
    }

    let usersNotes = {
        titleValue,
        desValue,
        emailCurrent,
        nameCurrent,
        imagesCurrent,
        dateCurrent: new Date().toDateString()
    }
if(editToggle){


 
    if (!getNotes.length) {

        getNotes.push([usersNotes])

    } else {

        let userFound = false

        getNotes.forEach((list) => {

 
            if (list.length > 0 && list[0].emailCurrent === emailCurrent) {
                list.push(usersNotes)
                userFound = true
            }

        })

         if (!userFound) {
            getNotes.push([usersNotes])
        }
    }
}
else{
getNotes[perantIndex][childIndex] = {
     titleValue,
        desValue,
        emailCurrent,
        nameCurrent,
        imagesCurrent,
        dateCurrent: new Date().toDateString()

    }
editToggle = true
}
 
    localStorage.setItem('notesAdd', JSON.stringify(getNotes))

     title.value = ''
    des.value = ''

     renderNotes()
}



// render notes 
let notesGrid = document.getElementById('notes-grid')
const renderNotes = () => {
    notesGrid.innerHTML = ''

    getNotes.forEach((list, parentIndex) => {

        if (list.length > 0 && list[0].emailCurrent === emailCurrent) {

            list.forEach((collection, childIndex) => {

                let renderUI = `
                <div class="note-card">
                    <div class="cardnav">
                        <span class="tag tag-blue">${collection.nameCurrent}</span>
                        <img src="${collection.imagesCurrent}">
                    </div>
                    <h3>${collection.titleValue}</h3>
                    <p>${collection.desValue}</p>
                    <span><i class="far fa-calendar"></i> ${collection.dateCurrent}</span>

                    <div class="card-footer">
                        <button onclick="deleteItems(${parentIndex}, ${childIndex})">Delete</button>
                        <button onclick="editItems(${parentIndex}, ${childIndex})">Edit</button>
                    </div>
                </div>
                `
                notesGrid.innerHTML += renderUI
            })
        }
    })
}


// detele function

const deleteItems = (parentIndex, childIndex) => {

    getNotes[parentIndex].splice(childIndex, 1)

    
    if (getNotes[parentIndex].length === 0) {
        getNotes.splice(parentIndex, 1)
    }


    localStorage.setItem('notesAdd', JSON.stringify(getNotes))

    renderNotes()
}





const editItems = (parentInd , childInd)=>{
    let addNotes = document.querySelector('.add-Notes')
   let tops = addNotes.getBoundingClientRect().top + window.scrollY
 let editVlaue =  getNotes[parentInd][childInd];
title.value = editVlaue.titleValue
des.value = editVlaue.desValue
perantIndex = parentInd;
childIndex = childInd
editToggle = false

scrollTo({
    top : tops,
    behavior : "smooth"
})
}