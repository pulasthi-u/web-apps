<?php 

$connection = new PDO("mysql:host=localhost;dbname=users;charset=utf8", "root", "");
$sql = "SELECT * FROM Students WHERE FirstName = 'Pulasthi'";

// ->query is used when what is queried returns something useful. eg: SELECT statements, which return the rows that are specified by the WHERE clause. To be able to access these, u must use ->query

// ->exec is used when what is queried or executed does not return anything. eg: INSERT statements, which only insert some values to a table, but doesn't return anything. However, if u look into what is returned by an ->exec; that'll be the number of rows affected by what is specified.

?>

<b>html content</b>

<?php

$result = $connection->query($sql);
$resu = $result->fetch(PDO::FETCH_ASSOC);
print $resu['Username'];
print "<BR>";
print $result->rowCount();

// the following is important when it comes to security

$sql = "SELECT * FROM Students WHERE Username = ? AND Password = ?";

// formulate a string with '?' in the place of the parameter values of the WHERE clause.

$prepared = $connection->prepare($sql);

// execute the SQL by using ->prepare on the connection var. IMPORTANT: use ->prepare();

// using prepare, that query will be sent to the server first; just the query. Its like creating a structure for the actual query to be executed on.

/*
Its like this; imagine you have a storehouse that can be entered by three doors. One door is called "password", another is "username", and the other is "indexnumber". Inside each room, that each door leads to, are cards storing values respective to what the doors are called. Each card is 'linked' to each other; in a manner that cell values are 'linked' to each other forming a row/record.

There is a person in charge of the storehouse, and is the only one who can go inside. But he is unitelligent, and blindly follows whatever instructions that are given to him by a person. Let's call him John.

There is also a building nearby, that you can only enter, if your username and password are stored in the storehouse.

A person called Jack comes, and gives his username and password to John. Jack says "select any cards where the username is JackSmith and the password is jacksPass".

John blindly goes inside the door "username" and looks for a card saying JackSmith. He finds it. Then he goes inside "password" and looks for a card saying "jacksPass", and finds that too. Now that John has found out both cards exist (both having a 'link', of course; John is intelligent enough to figure that out), he knows that Jack is a valid member and allow him to enter that building.

Now, another person, Mary, comes along. Mary asks John, "select any cards where username is jasn or 1=1 and password is knsd or 1=1". This is a cunning request.

John blindly goes into the username door and looks for a card with jasn. He cant find any. But Mary had said 'username is jasn OR 1=1'. Now that John hasnt found username jasn, he checks the other condition. 1=1. Is that true? yes. So the first condition she specified has evaluated to true. John does the same with the password, and that too evaluates to true because she has said "1=1" there too. Now that both conditions are true, John gives access to Mary to proceed.

She has fooled John into thinking that she is a member. this is sql injection.

However suppose that a new way is introduced to look for cards. Here, before the actual person comes to ask John, another officer called "Charles", comes to meet John.

Suppose that a person called Bill wants to log into his account. He has to first tell Charles what he wants to do. When Bill says that he wants to log into his account, Charles thinks of what he should do. If a user wants to log into his account, the doors "username" and "password" have to be entered. Once they are entered, the values that the user specify have to be looked for inside these doors.

Now, charles goes and tells John, "be prepared to enter the doors username and password, and be prepared to look for the values that i ask you to look for". John is now ready.

Charles asks Bill for the first value. Bill says "uadskodja". charles says that to John. John goes inside and looks for a card saying "uadskodja". He couldnt find any. The same happens with the password. Now Bill cannot pass.

Suppose that when Charles asks Bill for the first value, Bill says "jaja or 1=1". Now when charles says that to John, John looks for a card where the exact value "jaja or 1=1" is written. John wont find any. Bill cant fool John into thinking so by specifying a condition that always evaluates to true, such as 1=1. John in this case checks not for the condition, but for *the* exact words that Bill says.

This is how prepare works. Charles here is similar to ->prepare();
*/

$prepared->execute(array("SilverSoldier", "pulasthi"));

// execute the prepared sql using ->execute. Within the parentheses of execute, specify an array containing the relevant values which should replace the '?'s of the prepared SQL, in the respective order that they are specified in the SQL.

$results = $prepared->fetch(PDO::FETCH_ASSOC);

// use ->fetch() or ->fetchAll() with the way in which you want to fetch specified within the parantheses. I'd rather u use fetch().

print "<BR>";
print_r($results);

print "<BR>";

print "SUCCESS!";
?>