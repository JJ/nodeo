var test = require('tap').test,
utils = require(__dirname + '/../../lib/Utils.js'),
vector = require(__dirname + '/../../lib/vector.js');


test('loads', function (t) {
    t.ok(vector, 'Loaded OK');
    t.ok( vector.version, 'Version ' + vector.version + ' OK' );
    t.end();
});

test('random', function (t) {
    for ( var i = 2; i <= 4;  i++ ) {
	t.equal( vector.random( i, -1, 2 ).length, i, 'Vector length ' + i + ' OK' );
    }
    t.end();
});


var population_size = 16,
chromosome_size = 2;

test('vectors', function (t) {
    for ( var i = 0; i < population_size; i ++ )  {
	var chromosome = new vector.Vector ( vector.random( chromosome_size, -1, 2 ) );
	console.log(chromosome);
	t.equal(chromosome.vector.length, chromosome_size, "Length OK" );
        chromosome.fitness =  1-chromosome.vector[0]*chromosome.vector[1];
	t.ok( chromosome.fitness >= 0, "fitness" );
	var new_chromosome = vector.mutate(chromosome);
	t.ok( new_chromosome.vector[0] !== chromosome.vector[0] || new_chromosome.vector[1] !== chromosome.vector[1], "mutation ");
	var to_cross = new vector.Vector ( vector.random( chromosome_size, -1, 2 ) );
	var crossed = vector.crossover( to_cross, chromosome );
	t.ok( crossed[0].vector[0] !== chromosome.vector[0] || crossed[0].vector[1] !== chromosome.vector[1], "crossover ");

    }

    t.end();
});

