<?php
header('Content-Type: application/json; charset=utf-8');

$servername = "localhost";
$username = "berke";
$password = "42Berke42_";
$dbname = "engelsizvefit";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $userId = $_POST['userId'] ?? '';
    $username = $_POST['username'] ?? '';
    $boy = $_POST['boy'] ?? '';
    $kilo = $_POST['kilo'] ?? '';
    $yas = $_POST['yas'] ?? '';

    if (!$userId) {
        echo json_encode(['success' => false, 'message' => 'Kullanıcı ID gerekli']);
        exit;
    }

    $stmt = $conn->prepare("UPDATE users SET username = :username, boy = :boy, kilo = :kilo, yas = :yas WHERE id = :id");
    $stmt->execute([
        'username' => $username,
        'boy' => $boy,
        'kilo' => $kilo,
        'yas' => $yas,
        'id' => $userId
    ]);

    echo json_encode(['success' => true, 'message' => 'Bilgiler güncellendi']);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Hata: ' . $e->getMessage()]);
}
?>
