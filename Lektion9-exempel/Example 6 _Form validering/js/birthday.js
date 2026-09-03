(function () {
  var birth = document.getElementById('birthday');          // D-O-B input
  var parentsConsent = document.getElementById('parents-consent');
  var consentContainer = document.getElementById('consent-container');

  birth.addEventListener('blur', checkDate);                // D-O-B loses focus
  birth.addEventListener('change', checkDate);

  function checkDate() {                               // Declare checkDate()
    var dob = this.value.split('-');                   // Array from date
    // Pass toggleParentsConsent() the date of birth as a date object
    toggleParentsConsent(new Date(dob[0], dob[1] - 1, dob[2]));
  }

  function toggleParentsConsent(date) {                 // Declare function
    if (isNaN(date)) return;                            // Stop if date invalid
    var now = new Date();                               // New date obj: today
    // If diff less than 13 years (ms * seconds * mins * hours * days * years)
    // does not account for leap years!
    // if the user is less than 13 we show parents consent tickbox
    if ((now - date) < (1000 * 60 * 60 * 24 * 365 * 13)) { 
      consentContainer.classList.remove('hide');            // Show consent checkbox
      parentsConsent.focus();                                // Give it focus
    } else {                                            // Otherwise
      consentContainer.classList.add('hide');                // Hide consent checkbox
      parentsConsent.checked = false;                        // Set checked to false
    }
  }
}());