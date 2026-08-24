let greeting = 'Howdy ';
let username = 'Molly';
let message = ', please check your order:';

let welcome = greeting + username + message;
let sign = 'Montague House';
let tiles = sign.length;
let subTotal = tiles * 5;
let shipping = 7;
let grandTotatl = subTotal + shipping;
let valuta = '$';

let el = document.getElementById('greeting');
el.textContent = welcome;

let elSign = document.getElementById('userSign');
elSign.textContent = sign;

let elTiles = document.getElementById('tiles');
elTiles.textContent = tiles;

let elSubTotal = document.getElementById('subTotal');
elSubTotal.textContent = valuta + subTotal;

let elShipping = document.getElementById('shipping');
elShipping.textContent = valuta + shipping;

let elGrandTotal = document.getElementById('grandTotal');
elGrandTotal.textContent = valuta + grandTotatl;