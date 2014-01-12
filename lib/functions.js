/**
 * Fitness functions for testing
 *
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 */

// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

var functions = exports;

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

