<html>
<body onload = "setInterval(fetchMsgs, 500);">
    <script src = "scripts.js"></script>
    <textarea id = "msg" placeholder = "Enter Message..." rows = 5 cols = 50></textarea>
    <br>
    <button id = "send" onclick = "sendMsg();">SEND</button>
    <br>
    <div id = "msgContain">
        
    </div>
</body>
</html>