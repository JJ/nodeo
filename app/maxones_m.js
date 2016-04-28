#!/usr/bin/env node

'use strict';

var nodeo = require( "../lib/nodeo.js"),
Chromosome = nodeo.chromosome,
maxones = nodeo.utils.max_ones,
maxones_m = nodeo.utils.max_ones_m;

function time_maxones(number) {
    var inicioTiempo = process.hrtime();
    for ( var i = 0; i < number; i++ ) {
	var indi = new Chromosome (nodeo.utils.random( length ) );
	var fitness = maxones_m( indi )
    }
    var finalTiempo = process.hrtime(inicioTiempo);
    return(finalTiempo[0]+finalTiempo[1]/1e9);
}

var length = 16
var iterations = 100000
var top_length = 65536
do {
    console.log("node-BitString, " + length + ", " + time_maxones( iterations ))
    length = length*2
} while (length <= top_length);
