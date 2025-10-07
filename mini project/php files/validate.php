<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "custdetail";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$email = $_POST['email'];
$password = $_POST['password'];


$stmt = $conn->prepare("SELECT * FROM registration WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
   
    $user = $result->fetch_assoc();
   
    if (password_verify($password, $user['password'])) {
        echo "Login successful. Welcome " . $user['fullname'] . "!";
    } else {
        echo "Invalid password.";
    }
} else {
    echo "No user found with this email.";
}

$stmt->close();
$conn->close();
?>

