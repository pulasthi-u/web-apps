
function isscrolled(pixels) {

	var scrol = window.scrollY;

	if (scrol == pixels) {

		return true;

	} else {

		return false;

	}

}


function grab(id) {

	var item = document.getElementById(id);

	return item;

}


// The following function is used to break table columns into separate rows, to aid in responsive design

function breaktables(tableid) {

	var table = document.getElementById(tableid);

	var numOfRows = table.rows.length;

	for (row = 1; row <= numOfRows; row++) {

		var numOfCells = table.rows[row-1].cells.length;
		var height = table.rows[row-1].clientHeight;
		
		for (cell = 1; cell <= numOfCells; cell++) {

			var cellToEdit = table.rows[row-1].cells[cell-1];
			var insideTable = cellToEdit.innerHTML;

			if (insideTable == '') {

				cellToEdit.style.display = 'block';
				cellToEdit.style.height = height + 'px';

			} else {

				cellToEdit.style.display = 'block';

			}

			cellToEdit.style.width = '100%';

		}

	}

}


// The following function is used to center text inside a <div>. Note that the text has to be inside a <p> inside the <div>

// divId = ID of <div>
// pId = ID of <p>

function centerText(divId, pId) {

	var theDiv = document.getElementById(divId);
	var theP = document.getElementById(pId);

	theDiv.style.position = 'relative';
	theP.style.position = 'absolute';

	pHeight = theP.clientHeight;
	pWidth = theP.clientWidth;
	divHeight = theDiv.clientHeight;
	divWidth = theDiv.clientWidth;

	Lmargin = (divWidth / 2) - (pWidth / 2);
	Tmargin = (divHeight / 2) - (pHeight / 2);
	theP.style.marginLeft = Lmargin + 'px';
	theP.style.marginTop = Tmargin + 'px';

}