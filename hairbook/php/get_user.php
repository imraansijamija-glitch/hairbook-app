<?php
include 'db.php';

$firebase_uid = $_GET['firebase_uid'];

$sql = "SELECT * FROM users WHERE firebase_uid = '$firebase_uid'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(null);
}
?>