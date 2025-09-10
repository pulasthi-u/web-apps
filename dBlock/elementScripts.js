function showPopup(parent, popupIndex) {
    var popup = document.getElementById(popupIndex);
    popup.style.display = "block";
    popup.style.left = `${parent.offsetLeft}px`;
    popup.style.top = `${parent.offsetTop - popup.clientHeight - 10}px`;
}

function hidePopup(popupIndex) {
    document.getElementById(popupIndex).style.display = "none";
}