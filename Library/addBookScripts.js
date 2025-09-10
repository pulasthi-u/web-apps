function expand() {
    var maxChars = 20;
    var textarea = document.getElementById('bookTitle');
    var enteredTextLength = parseInt(textarea.value.length);
    var extraChars = (enteredTextLength % maxChars);
    var noLines = ((enteredTextLength - extraChars) / maxChars) + 1;
    console.log(noLines);
    if (noLines <= 3) {
        textarea.style.height = (5 * noLines) + "vh";
    }
}

function showAuthorList() {
    var backdrop = document.getElementsByClassName('backdrop')[0];
    var authorBox = document.getElementById('authorsBox');
    backdrop.style.visibility = "visible";
    authorBox.style.visibility = "visible";
}