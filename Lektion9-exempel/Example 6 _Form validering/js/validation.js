// JavaScript-validering av formulär för prenumeration.

// A. Anonym funktion som utlöses av submit-händelsen 
// B. Funktioner som anropas för att utföra generiska kontroller av den anonyma funktionen i avsnitt A
// C. Funktioner för anpasad validering 
// D. Funktioner för att hämta / sätta / visa / ta bort felmeddelanden
// E. Objekt för att kontrollera datatyp med hjälp av RegEx, anropat av validateTypes i avsnitt B

// Beroenden: birthday.js, c13.css

(function () {
  document.forms.register.noValidate = true; // Inaktivera HTML5-validering - använder JavaScript istället
  // -------------------------------------------------------------------------
  //  A) ANONYM FUNKTION SOM UTLÖSES AV SUBMIT-HÄNDELSEN
  // -------------------------------------------------------------------------
  document.querySelector('form').addEventListener('submit', function (e) {
    var elements = this.elements;            // Samling av formulärkontroller
    var valid = {};                          // Anpassat valid-objekt
    var isValid;                             // isValid: kontrollerar formulärkontroller
    var isFormValid;                         // isFormValid: kontrollerar hela formuläret

    // UTFÖR GENERISKA KONTROLLER (anropar funktioner utanför händelsehanteraren)
    var i;
    for (i = 0, l = elements.length; i < l; i++) {
      // Nästa rad anropar validateRequired() validateTypes()
      isValid = validateRequired(elements[i]) && validateTypes(elements[i]); 
      if (!isValid) {                    // Om det inte klarar dessa två tester
        showErrorMessage(elements[i]);   // Visa felmeddelanden
      } else {                           // Annars
        removeErrorMessage(elements[i]); // Ta bort felmeddelanden
      }                                  // Slut på if-sats
      valid[elements[i].id] = isValid;   // Lägg till element i valid-objektet
    }                                    // Slut på for-loop

    // UTFÖR ANPASSAD VALIDERING
    // bio (du kunde cache:a bio-fältet i en variabel här)
    if (!validateBio()) {                // Anropa validateBio(), och om det inte är giltigt
      showErrorMessage(document.getElementById('bio')); // Visa felmeddelande
      valid.bio = false;                 // Uppdatera valid-objektet - detta element är inte giltigt
    } else {                             // Annars ta bort felmeddelande
      removeErrorMessage(document.getElementById('bio'));
    }

    // lösenord (du kunde cache:a lösenordet i en variabel här)
    if (!validatePassword()) {          // Anropa validatePassword(), och om det inte är giltigt
      showErrorMessage(document.getElementById('password')); // Visa felmeddelande
      valid.password = false;           // Uppdatera valid-objektet - detta element är inte giltigt
    } else {                            // Annars ta bort felmeddelande
      removeErrorMessage(document.getElementById('password'));
    }

    // vårdnadshavarens samtycke (du kunde cache:a parent-consent i en variabel här)
    if (!validateParentsConsent()) {     // Anropa validateParentalConsent(), och om det inte är giltigt
      showErrorMessage(document.getElementById('parents-consent')); // Visa felmeddelande
      valid.parentsConsent = false;      // Uppdatera valid-objektet - detta är inte giltigt
    } else {                             // Annars ta bort felmeddelande
      removeErrorMessage(document.getElementById('parents-consent'));
    }

    // GICK DET GENOM / KAN DET SKICKA IN FORMULÄRET?
    // Loopa igenom valid-objektet, om det finns fel sätts isFormValid till false
    for (var field in valid) {          // Kontrollera egenskaper i valid-objektet
      if (!valid[field]) {              // Om det inte är giltigt
        isFormValid = false;            // Sätt variabeln isFormValid till false
        break;                          // Avbryt for-loopen, ett fel hittades
      }                                 // Annars
      isFormValid = true;               // Formuläret är giltigt och klart att skickas
    }


    // Om formuläret inte validerades, hindra att det skickas
    if (!isFormValid) {                 // Om isFormValid inte är true
      e.preventDefault();               // Hindra formuläret från att skickas
    }

  });                                   // Slut på händelsehanteraren (anonym funktion)
  //  SLUT: anonym funktion som utlöses av submit-knappen


  // -------------------------------------------------------------------------
  // B) FUNKTIONER FÖR GENERISKA KONTROLLER
  // -------------------------------------------------------------------------

  // KONTROLLERA OM FÄLTET ÄR OBLIGATORISKT OCH OM SÅ ÄR DET HAR DET ETT VÄRDE
  // Förlitar sig på isRequired() och isEmpty(), båda visas nedan, samt setErrorMessage - visas senare.
  function validateRequired(el) {
    if (isRequired(el)) {                           // Är detta element obligatoriskt?
      var valid = !isEmpty(el);                     // Är värdet inte tomt (true / false)?
      if (!valid) {                                 // Om variabeln valid innehåller false
        setErrorMessage(el,  'Field is required');  // Sätt felmeddelandet
      }
      return valid;                                 // Returnera variabeln valid (true eller false)?
    }
    return true;                                    // Om det inte är obligatoriskt, är allt okej
  }

  // KONTROLLERA OM ELEMENTET ÄR OBLIGATORISKT
  // Det anropas av validateRequired()
  function isRequired(el) {
   return ((typeof el.required === 'boolean') && el.required) ||
     (typeof el.required === 'string');
  }

  // KONTROLLERA OM ELEMENTET ÄR TOMT (eller dess värde är samma som platshållartexten)
  // HTML5-webbläsare tillåter användare att ange samma text som platshållaren, men i detta fall bör användare inte behöva det
  // Det anropas av validateRequired()
  function isEmpty(el) {
    return !el.value || el.value === el.placeholder;
  }

  // KONTROLLERA OM VÄRDET PASSAR TILL TYPE-ATTRIBUTET
  // Förlitar sig på validateType-objektet (visas längst ner i IIFE)
  function validateTypes(el) {
    if (!el.value) return true;                     // Om elementet inte har något värde, returnera true
                            // Annars hämta typ från dataset eller attribut
    var type = el.dataset.type || el.getAttribute('type');
    if (typeof validateType[type] === 'function') { // Är typen en metod i valid-objektet?
      return validateType[type](el);                // Om ja, kontrollera om värdet är giltigt
    } else {                                        // Om inte
      return true;                                  // Returnera true eftersom det inte kan testas
    }
  }

  // -------------------------------------------------------------------------
  // C) FUNKTIONER FÖR ANPASSAD VALIDERING
  // -------------------------------------------------------------------------

  // OM ANVÄNDAREN ÄR UNDER 13 ÅR, KONTROLLERA ATT FÖRÄLDRARNA HAR KRYSSAT I SAMTYCKE-KONTROLLRUTAN
  // Beroende: birthday.js (annars fungerar inte kontrollen)
  function validateParentsConsent() {
    var parentsConsent   = document.getElementById('parents-consent');
    var consentContainer = document.getElementById('consent-container');
    var valid = true;                          // Variabel: valid satt till true
    if (consentContainer.className.indexOf('hide') === -1) { // Om kryssrutan visas
      valid = parentsConsent.checked;          // Uppdatera valid: är den ikryssad/ej
      if (!valid) {                            // Om inte, sätt felmeddelandet
        setErrorMessage(parentsConsent, 'You need your parents\' consent');
      }
    }
    return valid;                               // Returnera om det är giltigt eller inte
  }

  // Kontrollera om bio är högst 140 tecken
  function validateBio() {
    var bio = document.getElementById('bio');
    var valid = bio.value.length <= 140;
    if (!valid) {
      setErrorMessage(bio, 'Please make sure your bio does not exceed 140 characters');
    }
    return valid;
  }

  // Kontrollera att lösenorden matchar och att de är minst 8 tecken långa
  function validatePassword() {
    var password = document.getElementById('password');
    var valid = password.value.length >= 8;
    if (!valid) {
      setErrorMessage(password, 'Please make sure your password has at least 8 characters');
    }
    return valid;
  }



  // -------------------------------------------------------------------------
  // D) FUNKTIONER FÖR ATT SÄTTA / HÄMTA / VISA / TA BORT FELMEDELANDEN
  // -------------------------------------------------------------------------

  function setErrorMessage(el, message) {
    el.dataset.errorMessage = message;              // Lagra felmeddelande med elementet
  }

  function getErrorMessage(el) {
    return el.dataset.errorMessage || el.title;      // Hämta felmeddelande eller titel för elementet
  }

  function showErrorMessage(el) {
    var errorContainer = el.nextElementSibling;     // Hämta nästa syskon som är felmeddelande

    if (!errorContainer || !errorContainer.matches('.error.message')) { // Om inget fel existerar
      errorContainer = document.createElement('span'); // Skapa en span för felet
      errorContainer.className = 'error message';
      el.insertAdjacentElement('afterend', errorContainer); // Sätt den efter fältet
    }
    errorContainer.textContent = getErrorMessage(el); // Lägg till felmeddelandetext
  }

  function removeErrorMessage(el) {
    var errorContainer = el.nextElementSibling;     // Hämta nästa syskon som är felmeddelande
    if (errorContainer && errorContainer.matches('.error.message')) {
      errorContainer.remove();                       // Ta bort felmeddelandet
    }
  }



  // -------------------------------------------------------------------------
  // E) OBJEKT FÖR KONTROLL AV TYPER
  // -------------------------------------------------------------------------

  // Kontrollerar om data är giltig, om inte sätt felmeddelande
  // Returnerar true om giltig, false om ogiltig
  var validateType = {
    email: function (el) {                                 // Skapa email() metod
      // Grundläggande reguljära uttryck som kontrollerar ett enda @ i e-postadressen
      var valid = /[^@]+@[^@]+/.test(el.value);            // Spara resultatet av testet i valid
      if (!valid) {                                        // Om värdet i valid inte är true
        setErrorMessage(el, 'Please enter a valid email'); // Sätt felmeddelande
      }
      return valid;                                        // Returnera variabeln valid
    },
    number: function (el) {                                // Skapa number() metod
      var valid = /^\d+$/.test(el.value);                  // Spara resultatet av testet i valid
      if (!valid) {
        setErrorMessage(el, 'Please enter a valid number');
      }
      return valid;
    },
    date: function (el) {                                  // Skapa date() metod
                                                           // Spara resultatet av testet i valid
      var valid = /^(\d{2}\/\d{2}\/\d{4})|(\d{4}-\d{2}-\d{2})$/.test(el.value);
      if (!valid) {                                        // Om värdet i valid inte är true
        setErrorMessage(el, 'Please enter a valid date');  // Sätt felmeddelande
      }
      return valid;                                        // Returnera variabeln valid
    }
  };

}());  // Slut på IIFE