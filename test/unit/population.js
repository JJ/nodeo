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

test("Creation", function(t) {
    var population = new Population();
    t.type( population, "Population", "is Population" );
    var chromosome_size = 32;
    var population_size = 32;
    var random_chromosome_32 = function() {
	return utils.random( chromosome_size );
    };
    population.initialize( population_size, random_chromosome_32);
    t.equal( population.chromosomes().length, chromosome_size, "has been created" );
    
    t.end();
});


