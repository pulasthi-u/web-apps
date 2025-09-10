var bheight = window.innerHeight;
var vwidth = window.innerWidth;

function resize() {
	var welcome = document.getElementById('welcome');
	var pa = document.getElementById('partitiona');
	var pheight = pa.clientHeight;
	var welheight = welcome.clientHeight;
	var margin = (pheight / 2) - (welheight / 2);
	welcome.style.marginTop = margin + "px";
}

function showright(tablename, fname, cella, cellb) {
	var table = document.getElementById(tablename);
	var cella = document.getElementById(cella);
	var cellb = document.getElementById(cellb);
	table.style.animationName = "expandtable";
	table.style.animationDuration = "0.5s";
	cella.style.width = "25%";
	cellb.style.width = "55%";
	table.style.animationFillMode = "forwards";
	var fa = document.getElementById(fname);
	fa.style.display = "table-cell";
}

function hideright(tablename, fname, cella, cellb) {
	var table = document.getElementById(tablename);
	var cella = document.getElementById(cella);
	var cellb = document.getElementById(cellb);
	table.style.animationName = "shrinktable";
	table.style.animationDuration = "0.5s";
	cella.style.width = "40%";
	cellb.style.width = "60%";
	table.style.animationFillMode = "forwards";
	var fa = document.getElementById(fname);
	fa.style.display = "none";
}

function showleft(tablename, fname, cella, cellb) {
	var table = document.getElementById(tablename);
	var cella = document.getElementById(cella);
	var cellb = document.getElementById(cellb);
	table.style.animationName = "expandtable";
	table.style.animationDuration = "0.5s";
	cella.style.width = "55%";
	cellb.style.width = "25%";
	table.style.animationFillMode = "forwards";
	var fa = document.getElementById(fname);
	fa.style.display = "table-cell";
}

function hideleft(tablename, fname, cella, cellb) {
	var table = document.getElementById(tablename);
	var cella = document.getElementById(cella);
	var cellb = document.getElementById(cellb);
	table.style.animationName = "shrinktable";
	table.style.animationDuration = "0.5s";
	cella.style.width = "60%";
	cellb.style.width = "40%";
	table.style.animationFillMode = "forwards";
	var fa = document.getElementById(fname);
	fa.style.display = "none";
}

function ripple(event, circle) {
	var x = event.clientX;
	var y = event.clientY;
	var rip = document.getElementById(circle);
	rip.style.display = "block";
	rip.style.bottom = (650 - y) + "px";
	rip.style.right = ((1316 - x)/2) + "px";
	rip.style.animationName = "bigger";
	rip.style.animationDuration = "0.5s";
	setTimeout(function(){ rip.style.display = "none"; rip.style.animationName = "";}, 500);
}

function valscroll() {
	var amt = window.scrollY;
	if (amt > 100) {
		showarrow();
	} else {
		hidearrow();
	}
}

function showarrow() {
	var btt = document.getElementById('backtotop');
	btt.style.animationName = "fadein";
	btt.style.animationDuration = "0.5s";
	btt.style.animationFillMode = "forwards";
}

function hidearrow() {
	var btt = document.getElementById('backtotop');
	btt.style.animationName = "fadeout";
	btt.style.animationDuration = "0.5s";
	btt.style.animationFillMode = "forwards";
}

function initialize() {
	resize();
}