// FB.login(function(response) {
//     if (response.authResponse) {
//      console.log('Welcome!  Fetching your information.... ');
//      FB.api('/me', function(response) {
//        console.log('Good to see you, ' + response.name + '.');
//      });
//     } else {
//      console.log('User cancelled login or did not fully authorize.');
//     }
// });



// Your web app's Firebase configuration
    // if (firebase.apps.length == 0) {
      // var firebaseConfig = {
      //   apiKey: "AIzaSyDC6aIh2CO8VJgiTf90xne7j95jGQAw1xg",
      //   authDomain: "livepangaea-730bf.firebaseapp.com",
      //   databaseURL: "https://livepangaea-730bf.firebaseio.com",
      //   projectId: "livepangaea-730bf",
      //   storageBucket: "",
      //   messagingSenderId: "1078204612034",
      //   appId: "1:1078204612034:web:1ca46f62b8b0e05238ea5b"
      // };
      // // Initialize Firebase
      // firebase.initializeApp(firebaseConfig);
    // }






function facebookSignin() {
  var provider = new firebase.auth.FacebookAuthProvider();
    console.log("REGISTERING!");
    
    provider.addScope('email');
    provider.addScope('user_location');


    // firebase.auth().signInWithPopup(provider).then(function(result) {
    //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //   var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   // ...
    //   console.log(token);
    //   console.log(user);
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    //   console.log(errorCode);
    //   console.log(errorMessage);
    //   console.log(email);
    //   console.log(credential);
    // });

    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // ...
        console.log(token);
      }
      // The signed-in user info.
       var user = result.user;
       console.log(user);
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
    });
};









//listen for submit event
document.getElementById('registrationform')
document.addEventListener('submit', formSubmit);

//Submit form
function formSubmit(e) {
  e.preventDefault();
  // Get Values from the DOM
  let email = document.querySelector('#email').value;
  let password = document.querySelector('#password').value;
  let fname = document.querySelector('#fname').value;
  let lname = document.querySelector('#lname').value;
  let address = document.querySelector('#address').value;
  let city = document.querySelector('#city').value;
  let country = document.querySelector('#country').value;
  let postalcode = document.querySelector('#postalcode').value;
  let bio = document.querySelector('#bio').value;

  //send message values
  sendMessage(email, password, fname, lname, address, city, country, postalcode, bio);

  //Form Reset After Submission
  document.getElementById('registrationform').reset();
}

//Send Message to Firebase
function sendMessage(email, password, fname, lname, address, city, country, postalcode, bio) {

  var db = firebase.firestore();

  console.log("Success1!");

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function() {
    console.log("Success2!");
    var currentUserUID = firebase.auth().currentUser.uid;
    console.log(currentUserUID);
    db.collection("users").doc(currentUserUID).set({
      email: email,
      password: password,
      fname: fname,
      lname: lname,
      address: address,
      city: city,
      country: country,
      postalcode: postalcode,
      bio: bio
    })
    .then(function() {
      console.log("Document set!");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
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



// var chall = document.getElementById('chall');

// chall.onclick = myfunction();

function challenge(e) {
  var challenge = e.getAttribute('data-name');
  if(e.getAttribute('type') == "checkbox"){
    if(document.getElementById(e.id).checked == false){
      console.log("Toggle switched OFF");
      removeFromList(challenge);
    } else {
      console.log("Toggle switched ON");
      addToList(challenge);
    }
  }
  if(e.getAttribute('type') != "checkbox"){
    console.log("Challenge accepted.");
    addToList(challenge);
  };
};


function addToList(challenge) {
    color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      // icon: "tim-icons icon-bell-55",
      icon:"",
      message: "The challenge has been added to your list."
    }, {
      type: type[color],
      timer: 8000,
      placement: {
        from: "top",
        align: "right"
      }
    });

    console.log("The user has agreed to " + challenge);
    
    var db = firebase.firestore();

    var currentUserUID = firebase.auth().currentUser.uid;

    db.collection("users/" + currentUserUID + "/challenges").add({
      title: challenge
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
     console.error("Error adding document: ", error);
    });
};

function removeFromList(challenge) {
    color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      // icon: "tim-icons icon-bell-55",
      icon:"",
      message: "The challenge has been removed from your list."
    }, {
      type: type[color],
      timer: 8000,
      placement: {
        from: "top",
        align: "right"
      }
    });

    console.log("The user no longer wants to " + challenge);

    var db = firebase.firestore();

    var currentUserUID = firebase.auth().currentUser.uid;

    db.collection("users/" + currentUserUID + "/challenges").where("title", "==", challenge)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined in query doc snapshots!
          db.collection("users/" + currentUserUID + "/challenges").doc(doc.id)
            .delete()
            .then(function() {
              console.log("Document successfully deleted!");
            }).catch(function(error) {
              console.error("Error removing document: ", error);
            })
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
};


function fillTable(){

  

  // Find a <table> element with id="myTable":
var table = document.getElementById("subscribed");


var i = 1;

    var db = firebase.firestore();
    var currentUserUID = firebase.auth().currentUser.uid;
    db.collection("users/" + currentUserUID + "/challenges")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        //doc.data() is never undefined for query doc snapshots
        // Create an empty <tr> element and add it to the 1st position of the table:
var row = table.insertRow(i);

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);

  

cell2.innerHTML = "0 Days";

i++;

      })
    })




    
};


