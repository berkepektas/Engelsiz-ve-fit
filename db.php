<?php
function getDbConnection() {
    $host = 'localhost';
    $db   = 'engelsizvefit';
    $user = 'berke';
    $pass = '42Berke42_';
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];

    try {
        return new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        die('Veritabanı bağlantı hatası: ' . $e->getMessage());
    }
}
?>
