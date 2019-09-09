//listen for submit event
document.getElementById('signinform')
document.addEventListener('submit', signinForm);

//Submit form
function signinForm(e) {
  console.log("Attempting sign in...");
  e.preventDefault();
  // Get Values from the DOM
  let email = document.querySelector('#email').value;
  let password = document.querySelector('#user-pw').value;

  //send message values
  signMessage(email, password);
}

//Send Message to Firebase

function signMessage(email, password) {
  console.log("Success1!");

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function() {
    console.log("The user" + firebase.auth().currentUser.uid + "is now signed in!");
    // bootstrap_alert = function() {}
    // bootstrap_alert.warning = function(message) {
    //         $('#alert_placeholder').html('<div class="alert"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>')
    // }

    // bootstrap_alert.warning("You're now signed in.");

    window.location.href = 'index.html';


  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    console.log(errorCode);
    console.log(errorMessage);

    bootstrap_alert = function() {}
    bootstrap_alert.warning = function(message) {
            $('#alert_placeholder').html('<div class="alert"><a class="close" data-dismiss="alert">×</a><span>'+message+'</span></div>')
    }

    bootstrap_alert.warning('Please try again.');
    
  });
};