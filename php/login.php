<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "ims_database");
if (mysqli_connect_error()) {
    echo mysqli_connect_error();
    exit();
} else {
    $eData = file_get_contents("php://input");
    $dData = json_decode($eData, true);

    $email = isset($dData['email']) ? $dData['email'] : "";
    $pass = isset($dData['pass']) ? $dData['pass'] : "";
    $result = "";

    if ($email !== "" && $pass !== "") {
        $sql = "SELECT * FROM emp WHERE email = '$email';";
        $res = mysqli_query($conn, $sql);

        if (mysqli_num_rows($res) !== 0) {
            $row = mysqli_fetch_array($res);
            if ($pass !== $row['pass']) {
                $result = "Invalid password!";
            } else {
                $result = "Logged in successfully! Redirecting...";
            }
        } else {
            $result = "Invalid username!";
        }
    } else {
        $result = "";
    }

    $conn->close();
    $response = array("result" => $result);
    echo json_encode($response);
}
?>
