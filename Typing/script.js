var typeText = "The Roman temple of Bziza is a well-preserved first century AD Roman temple in the Lebanese town of Bziza. The temple is dedicated to Azizos, a personification of the morning star in the Canaanite mythology. The temple lends the modern town of Bziza its current name as Bziza is a corruption of Beth Azizo meaning the house or temple of Azizos. Azizos is identified as Ares by Julian the Apostate.";

var words = typeText.split(" ");

var container = document.getElementById('whatToType');

for (var word = 0; word < words.length; word++) {
    var span = document.createElement("SPAN");
    span.id = "w" + word;
    span.innerHTML = (words[word] + "&nbsp;");
    container.appendChild(span);
}

var wordIndex = 0;
var totalWordsTyped = 0;
var beginTime = 0;
var tbox = document.getElementById('wordTyped');
var loop;
var cmsBox = document.getElementById('cumulativeSpeed');

function initiate() {
    beginTime = Date.now();
    loop = setInterval(checkWord, 1);
}

function checkWord() {
    var word = tbox.value;
    if (word == (words[wordIndex] + " ")) {
        tbox.value = "";
        document.getElementById('w'+wordIndex).style.fontWeight = "bold";
        wordIndex++;
        totalWordsTyped++;
        var totalTime = ((Date.now() - beginTime) / 1000); // in seconds
        var cms = totalWordsTyped / totalTime; //in wps
        cmsBox.innerHTML = cms;
    }
    if (totalWordsTyped == words.length) {
        clearInterval(loop);
    }
}

function myFunc() {
    const xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://developer.mozilla.org/";

    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log(xhr.responseText);
      }
    };
    xhr.send();
}