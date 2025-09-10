<?php
$input = file_get_contents("php://input");
$split = explode('&', $input);
$id = explode('=', $split[0])[1];
print $id;
$connect = mysqli_connect('localhost', 'root', '', 'chats');
$sql = "SELECT max(id) FROM chatlists";
$qr = mysqli_query($connect, $sql);
$res = mysqli_fetch_assoc($qr)['max(id)'];
if ($res >= $id) {
    print "NOTHING";
} else {
$newTable = $res + 1;
$sql = "INSERT INTO chatlists (chatId) VALUES (" . $newTable . ")";
mysqli_query($connect, $sql);
$sql = "CREATE TABLE IF NOT EXISTS `" . $newTable . "` (id int(10) NOT NULL AUTO_INCREMENT, sender VARCHAR(50), msg VARCHAR(500), UNIQUE(id), PRIMARY KEY(id))";
$res = mysqli_query($connect, $sql);
}
?>