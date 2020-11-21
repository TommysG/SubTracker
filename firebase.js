import * as firebase from "firebase";

import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxTGSz0owyOv7-7YbaHp3Ag6Bc91slTLI",
  authDomain: "subtracker-auth.firebaseapp.com",
  databaseURL: "https://subtracker-auth.firebaseio.com",
  projectId: "subtracker-auth",
  storageBucket: "subtracker-auth.appspot.com",
  messagingSenderId: "577466439180",
  appId: "1:577466439180:web:b3e1603cc1d55053bf0029",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
