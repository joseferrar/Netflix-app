import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNETaVpsNd2DnxL2zxECAsRjpvAAYtZ8M",
  authDomain: "netflix-app-e33eb.firebaseapp.com",
  projectId: "netflix-app-e33eb",
  storageBucket: "netflix-app-e33eb.appspot.com",
  messagingSenderId: "232290922487",
  appId: "1:232290922487:web:b29776056c941945e088f2",
};
// Initialize Firebase

let app;
if (firebase.default.apps.length === 0) {
  app = firebase.default.initializeApp(firebaseConfig);
} else {
  app = firebase.default.app();
}

const db = app.firestore();
const auth = firebase.default.auth();
const storage = firebase.default.storage();

export { db, auth, storage };
