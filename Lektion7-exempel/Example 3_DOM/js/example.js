//lägg till elements på start och slut av listan
let list = document.getElementsByTagName('ul')[0];      // Hämta <ul> element node

//...på slut
let newItemLast = document.createElement('li');             //Skapar li element
let newTextLast = document.createTextNode('cream');         //Skapar text node
newItemLast.appendChild(newTextLast);                       //Lägg till text node i li element
list.appendChild(newItemLast);                              //Lägg till li element i slutet av lista
//...på start