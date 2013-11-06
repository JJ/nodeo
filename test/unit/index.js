var test = require('tap').test,
    nodeo = require(__dirname + '/../../lib/nodeo.js');

var population_size = 16;
var chromosome_size = 16;
var population = new Array;
var fitness_of = new Object;

test('loads', function (t) {
         t.ok(nodeo, 'Loaded OK');
         t.end();
     });

test('chromosomes', function (t) {
	 for ( var i = 0; i < population_size; i ++ )  {
	     var chromosome = nodeo.random( chromosome_size );
	     population.push( chromosome );
	     t.equal(chromosome.length, chromosome_size, "Length " + chromosome + " OK" );
	     var is_match = chromosome.match(/[01]+/g );
	     t.ok(is_match, "Binary");
             fitness_of[chromosome] =  nodeo.max_ones( chromosome );
	     t.ok( fitness_of[chromosome] >= 0, "fitness" );
	     var new_chromosome = nodeo.mutate(chromosome);
	     t.ok( new_chromosome != chromosome, "mutation " + chromosome + " - " + new_chromosome);
	     var to_cross = nodeo.invert( chromosome );
	     t.ok( to_cross.charAt(0) != chromosome.charAt(0), "invert" );
	     var crossed = nodeo.crossover( to_cross, chromosome );
	     t.ok( crossed[0] != chromosome, "Crossed" );
	     t.ok( crossed[1] != to_cross, "Crossed" );
	 }

         t.end();
     });


test('mutation', function (t) {
         t.ok(nodeo, 'Loaded OK');
         t.end();
     });


