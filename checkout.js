const cartTable = document.getElementById('cart-table');
const cartTotal = document.getElementById('cart-total');
const email = document.getElementById('email');
const fullName = document.getElementById('full-name');
const country = document.getElementById('country');
const address = document.getElementById('address');
const cardNumber = document.getElementById('card-number');
const cardName = document.getElementById('card-name');
const cvc = document.getElementById('cvc');
const orderBtn = document.getElementById('order-btn');
const orderInvalid = document.getElementById('order-invalid');
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

createCart();

genWelcome();

showBtn();

function createCart() { // Creates table from cart contents
    let total = 0;
    if (cart !== []) {
        for (let item in cart) {
            const tableItem = document.createElement('tr');
            tableItem.innerHTML = `
            <td>${cart[item].name}</td>
            <td>${cart[item].quantity}</td>
            <td>$${cart[item].price * cart[item].quantity}.00</td>
            `;
            const removeBtn = document.createElement('button');
            removeBtn.setAttribute('id', `remove-${cart[item].name.toLowerCase()}-btn`);
            removeBtn.setAttribute('class', 'remove-btn');
            removeBtn.innerHTML = `X`;
            const remove = document.createElement('td');
            remove.append(removeBtn);
            tableItem.append(remove);
            cartTable.append(tableItem);
            total += cart[item].price * cart[item].quantity;
        }
    }
    cartTotal.innerHTML = `
    $${total}.00
    `;
}

function removeCar() { // Removes car from cart.
    let itemIndex = cart.findIndex((item) => item.name === 'Car');
    cart.splice(itemIndex, 1);
    updateCartLocalStorage();
    location.reload();
}

function removeNotepad() { // Removes Notepad from cart.
    let itemIndex = cart.findIndex((item) => item.name === 'Notepad');
    cart.splice(itemIndex, 1);
    updateCartLocalStorage();
    location.reload();
}

function removePen() { // Removes Pen from cart.
    let itemIndex = cart.findIndex((item) => item.name === 'Pen');
    cart.splice(itemIndex, 1);
    updateCartLocalStorage();
    location.reload();
}

function removePillow() { // Removes Pillow from cart.
    let itemIndex = cart.findIndex((item) => item.name === 'Pillow');
    cart.splice(itemIndex, 1);
    updateCartLocalStorage();
    location.reload();
}

function removeChair() { // Removes Chair from cart.
    let itemIndex = cart.findIndex((item) => item.name === 'Chair');
    cart.splice(itemIndex, 1);
    updateCartLocalStorage();
    location.reload();
}

function removeBike() { // Removes Bike from cart.
    let itemIndex = cart.findIndex((item) => item.name === 'Bike');
    cart.splice(itemIndex, 1);
    updateCartLocalStorage();
    location.reload();
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

logInBtnHome.addEventListener('click', logInHome);

logOutBtnHome.addEventListener('click', logOutHome);

headerLogo.addEventListener('click', homePage);

homeBtn.addEventListener('click', homePage);

shopBtn.addEventListener('click', shopPage);

checkoutBtn.addEventListener('click', checkoutPage);

const removeCarBtn = document.getElementById('remove-car-btn');
const removeNotepadBtn = document.getElementById('remove-notepad-btn');
const removePenBtn = document.getElementById('remove-pen-btn');
const removePillowBtn = document.getElementById('remove-pillow-btn');
const removeChairBtn = document.getElementById('remove-chair-btn');
const removeBikeBtn = document.getElementById('remove-bike-btn');

if (cart.some((item) => item.name === 'Car')) {
    removeCarBtn.addEventListener('click', removeCar);
}
if (cart.some((item) => item.name === 'Notepad')) {
    removeNotepadBtn.addEventListener('click', removeNotepad);
}
if (cart.some((item) => item.name === 'Pen')) {
    removePenBtn.addEventListener('click', removePen);
}
if (cart.some((item) => item.name === 'Pillow')) {
    removePillowBtn.addEventListener('click', removePillow);
}
if (cart.some((item) => item.name === 'Chair')) {
    removeChairBtn.addEventListener('click', removeChair);
}
if (cart.some((item) => item.name === 'Bike')) {
    removeBikeBtn.addEventListener('click', removeBike);
}

function processOrder(event) {
    event.preventDefault();
    if (email.value !== '' && fullName.value !== '' && country.value !== '' && address.value !== '' && !isNaN(+cardNumber.value) && cardNumber.value.length === 16 && cardName.value !== '' && !isNaN(+cvc.value) && cvc.value.length === 3) {
        localStorage.removeItem('cart');
        orderInvalid.classList.add('hide');
        email.value = '';
        fullName.value = '';
        country.value = '';
        address.value = '';
        cardNumber.value = '';
        cardName.value = '';
        cvc.value = '';
        alert('Order Recieved');
    } else {
        orderInvalid.classList.remove('hide');
    }
}

orderBtn.addEventListener('click', processOrder);

