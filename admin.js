import admin from "firebase-admin";
import config from "./config.js";

admin.initializeApp({
  credential: admin.credential.cert(config),
  databaseURL: "https://subtracker-auth.firebaseio.com",
  storageBucket: "subtracker-auth.appspot.com",
});

export default admin;
