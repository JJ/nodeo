var test = require('tap').test,
nodeo = require(__dirname + '/../../lib/nodeo.js'),
fluxeo = nodeo.FluxEO;

var Population = fluxeo.Population,
Selection = fluxeo.Selection,
Tournament = Selection.Tournament,
trap = nodeo.trap,
utils=nodeo.utils;

var l = 4, b=2;

var this_trap = new trap.Trap( { "l": l, 
				 "a": 1, 
				 "b": b, 
				 "z": 3 });

var this_fitness = function( individual ) {
    return this_trap.apply( individual );
};


test('loads', function (t) {
    t.ok(fluxeo, 'Loaded OK');
    t.ok(Tournament, 'Loaded Tournament OK');
    t.end();
});

var running_population;
var chromosome_size = 32;
var population_size = 256;
var tournament_size = 2;
var random_chromosome_32 = function() {
    return utils.random( chromosome_size );
};

var best_fitness = b*chromosome_size/l;
console.log( "Best " + best_fitness );
var solution_found = function ( population ) {
    if ( population.fitness( population.best() ) >= best_fitness ) {
	console.log( "It's true" );
	return true;
    } else {
	return false;
    }
    
};

var population = new Population();
var eo = new fluxeo( this_fitness,
		     new Tournament( tournament_size, population_size-2 ),
		     solution_found);

test("Creation", function(t) {
    t.type( population, "Population", "is Population" );
    population.initialize( population_size, random_chromosome_32);
    eo.evaluate( population, function( population ) {
	var this_population = population.chromosomes();
	t.equal( this_population.length, population_size, "has been created" );
	t.equal( this_population[0] in population.fitness_of, true, "Evaluated");
	t.end();
    });

});


test("Evolution", function(t) {
    eo.create_pool( population, function( population, new_population ) {
	var this_population = population.chromosomes();
	t.equal( population.fitness_of[this_population[0]] 
		 >= population.fitness_of[this_population[1]], true,  "Ranked" );
	t.equal( new_population.length, population_size-2, "New population");
	t.end();
    });

});

test("Replacement", function(t) {
    var old_best = population.best();
    eo.generation( population, function( population ) {
	t.equal( population.size(), population_size, "Renewed population");
	t.equal( population.fitness( old_best ) <=
		 population.fitness( population.best() ), true,
		 "Improving population" );
	t.end();
    });

});


test("Algorithm", function(t) {
    eo.algorithm( population, function( population ) {
	t.equal( population.size(), population_size, "Final population");
	t.equal( population.fitness( population.best() ),  b* chromosome_size/l, "Best found" );
	t.end();
    });

});

