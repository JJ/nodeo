#!/usr/bin/env node

'use strict';

var Classic = require('../lib/classic.js'),
utils = nodeo.utils;

var population_size = process.argv[2] || 256;
var chromosome_size = process.argv[3] || 256;

var eo = new Classic( { population_size: population_size,
			chromosome_size: chromosome_size,
			fitness_func: utils.max_ones } );

do {
    eo.generation();
    console.log( eo.population[0] );
} while ( eo.population[0].fitness < chromosome_size );

console.log(eo.population);
