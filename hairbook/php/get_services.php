<?php
include 'db.php';

$sql = "SELECT * FROM services ORDER BY id DESC";
$result = $conn->query($sql);

$services = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $services[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($services);
?>