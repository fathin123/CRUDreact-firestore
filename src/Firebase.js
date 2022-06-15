import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyCcBog_w19kw9bHiydo5Zf0R8xRsQwzv_g",
  authDomain: "crud-b9ad7.firebaseapp.com",
  projectId: "crud-b9ad7",
  storageBucket: "crud-b9ad7.appspot.com",
  messagingSenderId: "402983361130",
  appId: "1:402983361130:web:e976d336d8dbe5b4d34813",
  measurementId: "G-NFZ97NX7GN"
};
firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase;
