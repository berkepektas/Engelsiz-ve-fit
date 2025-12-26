<?php
require_once 'db.php';

function get_disabilities($user_id) {
    $pdo = getDbConnection();

    $sql = "SELECT disability FROM user_disabilities WHERE user_id = :user_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':user_id' => $user_id]);
    $result = $stmt->fetchAll(PDO::FETCH_COLUMN);

    return $result; // Dizide sakatlık isimleri döner
}
?>
