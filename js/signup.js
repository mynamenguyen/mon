import Toastify from "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify-es.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  doc,
  setDoc,
  getFirestore,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// nhap vao firebase
const firebaseConfig = {
  apiKey: "AIzaSyDuIrIeMCViBP9MBzpH4e-dIvM0giW_89o",
  authDomain: "monstore-4cc7f.firebaseapp.com",
  projectId: "monstore-4cc7f",
  storageBucket: "monstore-4cc7f.appspot.com",
  messagingSenderId: "677459163918",
  appId: "1:677459163918:web:17eec77addeeb346b0755f"
};
// 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const formSignUp = document.getElementById("form-signup");
const submitButton = document.getElementById("submit-btn");

formSignUp.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitButton.disabled = true;

  const loadingToast = Toastify({
    text: "Registering...",
    duration: -1,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "#333",
    stopOnFocus: true,
  }).showToast();

  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: firstName + " " + lastName,
    });

    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email,
    });

    loadingToast.hideToast();

    Toastify({
      text: "Register Successfully!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "#4CAF50",
      stopOnFocus: true,
    }).showToast();

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 3000);
  } catch (error) {
    loadingToast.hideToast();

    Toastify({
      text: "Error: " + error.message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "#f44336",
      stopOnFocus: true,
    }).showToast();
  } finally {
    submitButton.disabled = false;
  }
});

// Đăng ký: lấy thông tin từ form --> tạo user mới --> lưu vào firestore --> thông báo
