
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDoekpzO2dDvu7_HCf218sJv4Iv9e7hCGs",
    authDomain: "paisekahisab-33.firebaseapp.com",
    projectId: "paisekahisab-33",
    storageBucket: "paisekahisab-33.appspot.com",
    messagingSenderId: "970698650805",
    appId: "1:970698650805:web:b272a0ab98da84a7523afc"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en"
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-sign");
googleLogin.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
      window.location.href = "./dist/home.html";
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
})
const googleLogin1 = document.getElementById("github");
googleLogin1.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
      window.location.href = "../dist/index2.html";
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })

})
