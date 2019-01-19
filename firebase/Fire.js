const firebase = require("firebase");

const { fireConfig } = require("../secrets/secrets.js");

const firebaseApp = firebase.initializeApp(fireConfig);

const database = firebase.database();

const storageRef = firebase.storage().ref();

export { firebase, database, storageRef, firebaseApp };
