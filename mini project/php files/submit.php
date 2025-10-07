<?php
$fullname = $_POST['fullname'];
$email = $_POST['email'];
$phoneno = $_POST['phoneno'];
$password = $_POST['password'];
$confirmpassword = $_POST['confirmpassword'];
$street = $_POST['street'];
$city = $_POST['city'];
$state = $_POST['state'];
$county= $_POST['country'];
$pincode= $_POST['pincode'];

$conn = new mysqli(hostname: 'localhost', username: 'root', password: '', database: 'custdetail');
if ($conn->connect_error) {
    die('Connection Failed: '.$conn->connect_error);
}
 else {
    $stmt = $conn->prepare("INSERT INTO registration (fullname, email, phoneno, password, confirmpassword, street, city, state, country, pincode)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssissssssi", $fullname, $email, $phoneno, $password, $confirmpassword, $street, $city, $state, $country, $pincode);
    $stmt->execute();
    echo " Registration completed successfully...╰(*°▽°*)╯ ";
    $stmt->close();
    $conn->close();
}
?>