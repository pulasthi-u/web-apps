<html>
	<?php
		$username = "root";
		$password = "";
		try {	
			$conn = new PDO("mysql:host=localhost;dbname=allowed", $username, $password);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			echo ("Connected");
			$sql = "CREATE DATABASE IF NOT EXISTS allowed";
			$conn->exec($sql);
			echo("<br>Heco");
			$table = "CREATE TABLE IF NOT EXISTS list (id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, fname VARCHAR(20), sname VARCHAR(20))";
			$conn->exec($table);
			echo("<br>TAble made");
    		echo "<br>New record created successfully";
			
			$select = "SELECT fname FROM list";
			$res = $conn->prepare($select);
			$res->execute();
			$res->setFetchMode(PDO::FETCH_ASSOC);
			$answer = $res->fetchAll();
			echo ("<br>" . $answer[0]['fname']);
		} catch(PDOException $e) {
			echo $e->getMessage();
		}
	$conn = null;
	?>
</html>