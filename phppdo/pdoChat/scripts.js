var ajaxRequest = new XMLHttpRequest();
ajaxRequest.open('POST', 'chatQueries.php');
var max = 0;

function selectID() {
    var id = parseInt(document.getElementById('number').value);
    if (id > 1 && id != null) {
        var argsList = {"action":"selectID", "ID":id};
        var request = JSON.stringify(argsList);
        ajaxRequest.send(request);
        ajaxRequest.onreadystatechange = function() {
            if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
                var text = ajaxRequest.responseText;
                response = JSON.parse(text);
                if (response.found == 'yes') {
                    window.location.replace("chat.php");
                }
            }
        }
    } else {
        alert("INVALID");
    }
}

function fetchMsgs() {
    var argsList = {"action":"fetchMsgs", "maximum":max};
    var request = JSON.stringify(argsList);
    ajaxRequest.open('POST', 'chatQueries.php');
    ajaxRequest.send(request);
    ajaxRequest.onreadystatechange = function() {
        if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
            var text = ajaxRequest.responseText;
            if (text != '') {
                var jsn = JSON.parse(text);
                var limit = jsn.messages.length;
                max = jsn.max;
                var space = document.getElementById('msgContain');
                for (index = 0; index < limit; index++) {
                    var sender = jsn.messages[index].sender;
                    var msg = jsn.messages[index].message;
                    space.innerHTML = space.innerHTML + sender + " : " + msg + "<BR>";
                }
            }
        }
    }
}

function sendMsg() {
    var msg = document.getElementById('msg').value;
    var argsList = {"action":"sendMsg", "msg":msg};
    ajaxRequest.open('POST', 'chatQueries.php');
    var req = JSON.stringify(argsList);
    ajaxRequest.send(req);
    document.getElementById('msg').value = "";
}