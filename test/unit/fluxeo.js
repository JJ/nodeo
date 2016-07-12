var test = require('tap').test,
    fluxeo = require(__dirname + '/../../lib/FluxEO.js'),
    nodeo = require(__dirname + '/../../lib/nodeo.js');

var Population = fluxeo.Population,
    mmdp = nodeo.MMDP,
    utils=nodeo.utils;

var this_mmdp = new mmdp.MMDP();
var this_fitness = function( individual ) {
    return this_mmdp.apply( individual );
};

test('loads', function (t) {
    t.ok(fluxeo, 'Loaded OK');
    t.end();
});

var running_population;
var chromosome_size = 32;
var population_size = 32;
var random_chromosome_32 = function() {
    return utils.random( chromosome_size );
};

test("Creation", function(t) {
    var population = new Population();
    t.type( population, "Population", "is Population" );
 
    population.initialize( population_size, random_chromosome_32);
    running_population = population.chromosomes();
    t.equal( running_population.length, population_size, "has been created" );

    t.end();
});

console.log( running_population);

