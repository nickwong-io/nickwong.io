$(document).foundation();

categories = ['adventure', 'coding', 'design', 'entrepreneurship'];

// 2D array of children;
map = $('.map').children();

/* Does a row after current row exist? */
function hasNext(map, row) {
	if (map[row + 1] == null) {
		return false;
	} else {
		return true;
	}
}

/* Is given row completely empty? */
function isEmpty(map, row) {
	if (map[row] == null) {
		return true;
	}

	if ($(map[row].children[0]).css("display") == "none" 
		&& $(map[0].children[1]).css("display") == "none" 
		&& $(map[0].children[2]).css("display") == "none") {
		return true;
	} else {
		return false;
	}
}

/* Does given row have items in any slot? */
function hasItems(map, row) {
	if (map[row] == null) {
		return false;
	}

	if ($(map[row].children[0]).css("display") != "none" 
		|| $(map[row].children[1]).css("display") != "none" 
		|| $(map[row].children[2]).css("display") != "none") {
		return true;
	} else {
		return false;
	}
}

/* Is there at least one item that occurs later? */
function hasItemsLater(map, row) {
	if (map[row] == null) {
		return false;
	}

	if (hasItems(map, row + 1)) {
		return true;
	} else {
		return hasItemsLater(map, row + 1);
	}
}

/* HIDE next item occuring after given row */
function deleteFromNext(map, row) {

	if (!hasNext(map, row)) {
		return null;
	} else if (hasItems(map, row + 1)) {
		// HIDE one from that row starting at the back
		if ($(map[row + 1].children[2]).css("display") != "none") {
			$(map[row + 1].children[2]).css("display", "none");
			return $(map[row + 1].children[2]);
		} else if ($(map[row + 1].children[1]).css("display") != "none") {
			$(map[row + 1].children[1]).css("display", "none");
			return $(map[row + 1].children[1]);
		} else {
			$(map[row + 1].children[0]).css("display", "none");
			return $(map[row + 1].children[0]);
		}
	} else {
		return deleteFromNext(map, row + 1);
	}
}

/* Recurrsively rearrange a map */
function rearrange(map, row) {
	// BASE CASE: if row doesn't exist or is empty, end.
	if ((map[row] == null || (isEmpty(map, row)) && !hasNext(map, row))) {
		return true;	
	// if either slot 1 or 2 is empty and there's another row, do stuff	
	} else if (($(map[row].children[0]).css("display") == "none" 
		|| $(map[row].children[1]).css("display") == "none" 
		|| $(map[row].children[2]).css("display") == "none") 
		&& hasNext(map, row)) {
		
		if (!hasItemsLater(map, row)) {
			return true;
		}

		// look at each child. 

		// HANDLE SLOT ZERO
		// set empty one to an x
		if ($(map[row].children[0]).css("display") == "none" && hasItemsLater(map, row)) {
			// hides the next available card
			var toDelete = deleteFromNext(map, row);
			// saves the slot's hidden card html
			var slotHiddenCard = $(map[row].children[0]);

			// replaces empty slot with the card that was deleted
			$(map[row].children[0]).replaceWith(toDelete.wrap('<p/>').parent().html());

			$(map[row].children[0]).css("display", "block");
			$(toDelete).unwrap();
			$(toDelete[0]).replaceWith(slotHiddenCard[0]);
		}


		// HANDLE SLOT ONE
		// set empty one to an x
		if ($(map[row].children[1]).css("display") == "none" && hasItemsLater(map, row)) {
			// hides the next available card
			var toDelete = deleteFromNext(map, row);
			// saves the slot's hidden card html
			var slotHiddenCard = $(map[row].children[1]);

			// replaces empty slot with the card that was deleted
			$(map[row].children[1]).replaceWith(toDelete.wrap('<p/>').parent().html());

			$(map[row].children[1]).css("display", "block");
			$(toDelete).unwrap();
			$(toDelete[0]).replaceWith(slotHiddenCard[0]);
		}


		// HANDLE SLOT TWO
		if ($(map[row].children[2]).css("display") == "none" && hasItemsLater(map, row)) {
			// hides the next available card
			var toDelete = deleteFromNext(map, row);
			// saves the slot's hidden card html
			var slotHiddenCard = $(map[row].children[2]);

			// replaces empty slot with the card that was deleted
			$(map[row].children[2]).replaceWith(toDelete.wrap('<p/>').parent().html());

			$(map[row].children[2]).css("display", "block");
			$(toDelete).unwrap();
			$(toDelete[0]).replaceWith(slotHiddenCard[0]);
		}

		return rearrange(map, row + 1);
	} else {
		return rearrange(map, row + 1);
	}

}


/* the magic lines
	var toDelete = deleteFromNext(map, 0); // deletes and saves item
	$(map[0].children[1]).replaceWith(toDelete.wrap('<p/>').parent().html()); // makes the swap
	$(toDelete).unwrap(); // cleans up the p wrapper left behind
	$(map[0].children[1]).css("display", "block"); // shows that square again
*/

// $('#all').click(function() {
// 	hideAllExcept();
// });
$('#adventure').click(function() {
	hideAllExcept();
	hideAllExcept("adventure");
	rearrange(map, 0);
});
$('#coding').click(function() {
	hideAllExcept();
	hideAllExcept("coding");
	rearrange(map, 0);
});
// $('#design').click(function() {
// 	hideAllExcept();
// 	hideAllExcept("design");
// 	rearrange(map, 0);
// });
// $('#entrepreneurship').click(function() {
// 	hideAllExcept();
// 	hideAllExcept("entrepreneurship");
// 	rearrange(map, 0);
// });


// Either hides all cards except those that match class of query or shows all cards.
function hideAllExcept(query) {
	if (query == null) {
		for (var i = 0; i < map.length; i++) {
			for (var j = 0; j < 3; j++) {
				if (!($(map[i].children[j]).hasClass(query))) {
					$(map[i].children[j]).css("display", "block");
				}
			}
		}
	} else {
		for (var i = 0; i < map.length; i++) {
			for (var j = 0; j < 3; j++) {
				if (!($(map[i].children[j]).hasClass(query))) {
					$(map[i].children[j]).css("display", "none");
				}
			}
		}
	}
}
