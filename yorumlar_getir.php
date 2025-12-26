<?php
header('Content-Type: application/json; charset=utf-8');

$servername = "localhost";
$username = "berke";
$password = "42Berke42_";
$dbname = "engelsizvefit";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->query("SELECT username, comment FROM comments ORDER BY created_at DESC");
    $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['success' => true, 'comments' => $comments]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Hata: ' . $e->getMessage()]);
}
?>
