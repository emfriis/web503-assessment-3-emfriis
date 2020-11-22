const carBtn = document.getElementById('car-btn');
const notepadBtn = document.getElementById('notepad-btn');
const penBtn = document.getElementById('pen-btn');
const pillowBtn = document.getElementById('pillow-btn');
const chairBtn = document.getElementById('chair-btn');
const bikeBtn = document.getElementById('bike-btn');
const welcome = document.getElementById('welcome');
const headerLogo = document.getElementById('header-logo');
const homeBtn = document.getElementById('home-btn');
const shopBtn = document.getElementById('shop-btn');
const checkoutBtn = document.getElementById('checkout-btn');
const logInBtnHome = document.getElementById('log-in-btn-home');
const logOutBtnHome = document.getElementById('log-out-btn-home');

// Searches local storage for cart.
const localStorageCart = JSON.parse(localStorage.getItem('cart'));

// Creates cart from local storage or creates empty array if null.
let cart = localStorage.getItem('cart') !== null ? localStorageCart : [];

// Searches local storage for active user.
const localStorageActiveUser = JSON.parse(localStorage.getItem('activeUser'));

// Creates active user from local storage or uses guest if null.
let activeUser = localStorage.getItem('activeUser') !== null ? localStorageActiveUser : 'guest';

genWelcome();

showBtn();

function addCar(event) { // Adds car to cart.
    event.preventDefault();

    // Increases quantity by 1 if already in cart.
    if (cart.some((item) => item.name === 'Car')) {
        const itemIndex = cart.findIndex((item) => item.name === 'Car');
        cart[itemIndex].quantity += 1;
        updateCartLocalStorage();
        alert('Car added to cart');
    } else { // Adds new instance of item to cart.
        const item = {
            name: 'Car',
            price: 1,
            quantity: 1
        }
        cart.push(item);
        updateCartLocalStorage();
        alert('Car added to cart');
    }
}

function addNotepad(event) { // Adds notepad to cart.
    event.preventDefault();

    // Increases quantity by 1 if already in cart.
    if (cart.some((item) => item.name === 'Notepad')) {
        const itemIndex = cart.findIndex((item) => item.name === 'Notepad');
        cart[itemIndex].quantity += 1;
        updateCartLocalStorage();
        alert('Notepad added to cart');
    } else { // Adds new instance of item to cart.
        const item = {
            name: 'Notepad',
            price: 36,
            quantity: 1
        }
        cart.push(item);
        updateCartLocalStorage();
        alert('Notepad added to cart');
    }
}

function addPen(event) { // Adds pen to cart.
    event.preventDefault();

    // Increases quantity by 1 if already in cart.
    if (cart.some((item) => item.name === 'Pen')) {
        const itemIndex = cart.findIndex((item) => item.name === 'Pen');
        cart[itemIndex].quantity += 1;
        updateCartLocalStorage();
        alert('Pen added to cart');
    } else { // Adds new instance of item to cart.
        const item = {
            name: 'Pen',
            price: 200,
            quantity: 1
        }
        cart.push(item);
        updateCartLocalStorage();
        alert('Pen added to cart');
    }
}

function addPillow(event) { // Adds pillow to cart.
    event.preventDefault();

    // Increases quantity by 1 if already in cart.
    if (cart.some((item) => item.name === 'Pillow')) {
        const itemIndex = cart.findIndex((item) => item.name === 'Pillow');
        cart[itemIndex].quantity += 1;
        updateCartLocalStorage();
        alert('Pillow added to cart');
    } else { // Adds new instance of item to cart.
        const item = {
            name: 'Pillow',
            price: 15,
            quantity: 1
        }
        cart.push(item);
        updateCartLocalStorage();
        alert('Pillow added to cart');
    }
}

function addChair(event) { // Adds chair to cart.
    event.preventDefault();

    // Increases quantity by 1 if already in cart.
    if (cart.some((item) => item.name === 'Chair')) {
        const itemIndex = cart.findIndex((item) => item.name === 'Chair');
        cart[itemIndex].quantity += 1;
        updateCartLocalStorage();
        alert('Chair added to cart');
    } else { // Adds new instance of item to cart.
        const item = {
            name: 'Chair',
            price: 8,
            quantity: 1
        }
        cart.push(item);
        updateCartLocalStorage();
        alert('Chair added to cart');
    }
}

function addBike(event) { // Adds bike to cart.
    event.preventDefault();

    // Increases quantity by 1 if already in cart.
    if (cart.some((item) => item.name === 'Bike')) {
        const itemIndex = cart.findIndex((item) => item.name === 'Bike');
        cart[itemIndex].quantity += 1;
        updateCartLocalStorage();
        alert('Bike added to cart');
    } else { // Adds new instance of item to cart.
        const item = {
            name: 'Bike',
            price: 42,
            quantity: 1
        }
        cart.push(item);
        updateCartLocalStorage();
        alert('Bike added to cart');
    }
}

function updateCartLocalStorage() { // Updates cart in local storage.
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Generates welcome message for active user.
function genWelcome() {
    welcome.innerHTML = `
    Welcome, ${activeUser}
    `;
}

// Shows appropriate button.
function showBtn() {
    if (activeUser === 'guest') {
        logOutBtnHome.setAttribute('style', 'display:none');
    } else {
        logInBtnHome.setAttribute('style', 'display:none');
    }
}

// Takes user to log in page.
function logInHome(event) { 
    event.preventDefault()

    window.open('login.html', '_self');
}

// Takes user to log in page, removes active user status.
function logOutHome(event) {
    event.preventDefault()

    localStorage.removeItem('cart');

    localStorage.removeItem('activeUser');

    window.open('login.html', '_self');
}

// Takes user to home page.
function homePage() {
    window.open('index.html', '_self');
}

// Takes user to home page.
function shopPage() {
    window.open('shop.html', '_self');
}

// Takes user to home page.
function checkoutPage() {
    window.open('checkout.html', '_self');
}

carBtn.addEventListener('click', addCar);

notepadBtn.addEventListener('click', addNotepad);

penBtn.addEventListener('click', addPen);

pillowBtn.addEventListener('click', addPillow);

chairBtn.addEventListener('click', addChair);

bikeBtn.addEventListener('click', addBike);

logInBtnHome.addEventListener('click', logInHome);

logOutBtnHome.addEventListener('click', logOutHome);

headerLogo.addEventListener('click', homePage);

homeBtn.addEventListener('click', homePage);

shopBtn.addEventListener('click', shopPage);

checkoutBtn.addEventListener('click', checkoutPage);