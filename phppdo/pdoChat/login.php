<?php
session_start();
if (isset($_POST['done'])) {
    $user = $_POST['username'];
    $pass = $_POST['pass'];
    $connection = new PDO("mysql:host=localhost;dbname=users;charset=utf8", "root", "");
    $sql = "SELECT * FROM Students WHERE Username=:user AND Password=:pass";
    $prepare = $connection->prepare($sql);
    $prepare->execute(array(
        ":user" => $user,
        ":pass" => $pass
    ));
    $results = $prepare->rowCount();
    if ($results) {
        $_SESSION['username'] = $user;
        header("Location: chatID.php");
    } else {
        print "ERROR";
    }
}
?>

<!doctype html>
<html>
    <body>
        <form method = "POST" action = "login.php">
            <input type = "text" name = "username" placeholder = "USERNAME">
            <input type = "password" name = "pass" placeholder = "PASSWORD">
            <input type = "submit" value = "LOGIN" name = "done">
        </form>
    </body>
</html>