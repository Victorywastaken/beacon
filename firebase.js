import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVtw3y2bOYsPJPOmyXo-OZLuPDZfYaOxc",
  authDomain: "beacon-e5406.firebaseapp.com",
  projectId: "beacon-e5406",
  storageBucket: "beacon-e5406.appspot.com",
  messagingSenderId: "622943736613",
  appId: "1:622943736613:web:a8c98f2fee1648449b80cc"
};

let app;

if(firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
