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

    if (!$user || !$pass) {
        echo json_encode(['success' => false, 'message' => 'Kullanıcı adı ve şifre zorunludur.']);
        exit;
    }

    // Kullanıcıyı al
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute(['username' => $user]);
    $dbUser = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($dbUser && password_verify($pass, $dbUser['password'])) {
        echo json_encode(['success' => true, 'message' => 'Giriş başarılı!', 'user' => $dbUser]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Kullanıcı adı veya şifre hatalı!']);
    }

} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Hata: ' . $e->getMessage()]);
}
?>
