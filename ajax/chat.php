<!doctype html>
<html>
    <script src = "ajax.js"></script>
    <link rel = "stylesheet" href = "chatstyle.css">
    <body>
        <input type = "number" name = "num" id = "num" placeholder = "Chat ID" required>
        <table id = "msgspace">
<!--
            <tr>
                <td class = "msgSent">
                    Hello
                </td>
            </tr>
            <tr>
                <td class = "msgRecv">
                    <span class = "name">
                        John Doe
                    </span>
                    How are you
                </td>
            </tr>
!-->
        </table>
        <table id = "typeSpace">
            <tr>
                <td>
                    <textarea name = "msg" id = "msg" rows = 5 placeholder = "Type your message..."></textarea>
                </td>
                <td>
                    <button id = "send" onclick = "sendMsg();">
                        Send
                    </button>
                </td>
            </tr>
        </table>
    </body>
</html>