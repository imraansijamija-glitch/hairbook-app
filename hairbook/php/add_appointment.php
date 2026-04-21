<?php
include 'db.php';

$user_id = $_POST['user_id'];
$service_id = $_POST['service_id'];
$appointment_date = $_POST['appointment_date'];
$appointment_time = $_POST['appointment_time'];

$sql = "INSERT INTO appointments (user_id, service_id, appointment_date, appointment_time)
        VALUES ('$user_id', '$service_id', '$appointment_date', '$appointment_time')";

if ($conn->query($sql) === TRUE) {
    echo "Termin uspješno rezervisan!";
} else {
    echo "Greška: " . $conn->error;
}

$conn->close();
?>