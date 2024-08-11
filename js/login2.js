
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

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


const user = auth.currentUser;

function updateUserProfile(user) {
    const userName = user.displayName;
    // const userEmail = user.email;
    const userProfilePicture = user.photoURL;
    // const userProfilePicture1 = user.photoURL;

    document.getElementById("userName").textContent = userName;
    // document.getElementById("userEmail").textContent = userEmail;
    document.getElementById("userProfilePicture").src = userProfilePicture;
    // document.getElementById("userProfilePicture1").src = userProfilePicture1;
}
onAuthStateChanged(auth, (user) => {
    if (user) {
        updateUserProfile(user);
        const uid = user.uid;
        return uid;
    }
    else {
        alert("Create Account first & login");
        window.location.href = "index.html";
    }
})
// updateUserProfile()
auth.onAuthStateChanged((user) => {
    if (!user) {
      // If not authenticated, redirect to login
      window.location.href = '../index.html';
    }
  });
  