var winHeight = window.innerHeight;

function loadAnimations() {
    document.getElementById('profPic').style.animationName = "zoomIn";
    document.getElementById('profName').style.animationName = "ascend";
    document.getElementById('otherInfo').style.animationName = "ascend";
}

function scrollAnimations() {
    var scrolledAmount = window.scrollY;
    if (scrolledAmount > (winHeight / 5)) {
        document.getElementById('introInformationContainer').style.position = "relative"; // Make the container containing the grid info movable
        //document.getElementById('header').style.animationName = "descendHeader"; // Show header
        document.getElementById('introInformationContainer').style.animationName = "animateIntroInfoContainer"; // Lessen height of container and move it downwards to give space for header
        document.getElementById('restOfContent').style.display = "block"; // Make rest of content visible
    }
    if (scrolledAmount > (winHeight / 6)) {
        document.getElementById('coverImageContainer').style.visibility = "hidden"; // Hide the container containing the cover image
        document.getElementById('introInformation').style.animationName = "shrinkIntroInfo"; // Shrink the grid [not height] containing the information shown at the beginning
        document.getElementById('profPic').style.animationName = "shrinkProfImage"; // Make the profile picture small
        document.getElementById('profName').style.animationName = "shrinkName"; // Make the text small
    }
    if (scrolledAmount > (winHeight / 8)) {
        document.getElementById('coverImage').style.animationName = "hideCover"; // Set opacity of cover image to 0
    }
}

window.addEventListener("scroll", scrollAnimations);