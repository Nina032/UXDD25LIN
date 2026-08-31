$(document).ready(function(){
    $('#myform').submit(function(event){
        event.preventDefault();
        
        //serialisera form data som JSON
        let formData = $('#myform').serializeArray();
        let jsonObject = {};
        $.each(formData, function(index,element){           //Bygger nyckelvärde par för json
            jsonObject[element.name] = element.value;
        });

        let jsonData = JSON.stringify(jsonObject);          //byter typen string

        //spara JSON data till en fil på client
        let blob = new Blob([jsonData],{type:"application/json;charset=utf-8"});
        saveAs(blob,"form_data.json")

        alert("Form data saved successfully!"); //meddelande till användare

        $('#myform').reset();       //rensar form

    });
});



/* https://jquery.com/
jQuery är ett snabbt, litet och funktionsrikt JavaScript-bibliotek. 
Det gör saker som HTML-dokumentgenomgång och manipulering, händelsehantering, 
animering och Ajax mycket enklare med ett lättanvänt API 
som fungerar i en mängd webbläsare. 
Med en kombination av mångsidighet och utbyggbarhet har jQuery förändrat 
hur miljontals människor skriver JavaScript.


https://www.w3schools.com/jquery/jquery_syntax.asp

  Basic syntax is: $(selector).action()

    A $ sign to define/access jQuery
    A (selector) to "query (or find)" HTML elements
    A jQuery action() to be performed on the element(s)

    Examples:

      $(this).hide() - hides the current element.

      $("p").hide() - hides all <p> elements.

      $(".test").hide() - hides all elements with class="test".

      $("#test").hide() - hides the element with id="test".
*/