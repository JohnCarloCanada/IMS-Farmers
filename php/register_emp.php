<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$con = new mysqli("localhost", "root", "", "ims_database");
if (mysqli_connect_errno()) {
    echo mysqli_connect_errno();
    exit();
} else {
    $aData = file_get_contents("php://input");
    $dData = json_decode($aData, true);

    $firstname = isset($dData['firstname']) ? $dData['firstname'] : "";
    $lastname = isset($dData['lastname']) ? $dData['lastname'] : "";
    $email = isset($dData['email']) ? $dData['email'] : "";
    $contact = isset($dData['con_num']) ? $dData['con_num'] : "";
    $pass = isset($dData['pass']) ? $dData['pass'] : "";

    $result = "";

    if ($firstname !== "" && $email !== "" && $pass !== "") {
        $sql = "INSERT INTO emp(firstname, lastname, email, contact, pass) VALUES ('$firstname', '$lastname', '$email', '$contact', '$pass')";
        $res = mysqli_query($con, $sql);

        if ($res) {
            $result = "You have registered successfully";
        } else {
            $result = "You have not been registered";
        }
    }

    $con->close();
    $response = array("result" => $result);
    echo json_encode($response);
}
