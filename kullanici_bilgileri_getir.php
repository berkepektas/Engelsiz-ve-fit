<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "berke", "42Berke42_", "engelsizvefit");
if ($conn->connect_error) {
  echo json_encode(["success" => false, "message" => "Veritabanı bağlantı hatası."]);
  exit;
}

$username = $_GET['username'];
$stmt = $conn->prepare("SELECT boy, kilo, yas, cinsiyet FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
  $row = $result->fetch_assoc();
  echo json_encode(["success" => true, "user" => $row]);
} else {
  echo json_encode(["success" => false, "message" => "Kullanıcı bulunamadı."]);
}
?>
