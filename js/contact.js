document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Google Sheets API URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyDWF68qhEdwV6KXnTpXzyPGjlbrV2QabXuBrXqOnOGxRC24jxp5Y_gRVJLhRqSmRvD/exec'
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
  
    fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' })
      .then(response => {
        document.getElementById('statusMessage').textContent = 'Message sent successfully!';
        document.getElementById('contactForm').reset();
      })
      .catch(error => {
        document.getElementById('statusMessage').textContent = 'Error sending message.';
        console.error('Error!', error.message);
      });
  });