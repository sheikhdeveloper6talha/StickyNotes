

let loggedIn = JSON.parse(localStorage.getItem('loggedIn'))
let currentUsers = JSON.parse(localStorage.getItem('currentUsers'))
if (loggedIn) {
    let login = document.getElementById('login')
    let signup = document.getElementById('signup')
    let dashboard = document.getElementById('dashboard')
    login.style.display = 'none'
    signup.style.display = 'none'
    dashboard.style.display = 'block'






    // get and render Profile name and Image
    let proImg = document.getElementById('proImg')
    let proName = document.getElementById('proName')
    const profileRender = () => {
        proImg.style.display = 'block'

        proImg.src = currentUsers.imagesValue
        proName.innerHTML = currentUsers.nameValue
    }
    profileRender()

}

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
    console.log('working');

}


// logout function

const logOut = () => {
    localStorage.removeItem('loggedIn')
    location.replace('./index.html')
localStorage.removeItem('currentUsers')
}


// renderUi home pages

let getNotes = JSON.parse(localStorage.getItem('notesAdd'))
console.log(getNotes);

let notesGrid = document.getElementById('notes-grid')
const renderUI = () => {
    notesGrid.innerHTML = '';
 

    if(getNotes){


    getNotes.forEach((currentVal) => {

        let note = currentVal[0];

        // agar user login nahi hai
        if (!currentUsers) {
            renderCard(note);
        }
        // agar user login hai
        else if (note.emailCurrent !== currentUsers.emailValue) {
            renderCard(note);
        }

    });
    
    }

};

function renderCard(note) {
    let card = `
        <div class="note-card">
            <div class="cardnav">
                <span class="tag tag-blue">${note.nameCurrent}</span>
                <img src="${note.imagesCurrent}">
            </div>
            <h3>${note.titleValue}</h3>
            <p>${note.desValue}</p>
            <span><i class="far fa-calendar"></i> ${note.dateCurrent}</span>

            <div class="card-footer">
                <button onclick="viewDetail('${note.emailCurrent}')">View Details</button>
            </div>
        </div>
    `;

    notesGrid.innerHTML += card;
}


renderUI()



const viewDetail = (bane) => {
localStorage.setItem('allNotes' , JSON.stringify(bane))
    location.href = './pages/notes/notes.html'


}

