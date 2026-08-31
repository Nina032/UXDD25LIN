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

function recorderControls(e) {
    //Fånga target
    target = e.target;
    
    //Avbryta default action
    if(e.preventDefault) {
        e.preventDefault();
    }

    //Bestäma data-state
    switch (target.getAttribute('data-state')) {
        case 'record':
            record(target);
    }

}
function record(target) {
    target.setAttribute('data-state','stop');
    target.textContent = 'stop';
}

//Eventlistener på document
document.addEventListener('click', function(e) {recorderControls(e)});

noteInput.addEventListener('input', writeLabel);    //Event listener på input för att lysna efter input, kallar function writelabel 