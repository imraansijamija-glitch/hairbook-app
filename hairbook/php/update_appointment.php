<?php
include 'db.php';

$id = $_POST['id'];
$appointment_date = $_POST['appointment_date'];
$appointment_time = $_POST['appointment_time'];

$sql = "UPDATE appointments 
        SET appointment_date='$appointment_date', appointment_time='$appointment_time'
        WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    echo "Termin uspješno izmijenjen!";
} else {
    echo "Greška: " . $conn->error;
}

$conn->close();
?>