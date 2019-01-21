const admin = require("firebase");

var serviceAccount = require("../secrets/secrets.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://placemkr.firebaseio.com"
});

export const firestore = admin.database();

console.log(firestore);
