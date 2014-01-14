#!/usr/bin/env node

var nodeo = require('./lib/nodeo.js'),
utils = require('./lib/Utils.js');


var population_size = 16;
var chromosome_size = 16;
var population = new Array;
var fitness_of = new Object;
var tournament_size = 2;
var pool_size = population_size;

for ( var i = 0; i < population_size; i ++ )  {
    var chromosome = utils.random( chromosome_size );
    population.push( chromosome );
    var is_match = chromosome.match(/[01]+/g );
    fitness_of[chromosome] =  utils.max_ones( chromosome );
    var new_chromosome = nodeo.mutate(chromosome);
    console.log(new_chromosome+"\n"+chromosome+"\n");
    if ( i > 0 ) {
	var crossed = new Array;
	crossed = nodeo.crossover( population[i-1],chromosome);
	console.log(population[i-1]+"-"+chromosome + "\n"+crossed[0] + "-" + crossed[1]);
    }
}

var eo = new nodeo.Nodeo( { population_size: population_size,
			    chromosome_size: chromosome_size,
			    fitness_func: utils.max_ones } );
console.log(eo);
var chosen = eo.tournament_selection( tournament_size, pool_size);
console.log(chosen);
var new_population = eo.reproduction( chosen);
console.log(new_population);