<?php
include 'db.php';

$user_id = $_GET['user_id'];

$sql = "SELECT appointments.*, services.service_name 
        FROM appointments 
        JOIN services ON appointments.service_id = services.id
        WHERE user_id = '$user_id'
        ORDER BY appointment_date DESC";

$result = $conn->query($sql);

$appointments = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $appointments[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($appointments);
?>