document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('giris-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const username = document.getElementById('GirisAdi').value;
      const password = document.getElementById('GirisSifresi').value;

      if (username && password) {
        fetch('login.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ username, password })
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Kullanıcı adı ve ID'yi sessionStorage'a kaydet
            sessionStorage.setItem('username', data.user.username);
            sessionStorage.setItem('userId', data.user.id);
            window.location.href = 'index2.html';
          } else {
            alert(data.message || 'Kullanıcı adı veya şifre hatalı!');
          }
        })
        .catch(() => alert('Sunucu hatası oluştu.'));
      } else {
        alert("Kullanıcı adı ve şifre boş olamaz.");
      }
    });
  }
});
