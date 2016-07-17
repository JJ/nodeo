var test = require('tap').test,
nodeo = require(__dirname + '/../../lib/nodeo.js');

var CF = nodeo.chromosome_float;
var Classic = nodeo.classic_float;

test('loads', function (t) {
         t.ok(Classic, 'Loaded OK');
         t.end();
     });

var population_size = 16,
population = new Array([]),
chromosome_size = 16;


test('Number vector chromosomes', function (t) {
    var tmpChr=[];
    for( var i=0; i<chromosome_size; ++i ) tmpChr[i]=Math.random();
    for ( var i = 0; i < population_size; i ++ )  {
	var chromosome = new CF.Chromosome( tmpChr );
	population.push( chromosome );
	t.equal(chromosome.vector.length, chromosome_size, "Length " + chromosome.vector.toString() + " OK" );
	/*var is_match = chromosome.string.match(/[01]+/g );
	t.ok(is_match, "Binary");
        chromosome.fitness =  nodeo.utils.max_ones( chromosome.string );
        */
	t.ok( chromosome.fitness >= 0, "fitness" );

    // Testing mutation
	var new_chromosome = CF.mutate(chromosome);
	t.ok( !new_chromosome.vector.reduce(function(prev,e,i){return prev && e==chromosome.vector[i];},true), // Compares vector position by position
         "mutation " + chromosome.vector.toString() + " - " + new_chromosome.vector.toString());
	t.equal( new_chromosome.vector.length, chromosome.vector.length, "Length mutation" );
	if ( nodeo.utils.sum_ones( new_chromosome.vector )<chromosome_size/2 ) {
        // Testing invert
	    var to_cross = CF.invert( chromosome );
	    t.ok( to_cross.vector.reduce(function(prev,e,i){
		return prev && e !== chromosome.vector[i];
	    },true)
		  , "invert " + to_cross.vector.toString() + " - " + chromosome.vector.toString() );

        // Testing crossover
	    var crossed = CF.crossover( to_cross, chromosome );
	    t.ok( !crossed[0].vector.reduce(function(prev,e,i){return prev && e==to_cross.vector[i];},true),  // Compares vector position by position
		  "Crossed 1 " + crossed[0].vector + "!==" + chromosome.vector);
	    t.equal( crossed[0].vector.length,chromosome.vector.length, "Crossed 1's Length");
//	    t.ok( !crossed[1].vector.reduce(function(prev,e,i){return prev && e==to_cross.vector[i];},true),  // Compares vector position by position
//            "Crossed 2 " + crossed[1].vector + "!==" + chromosome.vector);
	    t.equal( crossed[1].vector.length,to_cross.vector.length, "Crossed 2's Length");
	}
    }

    t.end();
});

var tournament_size = 3,
pool_size = population_size;

test('Nodeo', function(t) {
    var eo = new Classic( { population_size: population_size,
			    chromosome_size: chromosome_size,
			    fitness_func: nodeo.utils.sum_ones} );
//    console.log("EO is ", eo);
    t.ok( eo, "Tipo");
    var dummy = new CF.Chromosome();
    var chosen = eo.tournament_selection( tournament_size, pool_size);
    t.equal( chosen.length, pool_size, "Size OK");
    var new_population = CF.reproduction( chosen);
    t.equal( new_population.length, population_size, "Size OK");
    eo.generation();
    var the_best = eo.population[0];
    var the_best_fitness = the_best.fitness;
    eo.generation();
    t.ok( eo.population[0].fitness >= the_best_fitness, "Improving fitness" );
    do {
	eo.generation();
    } while ( eo.population[0].fitness < (chromosome_size-1) );
    t.equal(eo.population[0].fitness<(chromosome_size-1), false, "Finished EA "+eo.population[0].vector.toString()+" "+eo.population[0].fitness );
    t.end();
});



