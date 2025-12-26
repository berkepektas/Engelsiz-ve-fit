<?php
header('Content-Type: application/json; charset=utf-8');

$servername = "localhost";
$username = "berke";
$password = "42Berke42_";
$dbname = "engelsizvefit";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $user = $_POST['username'] ?? '';
    $comment = $_POST['comment'] ?? '';

    if (!$comment) {
        echo json_encode(['success' => false, 'message' => 'Yorum boş olamaz']);
        exit;
    }

    if (!$user) {
        $user = "Anonim";
    }

    $stmt = $conn->prepare("INSERT INTO comments (username, comment) VALUES (:username, :comment)");
    $stmt->execute(['username' => $user, 'comment' => $comment]);

    echo json_encode(['success' => true, 'message' => 'Yorum kaydedildi']);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Hata: ' . $e->getMessage()]);
}
?>
