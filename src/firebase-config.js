import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


//Todo fix with environment varaibles


const firebaseConfig = {
    apiKey: "AIzaSyBoKaBKWe9x2LS_n5AHCIEM-5AB_dC99mg",
    authDomain: "reactmovieapp-21f80.firebaseapp.com",
    projectId: "reactmovieapp-21f80",
    storageBucket: "reactmovieapp-21f80.appspot.com",
    messagingSenderId: "836568668867",
    appId: "1:836568668867:web:ee1f2ce7e589f59fa3a076",
    // eslint-disable-next-line no-template-curly-in-string
    measurementId: "${config.measurementId}"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
