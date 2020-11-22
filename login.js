const logInUser = document.getElementById('login-user');
const logInUserEmpty = document.getElementById('login-user-empty');
const logInUserInvalid = document.getElementById('login-user-invalid');
const logInPass = document.getElementById('login-pass');
const logInPassEmpty = document.getElementById('login-pass-empty');
const logInPassInvalid = document.getElementById('login-pass-invalid');
const logInBtn = document.getElementById('login-btn');
const regUser = document.getElementById('reg-user');
const regUserEmpty = document.getElementById('reg-user-empty');
const regUserInvalid = document.getElementById('reg-user-invalid');
const regPass1 = document.getElementById('reg-pass-1');
const regPass1Empty = document.getElementById('reg-pass-1-empty');
const regPass2 = document.getElementById('reg-pass-2');
const regPass2Empty = document.getElementById('reg-pass-2-empty');
const regPass2Invalid = document.getElementById('reg-pass-2-invalid');
const regBtn = document.getElementById('reg-btn');
const welcome = document.getElementById('welcome');
const headerLogo = document.getElementById('header-logo');
const homeBtn = document.getElementById('home-btn');
const shopBtn = document.getElementById('shop-btn');
const checkoutBtn = document.getElementById('checkout-btn');
const logInBtnHome = document.getElementById('log-in-btn-home');
const logOutBtnHome = document.getElementById('log-out-btn-home');

// Searches local storage for accounts.
const localStorageAccounts = JSON.parse(localStorage.getItem('accounts'));

// Creates accounts from local storage or creates empty array if null.
let accounts = localStorage.getItem('accounts') !== null ? localStorageAccounts : [];

// Searches local storage for active user.
const localStorageActiveUser = JSON.parse(localStorage.getItem('activeUser'));

// Creates active user from local storage or uses guest if null.
let activeUser = localStorage.getItem('activeUser') !== null ? localStorageActiveUser : 'guest';

genWelcome();

showBtn();

function addAcc(event) { // Registers account.
    event.preventDefault();

    // Checks if sign up inputs are valid.
    if (regUser.value.trim() === '' || userExists(regUser.value) || regUser.value === 'guest' || regPass1.value.trim() === '' || regPass2.value.trim() === '' || regPass1.value !== regPass2.value) {
        if (regUser.value.trim() === '') { // Shows error if sign up username is empty.
            regUserEmpty.classList.remove('hide');
            regUserInvalid.classList.add('hide');
        } else if (userExists(regUser.value) || regUser.value === 'guest') { // Shows error if sign up username is taken.
            regUserInvalid.classList.remove('hide');
            regUser.value = ''; // Empties sign up username field.
        } else {
            regUserEmpty.classList.add('hide');
            regUserInvalid.classList.add('hide');
        }
        if (regPass1.value.trim() === '') { // Shows error if sign up password 1 is empty.
            regPass1Empty.classList.remove('hide');
        } else {
            regPass1Empty.classList.add('hide');
        }
        if (regPass2.value.trim() === '') { // Shows error if sign up password 2 is empty.
            regPass2Empty.classList.remove('hide');
            regPass2Invalid.classList.add('hide');
        } else if (regPass1.value !== regPass2.value) { // Shows error if sign up password 2 doesnt match sign up password 1.
            regPass2Invalid.classList.remove('hide');
            regPass2.value = ''; // Empties sign up password 2 field.
        } else {
            regPass2Empty.classList.add('hide');
            regPass2Invalid.classList.add('hide');
        }
    } else {

        const account = { // Creates account object.
            user: regUser.value,
            pass: regPass1.value
        }

        accounts.push(account); // Adds account to accounts.

        updateAccountsLocalStorage(); // Updates accounts in local storage.

        regUser.value = ''; // Empties sign up username field.
        regPass1.value = ''; // Empties sign up password 1 field.
        regPass2.value = ''; // Empties sign up password 2 field.

        regUserEmpty.classList.add('hide');
        regUserInvalid.classList.add('hide');
        regPass1Empty.classList.add('hide');
        regPass2Empty.classList.add('hide');
        regPass2Invalid.classList.add('hide');
    }
}

function userExists(user) { // Checks if user already exists.
    return accounts.some((acc) => acc.user === user);
}

function updateAccountsLocalStorage() { // Updates accounts in local storage.
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

function logIn(event) {
    event.preventDefault();

    // Checks if log in inputs are valid.
    if (logInUser.value.trim() === '' || !userExists(logInUser.value) || logInPass.value.trim() === '' || !matchPass(logInUser.value)) {
        if (logInUser.value.trim() === '') { // Shows error if log in username is empty.
            logInUserEmpty.classList.remove('hide');
            logInUserInvalid.classList.add('hide');
            logInPassInvalid.classList.add('hide');
        } else if (!userExists(logInUser.value)) { // Shows error if log in username doesnt exist.
            logInUserInvalid.classList.remove('hide');
            logInPassInvalid.classList.add('hide');
        } else if (!matchPass(logInUser.value)) { // Shows error if log in username and password dont match.
            logInPassInvalid.classList.remove('hide');
            logInPassEmpty.classList.add('hide');
        }
        if (logInPass.value.trim() === '') { // Shows error if log in password is empty.
            logInPassEmpty.classList.remove('hide');
            logInPassInvalid.classList.add('hide');
        }
    } else {
        // Clears local storage from previous account if not a guest.
        if (activeUser !== 'guest') {
            // Empties currently stored cart.
            localStorage.removeItem('cart');
            // Removes currently stored active user.
            localStorage.removeItem('activeUser');
        }

        // Sets active user as log in username.
        activeUser = logInUser.value;
        localStorage.setItem('activeUser', JSON.stringify(activeUser));

        // Opens home page in same tab.
        window.open('index.html', '_self');

        logInUserEmpty.classList.add('hide');
        logInUserInvalid.classList.add('hide');
        logInPassEmpty.classList.add('hide');
        logInPassInvalid.classList.add('hide');
    }
}

function matchPass(user) { // Finds password associated with log in user and compares to log in password.
    const userIndex = accounts.findIndex((acc) => acc.user === user);
    return accounts[userIndex].pass === logInPass.value;
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

regBtn.addEventListener('click', addAcc);

logInBtn.addEventListener('click', logIn);

logInBtnHome.addEventListener('click', logInHome);

logOutBtnHome.addEventListener('click', logOutHome);

headerLogo.addEventListener('click', homePage);

homeBtn.addEventListener('click', homePage);

shopBtn.addEventListener('click', shopPage);

checkoutBtn.addEventListener('click', checkoutPage);