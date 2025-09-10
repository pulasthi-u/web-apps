<?php
session_start();
$input = file_get_contents("php://input");
$split = explode('&', $input);
$ID = explode('=', $split[0])[1];

$connect = mysqli_connect('localhost', 'root', '', 'chats');

$sql = "SELECT max(id) FROM chatlists";
$res = mysqli_query($connect, $sql);
$result = mysqli_fetch_assoc($res)['max(id)'];

if ($ID <= $result) {
    $connectTo = "chat_" . $ID;
    $_SESSION['conTo'] = $connectTo;
} else {
    $new = $result + 1;
    $tabName = "chat_" . $new;
    $sql = "INSERT INTO chatlists(chatId) VALUES (" . $new . ")";
    mysqli_query($connect, $sql);
    $sql1 = "CREATE TABLE " . $tabName . " (msgId INT(15) NOT NULL AUTO_INCREMENT, sender VARCHAR(50), msg VARCHAR(500), UNIQUE(msgId), PRIMARY KEY(msgID))";
    mysqli_query($connect, $sql1);
    $_SESSION['conTo'] = $tabName;
}

?>