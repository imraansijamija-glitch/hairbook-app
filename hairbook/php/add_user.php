<?php
include 'db.php';

$firebase_uid = $_POST['firebase_uid'];
$full_name = $_POST['full_name'];
$email = $_POST['email'];

$sql = "INSERT INTO users (firebase_uid, full_name, email) 
        VALUES ('$firebase_uid', '$full_name', '$email')";

if ($conn->query($sql) === TRUE) {
    echo "OK";
} else {
    echo "ERROR";
}
?>