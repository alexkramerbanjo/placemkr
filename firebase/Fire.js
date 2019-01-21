import firebase from "firebase";

const { fireConfig } = require("../secrets/secrets.js");

const firebaseApp = firebase.initializeApp(fireConfig);
console.log("FIREBASE", firebase);

// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

const storageRef = firebase.storage().ref();

export { firebase, storageRef, firebaseApp };
