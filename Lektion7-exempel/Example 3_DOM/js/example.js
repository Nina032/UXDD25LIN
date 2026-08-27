//lägg till elements på start och slut av listan
let list = document.getElementsByTagName('ul')[0];      // Hämta <ul> element node

//...på slut
let newItemLast = document.createElement('li');             //Skapar li element
let newTextLast = document.createTextNode('cream');         //Skapar text node
newItemLast.appendChild(newTextLast);                       //Lägg till text node i li element
list.appendChild(newItemLast);                              //Lägg till li element i slutet av lista

//...på start
let newItemFirst = document.createElement('li');            //Skapar li element
let newTextFirst = document.createTextNode('kale');         //Skapar text node
newItemFirst.appendChild(newTextFirst);                     //Lägg till text node i li element
list.insertBefore(newItemFirst, list.firstChild)            //Lägg till li element i början av lista

//lägg till class .cool på alla li elements
let listElements = document.querySelectorAll('li');         //Select all li elements
for(i=0; i<listElements.length; i++) {                      //Gå genom alla element i listan
    listElements[i].className = 'cool';                     // byta class till .cool class
}
