var test = require('tap').test,
utils = require(__dirname + '/../../lib/Utils.js'),
Chromosome = require(__dirname + '/../../lib/chromosome.js'),
Classic = require(__dirname + '/../../lib/classic.js');

test('loads', function (t) {
         t.ok(Classic, 'Loaded OK');
         t.end();
     });

var population_size = 16,
population = new Array([]),
chromosome_size = 16;

test('chromosomes', function (t) {
    for ( var i = 0; i < population_size; i ++ )  {
	var chromosome = new Chromosome (utils.random( chromosome_size ) );
	population.push( chromosome );
	t.equal(chromosome.string.length, chromosome_size, "Length " + chromosome.string + " OK" );
	var is_match = chromosome.string.match(/[01]+/g );
	t.ok(is_match, "Binary");
        chromosome.fitness =  utils.max_ones( chromosome.string );
	t.ok( chromosome.fitness >= 0, "fitness" );
	var new_chromosome = chromosome.mutate(chromosome);
	t.ok( new_chromosome.string !== chromosome.string, "mutation " + chromosome.string + " - " + new_chromosome.string);
	t.equal( new_chromosome.string.length, chromosome.string.length, "Length mutation" );
	var to_cross = chromosome.invert( chromosome );
	t.ok( to_cross.string.charAt(0) !== chromosome.string.charAt(0), "invert" );
	var crossed = chromosome.crossover( to_cross, chromosome );
	t.ok( crossed[0].string !== chromosome.string, "Crossed" );
	t.equal( crossed[0].string.length,chromosome.string.length, "Length");
	t.ok( crossed[1].string !== to_cross.string, "Crossed" );
	t.equal( crossed[1].string.length,to_cross.string.length, "Length");
    }

    t.end();
});

var tournament_size = 3,
pool_size = population_size;

test('Nodeo', function(t) {
    var eo = new Classic( { population_size: population_size,
			    chromosome_size: chromosome_size,
			    fitness_func: utils.max_ones } );
    console.log(eo);
    t.ok( eo, "Tipo");
    var dummy = new Chromosome();
    var chosen = eo.tournament_selection( tournament_size, pool_size);
    t.equal( chosen.length, pool_size, "Size OK");
    var new_population = dummy.reproduction( chosen);
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



