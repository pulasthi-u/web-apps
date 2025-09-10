<?php
session_start();
$input = file_get_contents("php://input");
print_r($input);
# get rid of the & to split the input. The user might use &s in his chat message text as well. Use somthing that is very unlikely to be used.

//$input = "conTo=chat_2&msg=Hello how are you? Im doing well. What about you?&sender=SilverSoldier";
$split = explode('&', $input);
$conTo = explode('=', $split[0])[1];
if ($conTo == "") {
    $conTo = $_SESSION['conTo'];
}

$connect = mysqli_connect('localhost', 'root', '', 'chats');
$sql = "SELECT * FROM " . $conTo;
$res = mysqli_num_rows(mysqli_query($connect, $sql));
if ($res) {
    $maxSQL = "SELECT max(msgId) FROM " . $conTo;
    $max = mysqli_fetch_assoc(mysqli_query($connect, $maxSQL))['max(msgId)'];
    $givenMax = explode('=', $split[1])[1];
    print $givenMax;
} else {
    $message = explode('=', $split[1])[1];
    $sender = explode('=', $split[2])[1];
    if ($message !== "") {
        $sql = "INSERT INTO " . $conTo . " (sender, msg) VALUES ('" . $sender . "', '" . $message . "')";
        mysqli_query($connect, $sql);
    }
}
?>