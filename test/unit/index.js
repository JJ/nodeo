var test = require('tap').test,
    nodeo = require(__dirname + '/../../lib/nodeo.js');

var population_size = 16;
var chromosome_size = 16;
var population = new Array;

test('Loads OK', function (t) {
	 for ( var i = 0; i < population_size; i ++ )  {
	     var chromosome = nodeo.random( chromosome_size );
	     population.push( chromosome );
	     t.equal(chromosome.length, chromosome_size, "Length " + chromosome + " OK" );
	     var is_match = chromosome.match(/[01]+/g );
	     t.ok(is_match, "Binary")	     
	 }

         t.end();
     });


test('Chromosome', function (t) {
         t.ok(nodeo, 'Loaded OK');
         t.end();
     });