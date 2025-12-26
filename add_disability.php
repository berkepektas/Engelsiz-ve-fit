<?php
require_once 'db.php';

function add_disability($user_id, $disability) {
    $pdo = getDbConnection();

    // Örnek tablo: user_disabilities (user_id INT, disability VARCHAR)
    $sql = "INSERT INTO user_disabilities (user_id, disability) VALUES (:user_id, :disability)";
    $stmt = $pdo->prepare($sql);

    try {
        $stmt->execute([
            ':user_id' => $user_id,
            ':disability' => $disability
        ]);
        return true;
    } catch (PDOException $e) {
        return false;
    }
}
?>
