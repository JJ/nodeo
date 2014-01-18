var test = require('tap').test,
    functions = require(__dirname + '/../../lib/functions.js');

var dimensions = [10, 20, 30];

test('optimum', function(t) {
	 for (var i in dimensions) {
	     var x = [];
	     for ( var j = 0; j < dimensions[i]; j++) {
		 x.push(0);
	     }
	     t.equal( functions.ackley(x), 0, "Optimum for dimension "+ dimensions[i] + " OK" );
     }
	 t.end();
});

test("l-trap", function(t) {
	 var a = 1,
	 b = 2;
	 var params3 = [3,a,b,2];
	 var subjects3= { '111': b,
			  '000': a,
			  '011': 0,
			  '110': 0};
	 test_trap( t, params3, subjects3);

	 var params4 = [4,a,b,3];
	 var subjects4= { '1111': b,
			  '0000': a,
			  '0111': 0,
			  '1110': 0};
	 test_trap( t, params4, subjects4);
	 t.end();
});

function test_trap(t, params, subjects ) {
    var number_of_bits = params[0], 
    a = params[1], b = params[2], z  = params[3];
    console.log( params );
    for ( var i in subjects ) {
	console.log(i);
	t.equal( functions.ltrap(i, number_of_bits, a, b, z ), subjects[i], "ltrap " + i + " = " + subjects[i]);
    }

}