document.addEventListener("DOMContentLoaded", () => { 
    const handleSignOut = () => { 
      signOut(auth); 
      localStorage.removeItem("displayName"); 
      window.location.href = './signin.html'; // Điều hướng về trang đăng nhập sau khi đăng xuất
    };
  
    onAuthStateChanged(auth, (user) => { 
      const inforElement = document.getElementById("information"); 
      const signin_icon = document.getElementById("signin_icon"); 
      const displayName = localStorage.getItem("displayName");
      console.log(displayName);
  
      if (user || displayName) { 
        inforElement.innerHTML = ` 
          <div>
              
            <span id="displayNameokok">${displayName || user.displayName || "User"}</span>
            <button id='buttonSignOut'>Sign out</button>
          </div>
        `; 
        signin_icon.style.display = 'none'; // Ẩn icon sign-in
        const buttonSignOut = document.getElementById("buttonSignOut"); 
        buttonSignOut.addEventListener("click", handleSignOut); 
      } else { 
        inforElement.innerHTML = ``;
        signin_icon.style.display = 'block'; // Hiển thị icon sign-in
      } 
    });
  });