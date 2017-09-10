import * as firebase from 'firebase';

var FirebaseUtil = {
  init: function(){
    var config = {
      apiKey: "AIzaSyA_-2pC7xxExfczO5B67LrWaZVQKkSXsIA",
      authDomain: "gaymerbears-52f4d.firebaseapp.com",
      databaseURL: "https://gaymerbears-52f4d.firebaseio.com",
      projectId: "gaymerbears-52f4d",
      storageBucket: "gaymerbears-52f4d.appspot.com",
      messagingSenderId: "372385646334"
    };
    firebase.initializeApp(config);
  },
  
  getFirebase: function(){
    return firebase;
  }
};

export default FirebaseUtil;
