var dateFormatter = (function() {
  var df = {};

  df.getTodayDate = function(date) {
    var today = moment();
    var inputDate = moment(date);
    var outputDate;

    if (today.format('YYYYMMDD') == inputDate.format('YYYYMMDD')) {
      outputDate = 'Hoy - ';
    }
    else {
      outputDate = inputDate.format('MMM. D - ');
    }
    outputDate = outputDate + inputDate.format('hh:mma');

    return outputDate;
  }

  return df;
})();
var dateFormatter2 = (function() {
	  var df = {};

	  df.getTodayDate = function(date) {
	    var today = moment();
	    var inputDate = moment(date);
	    var outputDate;

	    if (today.format('YYYYMMDD') == inputDate.format('YYYYMMDD')) {
	    	var fecha= new Date();
	    	var horas= fecha.getHours();
	    	var minutos = fecha.getMinutes(); 
	        outputDate = horas + ":" + minutos;
	    }
	    else {
	      outputDate = inputDate.format('MMM. D');
	    }

	    return outputDate;
	  }

	  return df;
	})();
