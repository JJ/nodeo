#!/usr/bin/env node

var nodeo = require('./lib/nodeo.js');


var population_size = 16;
var chromosome_size = 16;
var population = new Array;
var fitness_of = new Object;

 for ( var i = 0; i < population_size; i ++ )  {
     var chromosome = nodeo.random( chromosome_size );
     population.push( chromosome );
     var is_match = chromosome.match(/[01]+/g );
     fitness_of[chromosome] =  nodeo.max_ones( chromosome );
     var new_chromosome = nodeo.mutate(chromosome);
     console.log(new_chromosome+"\n"+chromosome+"\n");
     if ( i > 0 ) {
	 var crossed = new Array;
	 crossed = nodeo.crossover( population[i-1],chromosome);
	 console.log(population[i-1]+"-"+chromosome + "\n"+crossed[0] + "-" + crossed[1]);
     }
}