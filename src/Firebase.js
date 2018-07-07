 import * as firebase from 'firebase';

  var config = {
    apiKey: "AIzaSyDkH0MYw-WmXbZ9vUFNjHh1o2aGrYsxNkQ",
    authDomain: "fileit-21.firebaseapp.com",
    databaseURL: "https://fileit-21.firebaseio.com",
    projectId: "fileit-21",
    storageBucket: "fileit-21.appspot.com",
    messagingSenderId: "406703503231"
  };
  firebase.initializeApp(config);

  export const database = firebase.database().ref('/');

