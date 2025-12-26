<?php
header('Content-Type: application/json; charset=utf-8');

$servername = "localhost";
$username = "berke";
$password = "42Berke42_";
$dbname = "engelsizvefit";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // POST ile gelen veriler
    $user = $_POST['username'] ?? '';
    $pass = $_POST['password'] ?? '';
    $yas = $_POST['yas'] ?? '';
    $boy = $_POST['boy'] ?? '';
    $kilo = $_POST['kilo'] ?? '';
    $cinsiyet = $_POST['cinsiyet'] ?? '';

    if (!$user || !$pass) {
        echo json_encode(['success' => false, 'message' => 'Kullanıcı adı ve şifre zorunludur.']);
        exit;
    }

    // Kullanıcı var mı kontrol et
    $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = :username");
    $stmt->execute(['username' => $user]);
    if ($stmt->fetchColumn() > 0) {
        echo json_encode(['success' => false, 'message' => 'Bu kullanıcı adı zaten alınmış!']);
        exit;
    }

    // Kullanıcı ekle
    $stmt = $conn->prepare("INSERT INTO users (username, password, yas, boy, kilo, cinsiyet) VALUES (:username, :password, :yas, :boy, :kilo, :cinsiyet)");
    $stmt->execute([
        'username' => $user,
        'password' => password_hash($pass, PASSWORD_DEFAULT), // Şifreyi güvenli hash ile sakla
        'yas' => $yas,
        'boy' => $boy,
        'kilo' => $kilo,
        'cinsiyet' => $cinsiyet
    ]);

    echo json_encode(['success' => true, 'message' => 'Kayıt başarılı!']);

} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Hata: ' . $e->getMessage()]);
}
?>
