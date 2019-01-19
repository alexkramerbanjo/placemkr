var admin = require("firebase-admin");

var serviceAccount = require("../secrets.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://placemkr.firebaseio.com"
});
