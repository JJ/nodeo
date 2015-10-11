#!/usr/bin/env node

'use strict';

// Optimization of the deceptive trap function
// It might take a long time... or never end. Just ctrl-C when you're done.

var  nodeo = require('../lib/nodeo.js'),
Classic = nodeo.classic,
trap = nodeo.trap;

var population_size = process.argv[2] || 4096;
var traps = process.argv[3] || 100;
var trap_len = process.argv[4] || 4;
var trap_b = process.argv[5] || 2;
var chromosome_size = traps*trap_len;
var trap_fitness = new trap.Trap(  { "l": trap_len, 
				     "a": 1, 
				     "b": trap_b, 
				     "z": trap_len -1  } );

var eo = new Classic( { population_size: population_size,
			chromosome_size: chromosome_size,
			fitness_func: trap_fitness } );

do {
    eo.generation();
    console.log( eo.population[0] );
} while ( eo.population[0].fitness < traps*trap_b );

console.log(eo.population);
