const welcome = document.getElementById('welcome');
const headerLogo = document.getElementById('header-logo');
const homeBtn = document.getElementById('home-btn');
const shopBtn = document.getElementById('shop-btn');
const checkoutBtn = document.getElementById('checkout-btn');
const logInBtnHome = document.getElementById('log-in-btn-home');
const logOutBtnHome = document.getElementById('log-out-btn-home');
const shopNowBtn = document.getElementById('shop-now-btn');

// Searches local storage for active user.
const localStorageActiveUser = JSON.parse(localStorage.getItem('activeUser'));

// Creates active user from local storage or uses guest if null.
let activeUser = localStorage.getItem('activeUser') !== null ? localStorageActiveUser : 'guest';

genWelcome();

showBtn();

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

logInBtnHome.addEventListener('click', logInHome);

logOutBtnHome.addEventListener('click', logOutHome);

headerLogo.addEventListener('click', homePage);

homeBtn.addEventListener('click', homePage);

shopBtn.addEventListener('click', shopPage);

checkoutBtn.addEventListener('click', checkoutPage);

shopNowBtn.addEventListener('click', shopPage);