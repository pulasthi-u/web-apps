<!doctype html>
<html>
    <script>
        function doThing() {
            var button = document.getElementById('ajax');
            var ajax = new XMLHttpRequest();
            ajax.open('POST', 'query.php', true);
            ajax.send("Hello how are you?");
            ajax.addEventListener('readystatechange', doThis);
        }
        function doThis() {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                var stuff = document.body.innerHTML;
                document.body.innerHTML = stuff + response;
            }
        }
    </script>
    <button id = "ajax" onclick = "doThing();">
        Click Me
    </button>
    <form name = "thing" method = "post" action = "query.php">
        <input type = "text" name = "lname">
        <input type = "submit" name = "submit">
    </form>
</html>