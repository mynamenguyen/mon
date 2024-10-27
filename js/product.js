// Firebase Config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAsnli7xv_UEiXaykj-ckhUmkrGKhmqlBI",
  authDomain: "machine-learning-app-cbc58.firebaseapp.com",
  projectId: "machine-learning-app-cbc58",
  storageBucket: "machine-learning-app-cbc58.appspot.com",
  messagingSenderId: "33292707451",
  appId: "1:33292707451:web:fe9c3c4172c0dbae7e64de",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productCollection = collection(db, "products");

// Hàm hiển thị sản phẩm
async function displayProducts() {
  const productsDiv = document.getElementById("products");
  const querySnapshot = await getDocs(productCollection);

  querySnapshot.forEach((doc) => {
    const product = doc.data();

    // Tạo phần tử HTML cho từng sản phẩm
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="price">$${product.price}</div>
        `;

    productsDiv.appendChild(productCard);
  });
}

// Tải sản phẩm khi trang được load
displayProducts();
