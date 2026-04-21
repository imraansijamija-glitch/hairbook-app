<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "hairbook";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Greška pri konekciji: " . $conn->connect_error);
}
?>