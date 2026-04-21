<?php
include 'db.php';

$id = $_POST['id'];

$sql = "DELETE FROM appointments WHERE id = '$id'";

if ($conn->query($sql) === TRUE) {
    echo "Termin obrisan!";
} else {
    echo "Greška: " . $conn->error;
}

$conn->close();
?>