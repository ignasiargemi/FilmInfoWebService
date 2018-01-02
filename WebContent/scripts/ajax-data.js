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

// See combined version at end that can handle
// any of XML, JSON, or String data.

function xmlCityTable(inputField, resultRegion) {
  var address = "show-cities";
  var data = "cityType=" + getValue(inputField) +
             "&format=xml";
  ajaxPost(address, data, 
           function(request) { 
             showXmlCityInfo(request, resultRegion); 
           });
}

function showXmlCityInfo(request, resultRegion) {
  if ((request.readyState == 4) &&
      (request.status == 200)) {
    var xmlDocument = request.responseXML;
    var headings = getXmlValues(xmlDocument, "heading");
    var cities = xmlDocument.getElementsByTagName("city");
    var rows = new Array(cities.length);
    var subElementNames = ["name", "time", "population"];
    for(var i=0; i<cities.length; i++) {
      rows[i] = 
        getElementValues(cities[i], subElementNames);
    }
    var table = getTable(headings, rows);
    htmlInsert(resultRegion, table);
  }
}

function jsonCityTable(inputField, resultRegion) {
  var address = "show-cities";
  var data = "cityType=" + getValue(inputField) +
             "&format=json";
  ajaxPost(address, data, 
           function(request) { 
             showJsonCityInfo(request, resultRegion); 
           });
}

function showJsonCityInfo(request, resultRegion) {
  if ((request.readyState == 4) &&
      (request.status == 200)) {
    var rawData = request.responseText;
    var data = eval("(" + rawData + ")");
    var table = getTable(data.headings, data.cities);
    htmlInsert(resultRegion, table);
  }
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
	  var data = "filmID=" + getValue(request) + "&format=string";
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

function cityTable(cityTypeField, formatField, resultRegion) {
  var address = "show-cities";
  var cityType = getValue(cityTypeField);
  var format = getValue(formatField);
  var data = "cityType=" + cityType +
             "&format=" + format;
  var responseHandler = findHandler(format);
  ajaxPost(address, data, 
           function(request) { 
             responseHandler(request, resultRegion); 
           });
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