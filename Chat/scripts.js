var connectTo = "";
var highest;

function check() {
    var num = document.getElementById('chatid').value;
    if (num < 2 || num == null) {
        alert("INVALID");
    } else {
        var ajax = new XMLHttpRequest();
        ajax.open('POST', 'query.php');
        ajax.send("ID=" + num + "&");
        /*ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var text = ajax.responseText;
                if (text != "") {
                    connectTo = text;
                    alert(connectTo);
                    window.location.replace("chat.php");
                }
            }
        }*/
    }
}
    
var chat = new XMLHttpRequest();
var user = "SilverSoldier";

function sendMsg() {
    var msg = document.getElementById('message').value;
    document.getElementById('msgSpace').insertAdjacentHTML('beforeend', msg);
    chat.open('POST', 'chatQuery.php');
    chat.send("conTo="+connectTo+"&msg="+msg+"&sender="+user);
    chat.onreadystatechange = function() {
        if (chat.readyState == 4 && chat.status == 200) {
            console.log(chat.responseText);
        }
    }
}