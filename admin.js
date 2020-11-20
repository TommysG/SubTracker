import admin from "firebase-admin";
import config from "./config.js";

admin.initializeApp({
  credential: admin.credential.cert(config),
  databaseURL: "https://subtracker-auth.firebaseio.com",
});

export default admin;
