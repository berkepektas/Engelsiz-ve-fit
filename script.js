document.addEventListener("DOMContentLoaded", function () {
    // Menü butonu
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.querySelector('.navbar');

    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });

        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
            });
        });
    }

    // Sosyal medya ikonları yeni sekmede aç
    document.querySelectorAll('.footer .share a').forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.preventDefault();
            const link = icon.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank');
            }
        });
    });

    // Giriş kutusunu aç-kapat
    const girisBtn = document.getElementById('giris-btn');
    const cartContainer = document.querySelector('.header .cart-items-container');
    if (girisBtn && cartContainer) {
        girisBtn.addEventListener('click', function () {
            cartContainer.classList.toggle('active');
        });
    }

    // "Bunları da okumalısın" kutuları
    const ogrenBtns = document.querySelectorAll('.btn');
    const dahafazlaKutu = document.querySelectorAll('.dahafazla .content');

    ogrenBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const targetClass = btn.getAttribute('data-target');
            const targetKutu = Array.from(dahafazlaKutu).find(kutu => kutu.classList.contains(targetClass));
            if (!targetKutu) return;
            const isActive = targetKutu.classList.contains('active');
            dahafazlaKutu.forEach(kutu => kutu.classList.remove('active'));
            if (!isActive) {
                targetKutu.classList.add('active');
                targetKutu.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Form geçişleri
    const girisForm = document.getElementById("giris-form");
    const kayitForm = document.getElementById("kayit-form");
    const girisLink = document.getElementById("giris-link");
    const kayitLink = document.getElementById("kayit-link");

    if (girisLink) {
        girisLink.addEventListener("click", function (e) {
            e.preventDefault();
            girisForm.style.display = "none";
            kayitForm.style.display = "block";
        });
    }

    if (kayitLink) {
        kayitLink.addEventListener("click", function (e) {
            e.preventDefault();
            kayitForm.style.display = "none";
            girisForm.style.display = "block";
        });
    }

    // Kayıt olma
    if (kayitForm) {
        kayitForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const kullaniciAdi = document.getElementById('KayitAdi').value;
            const sifre = document.getElementById('KayitSifresi').value;
            const yas = document.getElementById('KayitYas').value;
            const boy = document.getElementById('KayitBoy').value;
            const kilo = document.getElementById('KayitKilo').value;
            const cinsiyet = document.querySelector('input[name="cinsiyet"]:checked').value;

            fetch('register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    username: kullaniciAdi,
                    password: sifre,
                    yas,
                    boy,
                    kilo,
                    cinsiyet
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("Üyelik başarıyla oluşturuldu!");
                    kayitForm.reset();
                    kayitForm.style.display = "none";
                    girisForm.style.display = "block";
                } else {
                    alert(data.message || "Bir hata oluştu.");
                }
            })
            .catch(() => alert("Sunucu hatası oluştu."));
        });
    }

    // Giriş yapma
    if (girisForm) {
        girisForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const kullaniciAdi = document.getElementById("GirisAdi").value;
            const sifre = document.getElementById("GirisSifresi").value;

            if (!kullaniciAdi || !sifre) {
                alert("Kullanıcı adı veya şifre boş bırakılamaz.");
                return;
            }

            fetch("login.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    username: kullaniciAdi,
                    password: sifre
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    sessionStorage.setItem("username", kullaniciAdi);
                    alert("Giriş başarılı!");
                    window.location.href = "index2.html";
                } else {
                    alert(data.message || "Kullanıcı adı veya şifre hatalı!");
                }
            })
            .catch(() => alert("Sunucu hatası oluştu."));
        });
    }

    // Yorumları getir
    fetch('yorumlar_getir.php')
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const yorumlarKutusu = document.getElementById('yorumlarKutusu');
                yorumlarKutusu.innerHTML = '';
                data.comments.forEach(c => {
                    const kutu = document.createElement('div');
                    kutu.className = 'box';
                    kutu.innerHTML = `<p>${c.comment}</p><h3>${c.username}</h3>`;
                    yorumlarKutusu.appendChild(kutu);
                });
            }
        });
});

// Yorum ekle fonksiyonu
function yorumEkle() {
    const yorum = document.getElementById("yorumMetni").value.trim();
    let ad = document.getElementById("yorumYapan").value.trim();
    if (!yorum) {
        alert("Yorum boş olamaz!");
        return;
    }
    if (!ad) ad = "Anonim";

    fetch('yorum_ekle.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username: ad, comment: yorum })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert('Yorum başarıyla eklendi!');
            const yorumlarKutusu = document.getElementById('yorumlarKutusu');
            const yeniKutu = document.createElement('div');
            yeniKutu.className = 'box';
            yeniKutu.innerHTML = `<p>${yorum}</p><h3>${ad}</h3>`;
            yorumlarKutusu.prepend(yeniKutu);
            document.getElementById("yorumMetni").value = "";
            document.getElementById("yorumYapan").value = "";
        } else {
            alert(data.message || "Yorum eklenirken hata oluştu.");
        }
    })
    .catch(() => alert("Sunucu hatası oluştu."));
}
