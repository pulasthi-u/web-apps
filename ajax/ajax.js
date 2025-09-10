function sendMsg() {
    var msg = document.getElementById('msg').value;
    var id = document.getElementById('num').value;
    if (check == null) {
        if (id < 1 || id == null) {
            alert('INVALID');
        } else {
        var check = true;
        var thing = "id="+id+"&msg="+msg;
        console.log(thing);
        var ajax = new XMLHttpRequest();
        ajax.open('POST', 'queries.php');
        ajax.send(thing);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                    alert(ajax.responseText);
                }
            }
        }
    } else {
        var thing = "id="+id+"&msg="+msg;
        console.log(thing);
        var ajax = new XMLHttpRequest();
        ajax.open('POST', 'queries.php');
        ajax.send(thing);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                    alert(ajax.responseText);
                }
            }
    }
}