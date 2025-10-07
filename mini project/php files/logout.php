<?php
// Start the session
session_start();

// Check if a session exists before trying to destroy it
if (isset($_SESSION)) {
    // Clear all session variables
    session_unset();

    // Destroy the session
    session_destroy();

    // Redirect to the logout success page
    header("Location: logout-success.php");
    exit();
} else {
    // If no session is found, redirect to the homepage or login page
    header("Location: index.html");
    exit();
}
?>
