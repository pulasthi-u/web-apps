function scrollB() {
    var l1 = document.getElementById('layer1');
    var l2 = document.getElementById('layer2');
    var l3 = document.getElementById('layer3');
    l1.style.transform = "translateY(" + -window.scrollY/5 + "px)";
    l2.style.transform = "translateY(" + -window.scrollY/4.5 + "px)";
    l3.style.transform = "translateY(" + -window.scrollY/4 + "px)";
}

function shift(foo) {
    var halfWidth = window.innerWidth / 2;
    var halfHeight = window.innerHeight / 2;
    var xFrac = ((foo.clientX - halfWidth) / halfWidth);
    var yFrac = ((foo.clientY - halfHeight) / halfHeight);
    var l1 = document.getElementById('layer1');
    var l2 = document.getElementById('layer2');
    var l3 = document.getElementById('layer3');
    var x1 = l1.style.transform.split("(")[1].replace(")px","");
    console.log(x1);
    document.getElementById('layer1').style.transform = "translateY(" + yFrac*5 + "px) translateX(" + xFrac*5 + "px)";
    document.getElementById('layer2').style.transform = "translateY(" + yFrac*10 + "px) translateX(" + xFrac*10 + "px)";
    document.getElementById('layer3').style.transform = "translateY(" + yFrac*20 + "px) translateX(" + xFrac*20 + "px)";
}