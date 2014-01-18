/**
 * Fitness functions for testing
 *
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 * @license GPL v3
 */

// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

var functions = exports;

//Ackley description in http://tracer.lcc.uma.es/problems/ackley/ackley.html
functions.ackley = function(x) {
    var result = 0;
    var sum = 0;
    console.log("Checking for " + x.length);
    for ( var i in x ) {
	sum += x[i]*x[i];
    }
    result = 20 - 20*Math.exp(-0.2*Math.sqrt(sum/x.length));
    var cos = 0;
    for (  i in x ) {
	cos += Math.cos(2*Math.PI*x[i]);
    } 
    result += Math.E - Math.exp(cos/x.length); // needed for precision
    console.log("Result = " + result.toPrecision(6));
    return result; // hack for returning 0
};

functions.ltrap = function(x,l,a,b,z) {
    var total = 0;
    for ( var i = 0;  i < x.length; i+= l ) {
	var this_substr = x.substr(  i, l );
	var num_ones = 0;
	for ( var j = 0;  j < this_substr.length; j++ ) {
	  num_ones += (this_substr.substring(j,j+1) == "1"); 
	}
	var this_result;
	if ( num_ones <= z ) {
	  this_result = a*(z-num_ones)/z;
	} else {
	  this_result = b*(num_ones -z)/(l-z);
	}
	total += this_result;
//	console.log("Total " + i + " :"+total + " num_ones " + num_ones );
    }

    return total;
};