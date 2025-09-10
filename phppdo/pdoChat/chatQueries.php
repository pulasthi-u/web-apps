<?php
session_start();

$input = file_get_contents("php://input");

$connection = new PDO("mysql:host=localhost;dbname=chats;charset=utf8", "root", "");

$request = json_decode($input);
$whatToDo = $request->action;

if ($whatToDo == 'selectID') {
    $ID = "chat_" . $request->ID;
    $sql = "SELECT max(id) FROM chatlists";
    $query = $connection->query($sql);
    $result = $query->fetch(PDO::FETCH_ASSOC);
    $value = $result['max(id)'];
    if ($value >= $request->ID) {
        print '{"found":"yes"}';
        $_SESSION['database'] = $ID;
    } else {
        $newValue = $value + 1;
        $sql = "INSERT INTO chatlists (chatId) VALUES (" . $newValue . ")";
        $connection->exec($sql);
        $chatName = "chat_" . $newValue;
        $sql = "CREATE TABLE " . $chatName . " (msgId INT(15) NOT NULL AUTO_INCREMENT, sender VARCHAR(50), msg VARCHAR(500), PRIMARY KEY(msgId), UNIQUE(msgId))";
        $prep = $connection->prepare($sql);
        $prep->execute();
        print '{"found":"yes"}';
        $_SESSION['database'] = $chatName;
    }
    
} else if ($whatToDo == 'fetchMsgs') {
    $database = $_SESSION['database'];
    $sql = "SELECT * FROM " . $database;
    $qry = $connection->query($sql);
    $results = $qry->rowCount();
    if ($results > 0) {
        $sql = "SELECT max(msgId) FROM " . $database;
        $qry = $connection->query($sql);
        $res = $qry->fetch(PDO::FETCH_ASSOC);
        $max = $res['max(msgId)'];
        $init = $request->maximum;
        if ($max > 50) {
            if ($init >= 1) {
                $uppervalue = $max - $init;
            } else {
                $uppervalue = $max - 50;
            }
            for ($uppervalue; $uppervalue<$max; $uppervalue++) {
                $sql = "SELECT * FROM " . $database . " WHERE msgId = " . $uppervalue;
                $qry = $connection->query($sql);
                $res = $qry->fetch(PDO::FETCH_ASSOC);
                $sender = $res['sender'];
                $msg = $res['msg'];
                print '{"sender":"' . $sender . '", "msg":"' . $msg . '"}';
            }
        } else {
            if ($init !== $max) {
                $uplim = $init + 1;
                $space = ($max - $uplim) + 1;
                if ($space > 1) {
                    $sql = "SELECT * FROM " . $database . " WHERE msgId = " . $uplim;
                    $qry = $connection->query($sql);
                    $res = $qry->fetch(PDO::FETCH_ASSOC);
                    $sender = $res['sender'];
                    $msg = $res['msg'];
                    $json = '{"messages":[{"sender":"'.$sender.'", "message":"'.$msg.'"}';
                    for ($uplim = $uplim + 1; $uplim<($max+1); $uplim++) {
                        $sql = "SELECT * FROM " . $database . " WHERE msgId = " . $uplim;
                        $qry = $connection->query($sql);
                        $res = $qry->fetch(PDO::FETCH_ASSOC);
                        $sender = $res['sender'];
                        $msg = $res['msg'];
                        $json = $json . ', {"sender":"'.$sender.'", "message":"'.$msg.'"}';
                    }
                    $json = $json . '], "max":"'.$max.'"}';
                    print $json;
                } else if ($space == 1) {
                    $sql = "SELECT * FROM " . $database . " WHERE msgId = " . $uplim;
                    $qry = $connection->query($sql);
                    $res = $qry->fetch(PDO::FETCH_ASSOC);
                    $sender = $res['sender'];
                    $msg = $res['msg'];
                    print '{"messages":[{"sender":"'.$sender.'", "message":"'.$msg.'"}], "max":"'.$max.'"}';
                }
            }
        }
    }
} else if ($whatToDo == 'sendMsg') {
    $database = $_SESSION['database'];
    $msg = $request->msg;
    $sender = $_SESSION['username'];
    $sql = "INSERT INTO " . $database . " (sender, msg) VALUES (?, ?)";
    $prepare = $connection->prepare($sql);
    $prepare->execute(array($sender, $msg));
}

?>