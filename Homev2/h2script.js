function position1(parent, child) {
	var contain = document.getElementById(child);
	var login = document.getElementById(parent);
	var lheight = login.clientHeight;
	var radius = lheight / 2;
	var cheight = Math.sqrt((2*(radius * radius)));
	contain.style.height = cheight + "px";
	contain.style.width = cheight + "px";
	var margin = (lheight / 2) - (cheight / 2);
	contain.style.margin = margin + "px";
}

function dostuff() {
	position1('login', 'logcontain');
	position1('description', 'descontain');
}