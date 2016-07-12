var test = require('tap').test,
    fluxeo = require(__dirname + '/../../lib/FluxEO.js'),
    nodeo = require(__dirname + '/../../lib/nodeo.js');

var Population = fluxeo.Population,
    Selection = fluxeo.Selection,
    Tournament = Selection.Tournament,
    mmdp = nodeo.MMDP,
    utils=nodeo.utils;

var this_mmdp = new mmdp.MMDP();
var this_fitness = function( individual ) {
    return this_mmdp.apply( individual );
};

test('loads', function (t) {
    t.ok(fluxeo, 'Loaded OK');
    t.ok(Tournament, 'Loaded Tournament OK');
    t.end();
});

var running_population;
var chromosome_size = 32;
var population_size = 32;
var tournament_size = 2;
var random_chromosome_32 = function() {
    return utils.random( chromosome_size );
};


var population = new Population();
var eo = new fluxeo( this_fitness,
		     new Tournament( tournament_size, population_size-1 ));

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
    eo.reproduce( population, function( population, new_population ) {
	var this_population = population.chromosomes();
	t.equal( population.fitness_of[this_population[0]] 
		 >= population.fitness_of[this_population[1]], true,  "Ranked" );
	t.equal( new_population.length, population_size-1, "New population");
	t.end();
    });

});

test("Replacement", function(t) {
    eo.renew( population, function( population ) {
	t.equal( population.size, population_size, "Renewed population");
	t.end();
    });

});



