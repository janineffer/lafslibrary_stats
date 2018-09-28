var i = 0;

const months = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
    ];

var activitiesNames = [
	"Browsing", 
	"General Information", 
	"Formatting Questions",
	"Computer", 
	"Headphones", 
	"DVD Player",
	"Printer/Scanner", 
	"Suggestion Request", 
	"Email",
	"Independent Study", 
	"Group Study", 
	"Faculty",
	"Alumni",
	"Test Proctor",
	"Admissions Tour",
	"Supplies",
	"Selfies (New Students)",
	"Asking for Color Printer",
	"Asking for Fax Machine",
	"Library Orientation"
	];

var tempActivitiesNames = activitiesNames;
var currentActivityArray = [];
var csv = "";
var plusIDs = [];
var minusIDs = [];
var inputIDs = [];

class TodaysDate {
	constructor(month, day, year) {
		var thirtyMonths = [4, 6, 9, 11];
		var i;
		for (i = 0; i < thirtyMonths.length; i++) {
			if ((month = 2 && day > 28) || (month = thirtyMonths[i] && day > 30) || month < 1) {
				throw new Error();
			}		
		}
		this.month = month;

		if (day < 1 || day > 31) {
			throw new Error();
		}
		this.day = day;

		if (year < 2010 || year > 2018) {
			throw new Error();
		}
		this.year = year;
	}
}

class Activity {
	constructor(name, count) {
		this.name = name;

		if (count < 0) {
			throw new Error();
		}
		this.count = count;
	}

	toString() {
		return "" + this.name + ", " + this.count;
	}
}

class ActivitiesForDay {
	constructor(date, activities) {
		this.date = date;
		this.activities = activities;
		this.total = 0;
	}

	static getTotal() {
		var i;
		for (i = 0; i < activities.length; i++) {
			total += activities[i].count;
		}
		return total;
	}

	addActivity(activity) {
		activities.push(activity);
	}

	deleteActivity(activity) {
		var i = 0;
		for (i = 0; i < activities.length; i++) {
			if ("" + activity == activities[i].name) {
				activities.splice(i, 1);
				return "Item has been deleted";
			}
		}
	}

	getActivities() {
		return activities;
	}		
}

//making a date
function makeDate () {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();

	if(dd < 0) {
	    dd = "0" + dd;
	} 

	if(mm < 10) {
	    mm = "0" + mm;
	} 

	today = mm + "/" + dd + "/" + yyyy;

	return mm + "/" + dd + "/" + yyyy;
}

function makePlusButton (plusID, styleButton) {
	return "<button id=\"" + plusID + "\" type=\"button\" value=\"1\" class=\"btn btn-primary btn-sm btn-" + styleButton + "\">+</button>";
}

function makeMinusButton (minusID, styleButton) {
	return "<button id=\"" + minusID + "\" type=\"button\" value=\"1\" class=\"btn btn-primary btn-sm btn-" + styleButton + "\">-</button>";
}

function makeButton (typeButton, styleButton) {
	return "<button id=\"" + typeButton + "\" type=\"button\" value=\"" + typeButton + "\" class=\"btn btn-primary btn-sm btn-" + styleButton + "\">" + typeButton.toUpperCase() + "</button>";
}

function makeInput (inputID) {
	var inputID = inputID;
	return "<input id=\"" + inputID + "\" class=\"form-control input-sm\" type=\"text\" size=\"3%\" placeholder=\"0\" value=\"0\">";
}

function makeForm (minusID, plusID, inputID) {
	var minus = makeMinusButton(minusID, "light");
	var plus = makePlusButton(plusID, "light");
	var input = makeInput(inputID);
	return "<form role=\"form\" class=\"padding-15 black round-5 form-inline\"><div class=\"form-group\">" + minus + input + plus + "</div></form>";
}

function makeIDs (IDs, suffix, activityArray) {
	var i = 0;
	var transActivityName;
	for (i = 0; i < activityArray.length; i++) {
		transActivityName = (activityArray[i].toLowerCase()).replace(/\s/g, '');
		IDs.push(transActivityName + suffix);
	}
}

function makeForms (activityArray, locationHash) {
	plusIDs = [];
	minusIDs = [];
	inputIDs = [];
	var transActivityName;
	var i = 0;
	for (i = 0; i < activityArray.length; i++) {
		transActivityName = "a" + (i + 1); 
		plusIDs.push(transActivityName + "plus");
		minusIDs.push(transActivityName + "minus");
		inputIDs.push(transActivityName);
	}
	var j = 0;
	for (j = 0; j < activityArray.length; j++) {
		$(locationHash).append('<tr><td>' + activityArray[j] + '</td><td>' + makeForm(minusIDs[j], plusIDs[j], inputIDs[j]) + '</td></tr>');
	}
}

//functionalities

function makeActivity (name, count) {
	return new Activity(name, count);
}

function makeActivities (activityArray) {
	var activities = [];
	var i;
	var j = 1;
	var inputID;
	for (i = 0; i < activityArray.length; i++) {
		inputID = "#a" + j;
		activities.push(new Activity(activityArray[i], $(inputID).val()));
		j++;
	}
	return activities;
}

function makeCSV (array) {
	var csv = "";
	var i;
	for (i = 0; i < array.length; i++) {
		csv += (array[i].name + ", " + array[i].count + "\n");
	}
	return csv;
}

function makeButtonWork (activity) {
	var plusbutton, minusbutton = 0;
	var activityNameHash = "#a" + activity;
	var plusIdHash = activityNameHash + "plus";
	var minusIdHash = activityNameHash + "minus";

	$(plusIdHash).click(function() {
		if (Number($(activityNameHash).val()) + 1 < 0) {
			plusbutton = 0;
		} else {
			plusbutton = 1 + Number($(activityNameHash).val());
		}
		$(activityNameHash).val(plusbutton);
	});
	$(minusIdHash).click(function() {
		if (Number($(activityNameHash).val()) - 1 < 0) {
			minusbutton = 0;
		} else {
			minusbutton = Number($(activityNameHash).val()) - 1;
		}
		$(activityNameHash).val(minusbutton);
	});
}

function makeButtonsWork (activityArray) {
	var i;
	for (i = 0; i < activityArray.length; i++) {
		makeButtonWork(i + 1);
	}

	$("#reset").click(function() {
		var j;
		var inputID = "";
		for (j = 0; j <= activityArray.length; j++) {
			inputID = "#a" + j;
			$(inputID).val(0)
		}
	})

	$("#save").click(function() {
		currentActivityArray = makeActivities(activityArray);
		csv = makeCSV(currentActivityArray);
		$('#demo').html(csv);
	})

	$("#download").click(function() {
		if (csv == "") {
			$('#demo').html("Please press the save button before downloading.");
		} else {
			var date = makeDate();
			var element = document.createElement("a");
			element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csv));
			element.setAttribute("download", (date + ".csv"));
			element.style.display = "none";
			if (typeof element.download != "undefined") {
				document.body.appendChild(element);
				element.click();
				document.body.removeChild(element);
			} else {
				alert("This functionality is not supported by the current browser.");
			}
		}
	})
}


$('#date').html(makeDate());
makeForms(tempActivitiesNames, "#activitiesTable");
$('#bottom_buttons').html((makeButton("reset", "danger") + makeButton("save", "info") + makeButton("download", "info")));
makeButtonsWork(tempActivitiesNames);
