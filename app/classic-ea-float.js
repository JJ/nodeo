#!/usr/bin/env node

'use strict';

var  nodeo = require('../lib/nodeo.js'),
Classic = nodeo.classic_float,
utils = nodeo.utils;

var population_size = process.argv[2] || 256;
var chromosome_size = process.argv[3] || 256;

var eo = new Classic( { population_size: population_size,
			chromosome_size: chromosome_size,
			fitness_func: utils.sum_ones } );
console.log( "Testing chromosomes composed of floats...");
console.log( "Experiment will end when fitness (sum of floats) is greater or equal to ", (chromosome_size*0.95).toFixed(4) );

do {
    eo.generation();
    console.log( eo.population[0].fitness.toFixed(4) );
} while ( eo.population[0].fitness < chromosome_size*.95 ); // Fitness is reaching 95% of chromosome size

console.log(eo.population[0]);
