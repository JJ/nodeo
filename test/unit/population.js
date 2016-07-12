var test = require('tap').test,
nodeo = require(__dirname + '/../../lib/nodeo.js');

var Population = nodeo.Population,
    utils=nodeo.utils,
    mmdp = nodeo.MMDP,
    ackley = nodeo.Ackley,
    rastrigin = nodeo.Rastrigin,
    hiff = nodeo.HIFF;

test('loads', function (t) {
         t.ok(Population, 'Loaded OK');
         t.end();
});

var running_population;
var chromosome_size = 32;
var population_size = 32;

test("Creation", function(t) {
    var population = new Population();
    t.type( population, "Population", "is Population" );

    var random_chromosome_32 = function() {
	return utils.random( chromosome_size );
    };
    population.initialize( population_size, random_chromosome_32);
    running_population = population.chromosomes();
    t.equal( running_population.length, population_size, "has been created" );

    t.end();
});

console.log( running_population);

test("Evaluation", function(t) {
    var population = new Population( running_population );

    t.type( population, "Population", "is Population" );
    t.equal( population.chromosomes().length, population_size, "has been created" );
    var this_mmdp = new mmdp.MMDP();
    var this_fitness = function( individual ) {
	return this_mmdp.apply( individual );
    };
    population.evaluate( this_fitness );
    var sorted_population = population.rank();
    t.equal( population.fitness_of[sorted_population[0]]
	     >= population.fitness_of[sorted_population[1]]
	     , true
	     , "Sorted" );
    
    t.end();
});


