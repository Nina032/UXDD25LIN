let noteInput, noteName, textEntered, target;

noteName = document.getElementById('noteName');     //Element som har note name (h2)
noteInput = document.getElementById('noteInput');   //Element som har värde (input)

function writeLabel(e){
    //Fånga event target
    target = e.target;

    //Hämta värde av det elementet
    textEntered = target.value;

    //Updatera note text
    noteName.textContent = textEntered;
}




noteInput.addEventListener('input', writeLabel);    //Event listener på input för att lysna efter input, kallar function writelabel 