document.addEventListener("DOMContentLoaded", () => {
    const username = sessionStorage.getItem('username');

    if (!username) {
        alert("Giriş yapmadığınız için yönlendiriliyorsunuz.");
        window.location.href = 'index.html';
        return;
    } 

    // Hoş geldin mesajı
    const welcomeEl = document.getElementById('welcome');
    if (welcomeEl) welcomeEl.innerText = `Hoş geldin`;

    // Kullanıcı bilgilerini API'den çek ve göster
    fetch(`https://engelsizvefit.info/kullanici_bilgileri_getir.php?username=${encodeURIComponent(username)}`)
        .then(res => res.json())
        .then(data => {
            console.log("API response:", data);
            if (data.success && data.user) {
                const { boy, kilo, yas, cinsiyet } = data.user;

                // Eksik veri kontrolü
                if ([boy, kilo, yas, cinsiyet].some(v => v === undefined || v === null)) {
                    console.error("Eksik kullanıcı verisi:", { boy, kilo, yas, cinsiyet });
                    alert("Kullanıcı verileri eksik, lütfen profilinizi güncelleyin.");
                    return;
                }

                const userInfoDiv = document.getElementById('userInfo');
                if (userInfoDiv) {
                    userInfoDiv.innerHTML = `<p>Boy: ${boy} cm     Kilo: ${kilo} kg     Yaş: ${yas}</p> `;
                       
                   
                }

                // Kalori hesaplama
                let bmr;
                if (cinsiyet.toLowerCase() === "erkek") {
                    bmr = 10 * kilo + 6.25 * boy - 5 * yas + 5;
                } else {
                    bmr = 10 * kilo + 6.25 * boy - 5 * yas - 161;
                }
                const sonucDiv = document.getElementById("kaloriSonucu");
                if (sonucDiv) {
                    sonucDiv.innerText = `Günlük tahmini kalori ihtiyacınız: ${Math.round(bmr)} kcal`;
                }
            } else {
                console.warn("Kullanıcı bilgileri alınamadı veya veri eksik.");
                alert("Kullanıcı bilgileri alınamadı!");
            }
        })
        .catch(e => {
            console.error("Veri alınırken hata oluştu:", e);
            alert("Veri alınırken hata oluştu. Lütfen tekrar deneyin.");
        });

    // Kullanıcı adı başka yerde gösterilecekse
    const spanKullaniciAdi = document.getElementById('kullaniciAdi');
    if (spanKullaniciAdi) spanKullaniciAdi.textContent = username;
});

/* Sakatlık butonlarının çalışması için */
const buton = document.querySelectorAll('.btn2');
const kutular = document.querySelectorAll('.box-container > div');
const siniflar= new Set();

buton.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.id;
        let className = '';
        switch (id) {
            case 'gögüs':
                className = 'Gogus';
                break;
            case 'omuz':
                className = 'Omuz';
                break;
            case 'solkol':
                className = 'Kol';
                break;
            case 'karin':
                className = 'Karin';
                break;
            case 'sirt':
                className = 'Sirt';
                break;
            case 'solbacak':
                className = 'Bacak';
                break;
            default:
                return;
        }
        if (siniflar.has(className)) {
            siniflar.delete(className);
        } else {
            siniflar.add(className);
        }
        kutular.forEach(box => {
            let shouldHide = false;
            siniflar.forEach(cls => {
                if (box.classList.contains(cls)) {
                    shouldHide = true;
                }
            });
            box.style.display = shouldHide ? 'none' : 'block';
        });
    });
});

/* Bilgi kutuları göster/gizle */
const hastalikButonlari = [
    { buttonId: 'kassinir-btn', boxId: 'kassinir' },
    { buttonId: 'nörolojik-btn', boxId: 'nörolojik' },
    { buttonId: 'iskelet-btn', boxId: 'iskelet' }
];
hastalikButonlari.forEach(({ buttonId, boxId }) => {
    const button = document.getElementById(buttonId);
    const box = document.getElementById(boxId);
    if (button && box) {
        button.addEventListener('click', () => {
            const currentlyHidden = box.style.display === 'none' || box.style.display === '';
            box.style.display = currentlyHidden ? 'block' : 'none';
            if (currentlyHidden) {
                box.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

/* Hover sınıfı toggle */
document.querySelectorAll('.btn2').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('hovered');
    });
});

/* Menü butonu */
const menuBtn = document.getElementById('menu-btn');
const navbar = document.querySelector('.navbar');
if(menuBtn && navbar) {
    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
}

/* Düzenle modal açma-kapama */
function openEditModal() {
    const modal = document.getElementById("editModal");
    const isVisible = window.getComputedStyle(modal).display !== "none";
    modal.style.display = isVisible ? "none" : "block";
}

/* Kullanıcı bilgisi güncelleme */
function updateUserInfo() {
    const newUsername = document.getElementById("newUsername").value.trim();
    const newBoy = document.getElementById("newBoy").value.trim();
    const newKilo = document.getElementById("newKilo").value.trim();
    const newYas = document.getElementById("newYas").value.trim();

    const userId = sessionStorage.getItem("userId");
    if (!userId) {
        alert("Kullanıcı ID bulunamadı!");
        return;
    }

    const formData = new URLSearchParams({
        username: newUsername,
        boy: newBoy,
        kilo: newKilo,
        yas: newYas,
        userId: userId
    });

    fetch('update_user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Bilgiler güncellendi!");
            document.getElementById("editModal").style.display = "none";
            // Güncel bilgileri tekrar çekmek istersen buraya ekleyebilirsin
        } else {
            alert(data.message || "Güncelleme başarısız.");
        }
    })
    .catch(() => {
        alert("Sunucu hatası oluştu.");
    });
}
