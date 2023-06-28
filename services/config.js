import { firestore } from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDqjOjrWAvLkMSS0DaWEyTnNNwwk7VdIjs",
    authDomain: "colorfulltodo.firebaseapp.com",
    projectId: "colorfulltodo",
    storageBucket: "colorfulltodo.appspot.com",
    messagingSenderId: "242887839869",
    appId: "1:242887839869:web:a59fa16ef3c15dd1a36114",
  };
  firebase.initializeApp(firebaseConfig);
  const projectStorage = firebase.storage();
  const projectFirestore = firebase/firestore();

  export{ projectStorage, projectFirestore};