import dotenv from 'dotenv';
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

dotenv.config(
    {
        path: '../.env'
    }
)

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
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
    const userEmail = user.email;
    const userProfilePicture = user.photoURL;
    // const userProfilePicture1 = user.photoURL;

    document.getElementById("userName").textContent = userName;
    document.getElementById("userEmail").textContent = userEmail;
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
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = '../index.html'; // Redirect to login page or home page
    }).catch((error) => {
        // An error happened.
        console.error('Logout Error:', error.message);
        alert('Error logging out. Please try again.');
    });
});