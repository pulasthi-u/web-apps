// document.addEventListener("mousewheel", scrollbar);
document.addEventListener("scroll", scroller);

var scrollX = 0, scrollY = 0;
var section = 0;
var begin = true;

function scroller(e) {
    console.log("SCROLLING");
}

function scrollbar(e) {
    // e.clientX, e.clientY = place of cursor when scrolling begins
    scrollX += e.deltaX;
    if ((scrollY <= 0) && (e.deltaY < 0)) {
        scrollY = 0;
    } else {
        scrollY += e.deltaY / 2;
    }
    if (scrollY < 1000) {
        console.log("section 0");
    } else if ((scrollY > 1000) && (scrollY < 2000)) {
        console.log("section 1");
    } else if ((scrollY > 2000) && (scrollY < 3000)) {
        console.log("section 2");
    } else if (scrollY > 3000) {
        console.log("section 3");
    }
    // if (e.deltaY > 20) {
    //     if (section < 3) {
    //         section++;
    //     }
    //     console.log("NEXT SECTION", section);
    // }
}