// Insert all films
// To a HTML file

function importAllFilms() {
	var subElementNames = ["id", "title", "year", "duration", "credits", "review"];
    for(var i=0; i<cities.length; i++) {
      rows[i] = 
        getElementValues(cities[i], subElementNames);
    }
    var table = getTable(headings, rows);
    htmlInsert(resultRegion, table);
}

function stringAllFilmTable(request, resultRegion) {
  var address = "show-films";
  var data = "format=string";
  ajaxPost(address, data, 
           function(request) { 
             showStringFilmInfo(request, resultRegion); 
           });
}

function showStringFilmInfo(request, resultRegion) {
  if ((request.readyState == 4) &&
      (request.status == 200)) {
    var rawData = request.responseText;
    var rowStrings = rawData.split(/[\n\r]+/);
    var headings = rowStrings[0].split("#");
    var rows = new Array(rowStrings.length-1);
    for(var i=1; i<rowStrings.length; i++) {
      rows[i-1] = rowStrings[i].split("#");
    }
    var table = getTable(headings, rows);
    htmlInsert(resultRegion, table);
  }
}

function stringOneFilmTable(request, resultRegion) {
	  var address = "show-film";
	  var data = "filmTitle=" + getValue(request) + "&format=string";
	  ajaxPost(address, data, 
	           function(request) { 
		  			showStringOneFilmInfo(request, resultRegion); 
	           });
	}

	function showStringOneFilmInfo(request, resultRegion) {
	  if ((request.readyState == 4) &&
	      (request.status == 200)) {
	    var rawData = request.responseText;
	    var rowStrings = rawData.split(/[\n\r]+/);
	    var headings = rowStrings[0].split("#");
	    var rows = new Array(rowStrings.length-1);
	    for(var i=1; i<rowStrings.length; i++) {
	      rows[i-1] = rowStrings[i].split("#");
	    }
	    var table = getTable(headings, rows);
	    htmlInsert(resultRegion, table);
	  }
	}
	
function stringADDFilmTable(name,year,director,duration,credits,review,resultRegion) {
	var address = "add-film";
	var data = "name=" + getValue(name) + "&year=" + getValue(year) + "&director=" 
	+ getValue(director) + "&duration=" + getValue(duration) + "&credits=" + getValue(credits)
	+ "&review=" + getValue(review) + "&format=string";
	ajaxPost(address, data, 
	           function(request) { 
		  			showStringOneFilmAddedInfo(request, resultRegion); 
	           });	
}

function showStringOneFilmAddedInfo(request, resultRegion) {
	  if ((request.readyState == 4) &&
	      (request.status == 200)) {
	    var rawData = request.responseText;
	    var rowStrings = rawData.split(/[\n\r]+/);
	    var headings = rowStrings[0].split("#");
	    var rows = new Array(rowStrings.length-1);
	    for(var i=1; i<rowStrings.length; i++) {
	      rows[i-1] = rowStrings[i].split("#");
	    }
	    var table = getTable(headings, rows);
	    htmlInsert(resultRegion, table);
	  }
	}

// Reminder: unlike in Java, in JavaScript it is OK to 
// use == to compare strings.

function findHandler(format) {
  if (format == "xml") {
    return(showXmlCityInfo);
  } else if (format == "json") {
    return(showJsonCityInfo);
  } else {
    return(showStringCityInfo);
  }
}