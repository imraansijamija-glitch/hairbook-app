import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBFoolYWTMi380l_lBFKibYPPwdxgUgLWo",
  authDomain: "hairbook-c4b2c.firebaseapp.com",
  projectId: "hairbook-c4b2c",
  storageBucket: "hairbook-c4b2c.firebasestorage.app",
  messagingSenderId: "376635961884",
  appId: "1:376635961884:web:2ca9249da3eb111cb665d9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// GLOBAL USER ID (za app.js)
window.currentUserId = null;

// REGISTER
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebase_uid = userCredential.user.uid;

      await fetch("php/add_user.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `firebase_uid=${encodeURIComponent(firebase_uid)}&full_name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}`
      });

      alert("Registracija uspješna!");
      window.location.href = "login.html";
    } catch (error) {
      alert("Greška: " + error.message);
    }
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Prijava uspješna!");
      window.location.href = "dashboard.html";
    } catch (error) {
      alert("Greška: " + error.message);
    }
  });
}

// 🔥 NAJVAŽNIJE — DOHVAT USERA
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const firebase_uid = user.uid;

    try {
      const response = await fetch("php/get_user.php?firebase_uid=" + firebase_uid);
      const data = await response.json();

      if (data && data.id) {
        window.currentUserId = data.id;
        console.log("User ID:", window.currentUserId);
      }
    } catch (error) {
      console.error("Greška pri dohvaćanju usera");
    }
  } else {
    if (window.location.pathname.includes("dashboard")) {
      window.location.href = "login.html";
    }
  }
});