(function () {
  var bio = document.getElementById('bio');
  var bioCounter = document.getElementById('bio-count');

  // show the counter when the field is focused and update the class
  // depending on amount of characters left
  bio.addEventListener('focus', updateCounter);
  bio.addEventListener('keyup', updateCounter);

  // when we leave the textarea, we hide the counter unless there are too
  // many characters
  bio.addEventListener('blur', function () {
    if (Number(bioCounter.textContent) >= 0) {
      bioCounter.classList.add('hide');
    }
  });


  function updateCounter(e) {
    var count = 140 - bio.value.length;
    var status = '';
    if (count < 0) {
      status = 'error';
    } else if (count <= 15) {
      status = 'warn';
    } else {
      status = 'good';
    }

    // remove previous classes
    bioCounter.classList.remove('error', 'warn', 'good', 'hide');
    // add new class
    bioCounter.classList.add(status);
    bioCounter.textContent = count;
  }

}());