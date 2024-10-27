// Cấu hình Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDuIrIeMCViBP9MBzpH4e-dIvM0giW_89o",
  authDomain: "monstore-4cc7f.firebaseapp.com",
  projectId: "monstore-4cc7f",
  storageBucket: "monstore-4cc7f.appspot.com",
  messagingSenderId: "677459163918",
  appId: "1:677459163918:web:17eec77addeeb346b0755f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productCollection = collection(db, "products");

// Gắn sự kiện cho nút 'saveProductButton'
document
  .getElementById("saveProductButton")
  .addEventListener("click", saveProduct);

// Hàm Lưu Sản phẩm
async function saveProduct() {
  const imageUrl = document.getElementById("productImageURL").value;
  const name = document.getElementById("productName").value;
  const description = document.getElementById("productDescription").value;
  const price = parseFloat(document.getElementById("productPrice").value);
  const quantity = parseInt(document.getElementById("productQuantity").value);
  const rating = parseFloat(document.getElementById("productRating").value);

  if (
    !imageUrl ||
    !name ||
    !description ||
    !price ||
    !quantity ||
    isNaN(rating)
  ) {
    alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
    return;
  }

  await addDoc(productCollection, {
    imageUrl,
    name,
    description,
    price,
    quantity,
    rating,
  });
  loadProducts();
  clearForm();
}

// Hàm Xóa sản phẩm
async function deleteProduct(id) {
  await deleteDoc(doc(db, "products", id));
  loadProducts();
}

// Hàm Sửa sản phẩm
async function editProduct(id) {
  const productDoc = await getDoc(doc(db, "products", id));
  const product = productDoc.data();

  document.getElementById("productImageURL").value = product.imageUrl;
  document.getElementById("productName").value = product.name;
  document.getElementById("productDescription").value = product.description;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productQuantity").value = product.quantity;
  document.getElementById("productRating").value = product.rating;

  // Cập nhật nút lưu thành nút sửa với sự kiện cập nhật
  document.getElementById("saveProductButton").onclick = async () => {
    await updateDoc(doc(db, "products", id), {
      imageUrl: document.getElementById("productImageURL").value,
      name: document.getElementById("productName").value,
      description: document.getElementById("productDescription").value,
      price: parseFloat(document.getElementById("productPrice").value),
      quantity: parseInt(document.getElementById("productQuantity").value),
      rating: parseFloat(document.getElementById("productRating").value),
    });
    loadProducts();
    clearForm();
  };
}

// Lấy danh sách sản phẩm và gán sự kiện cho nút chỉnh sửa và xóa
async function loadProducts() {
  const querySnapshot = await getDocs(productCollection);
  let productsHtml = "";
  querySnapshot.forEach((doc) => {
    const product = doc.data();
    productsHtml += `
      <tr>
        <td><img src="${product.imageUrl}" alt="${product.name}" width="50"></td>
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td>${product.rating}</td>
        <td>
          <button class="editButton" data-id="${doc.id}">Sửa</button>
          <button class="deleteButton" data-id="${doc.id}">Xóa</button>
        </td>
      </tr>
    `;
  });
  document.getElementById("productList").innerHTML = productsHtml;

  // Gắn sự kiện cho các nút sửa và xóa
  document.querySelectorAll(".editButton").forEach((button) => {
    button.addEventListener("click", () =>
      editProduct(button.getAttribute("data-id"))
    );
  });
  document.querySelectorAll(".deleteButton").forEach((button) => {
    button.addEventListener("click", () =>
      deleteProduct(button.getAttribute("data-id"))
    );
  });
}

// Hàm xóa nội dung form
function clearForm() {
  document.getElementById("productImageURL").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("productDescription").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productQuantity").value = "";
  document.getElementById("productRating").value = "";
}

// Tải sản phẩm khi trang load
loadProducts();
