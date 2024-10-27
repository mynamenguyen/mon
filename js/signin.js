import Toastify from "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify-es.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDuIrIeMCViBP9MBzpH4e-dIvM0giW_89o",
  authDomain: "monstore-4cc7f.firebaseapp.com",
  projectId: "monstore-4cc7f",
  storageBucket: "monstore-4cc7f.appspot.com",
  messagingSenderId: "677459163918",
  appId: "1:677459163918:web:17eec77addeeb346b0755f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const formSignIn = document.getElementById("form-signin");
const submitButton = document.getElementById("submit-btn");

formSignIn.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Disable the submit button
  submitButton.disabled = true;

  const loadingToast = Toastify({
    text: "Signing in...",
    duration: -1, // Duration -1 means it will not automatically close
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    backgroundColor: "#333",
    stopOnFocus: true, // Prevents dismissing of toast on hover
  }).showToast();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("🚀 ~ formSignIn.addEventListener ~ user:", user)

    localStorage.setItem("displayName", user.displayName);

    loadingToast.hideToast();

    Toastify({
      text: "Sign In Successfully!",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      backgroundColor: "#4CAF50",
      stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();

    // Wait 3 seconds before redirecting
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 3000);
  } catch (error) {
    loadingToast.hideToast();

    Toastify({
      text: "Error: " + error.message,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      backgroundColor: "#f44336",
      stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
  } finally {
    // Enable the submit button
    submitButton.disabled = false;
  }
});

// Đăng nhập: lấy thông tin từ form --> signInWithEmailAndPassword --> localstorage --> Đăng nhập thành công