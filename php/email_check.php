<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$con = new mysqli("localhost", "root", "", "ims_database");
if ($con->connect_errno) {
    echo $con->connect_errno;
    exit();
} else {
    $aData = file_get_contents("php://input");
    $dData = json_decode($aData, true);

    $email = isset($dData['email']) ? $dData['email'] : "";

    $result = "";

    if (!empty($email)) {
        $sql = "SELECT * FROM emp WHERE email='$email'";
        $res = $con->query($sql);

        if ($res && $res->num_rows > 0) {
            $result = "Email is already registered!";
        } else {
            $result = "";
        }
    } else {
        $result = "";
    }

    $con->close();
    $response = array("result" => $result);
    echo json_encode($response);
}
?>
