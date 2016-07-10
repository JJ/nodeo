var test = require('tap').test,
nodeo = require(__dirname + '/../../lib/nodeo.js');

var Chromosome = nodeo.chromosome;
var Classic = nodeo.classic;

test('loads', function (t) {
         t.ok(Classic, 'Loaded OK');
         t.end();
     });

var population_size = 16,
population = new Array([]),
chromosome_size = 16;

function palindrome( str ) {
    var palindrome = true;
    for ( var i = 0; i < str.length/2; i++ ) { 
	palindrome = palindrome && (str.charAt(i) ===  str.charAt(str.length-1-i))
    }
    return palindrome;
}

test('chromosomes', function (t) {
    for ( var i = 0; i < population_size; i ++ )  {
	var chromosome = new Chromosome (nodeo.utils.random( chromosome_size ) );
	population.push( chromosome );
	t.equal(chromosome.string.length, chromosome_size, "Length " + chromosome.string + " OK" );
	var is_match = chromosome.string.match(/[01]+/g );
	t.ok(is_match, "Binary");
        chromosome.fitness =  nodeo.utils.max_ones( chromosome.string );
	t.ok( chromosome.fitness >= 0, "fitness" );
	var new_chromosome = Chromosome.mutate(chromosome);
	t.ok( new_chromosome.string !== chromosome.string, "mutation " + chromosome.string + " - " + new_chromosome.string);
	t.equal( new_chromosome.string.length, chromosome.string.length, "Length mutation" );
	if ( !palindrome( new_chromosome.string ) ) {
	    var to_cross = Chromosome.invert( chromosome );
	    t.ok( to_cross.string.charAt(0) !== chromosome.string.charAt(0), "invert" );
	    var crossed = Chromosome.crossover( to_cross, chromosome );
	    t.ok( crossed[0].string !== chromosome.string, 
		  "Crossed 1 " + crossed[0].string + "!==" + chromosome.string);
	    t.equal( crossed[0].string.length,chromosome.string.length, "Length");
	    t.ok( crossed[1].string !== to_cross.string, "Crossed 2 " + crossed[1].string + "!==" + chromosome.string);
	    t.equal( crossed[1].string.length,to_cross.string.length, "Length");
	}
    }

    t.end();
});

var tournament_size = 3,
pool_size = population_size;

test('Nodeo', function(t) {
    var eo = new Classic( { population_size: population_size,
			    chromosome_size: chromosome_size,
			    fitness_func: nodeo.utils.max_ones } );
    console.log(eo);
    t.ok( eo, "Tipo");
    var chosen = eo.tournament_selection( tournament_size, pool_size);
    t.equal( chosen.length, pool_size, "Size OK");
    var new_population = Chromosome.reproduction( chosen);
    t.equal( new_population.length, population_size, "Size OK");
    eo.generation();
    var the_best = eo.population[0];
    var the_best_fitness = the_best.fitness;
    eo.generation();
    t.ok( eo.population[0].fitness >= the_best_fitness, "Improving fitness" );
    do {
	eo.generation();
    } while ( eo.population[0].fitness < chromosome_size );
    t.equal(eo.population[0].fitness, chromosome_size, "Finished EA" );
    t.end();
});



