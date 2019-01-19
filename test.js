const firebase = require("firebase");
const fs = require("fs");

const fireConfig = {
  apiKey: "AIzaSyBruIyn4ZjpHERetetJY09G-jURgVc99kU",
  authDomain: "placemkr.firebaseapp.com",
  databaseURL: "https://placemkr.firebaseio.com",
  projectId: "placemkr",
  storageBucket: "placemkr.appspot.com",
  messagingSenderId: "1024026051426"
};

const firebaseApp = firebase.initializeApp(fireConfig);

const database = firebaseApp.database();
const storageRef = firebase.storage().ref();

const fileRef = storageRef.child("/sounds/1.m4a");
fs.readFile("./1.m4a").then(file => {
  storageRef.put(file);
});
