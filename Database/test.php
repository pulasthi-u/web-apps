<html>
<?php
    $name = "Initiated";
    echo ($name);
    $server = "localhost";
    $username = "root";
    $pass = "";
    echo("<br>");
    $con = mysqli_connect($server, $username, $pass, 'myDB');
    if (!$con) {
        echo("Error");
    } else {
        echo("Successful");
    }
    if (isset($_POST["submit"])) {
        echo ("Pressed");
        $fname = $_POST['fname'];
        $lname = $_POST['lname'];
        $sql = "SELECT * FROM users WHERE fname = '".$fname."' AND lname = '".$lname."'";
        $res = mysqli_query($con, $sql);
        echo ($res);
    }
?>
    <form name = "f" id = "f" method = "post" action = "<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>">
        <input type = "text" name = "fname" id = "fname" placeholder = "fname">
        <input type = "text" name = "lname" id = "lname" placeholder = "lname">
        <input type = "submit" name = "submit" id = "submit" value = "submit">
    </form>
</html>