function scrollBehaviour() {
    var sec1 = document.getElementById('sec1');
    var sec2 = document.getElementById('sec2');
    var sec3 = document.getElementById('sec3');
    var sec4 = document.getElementById('sec4');
    sec1.style.transform = "translateY(" + -window.scrollY/5 + "px)";
    sec2.style.transform = "translateY(" + -window.scrollY/4 + "px)";
    sec3.style.transform = "translateY(" + (-window.scrollY/3 + (1/3)*window.innerHeight) + "px)";
    sec4.style.transform = "translateY(" + (-window.scrollY/2 + (1.5)*window.innerHeight) + "px)";
}