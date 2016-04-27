#!/usr/bin/env node

'use strict';

var nodeo = require( "../lib/nodeo.js"),
Chromosome = nodeo.chromosome,
maxones = nodeo.utils.max_ones;

function time_maxones(number) {
    var inicioTiempo = process.hrtime();
    for ( var i = 0; i < number; i++ ) {
	var indi = random_bitvector( length );
	var fitness = indi.reduce( function(prev, cur, foo, bar) { return prev+cur; } )
    }
    var finalTiempo = process.hrtime(inicioTiempo);
    return(finalTiempo[0]+finalTiempo[1]/1e9);
}

var length = 16
var iterations = 100000
var top_length = 65536
do {
    console.log("node-BitVector, " + length + ", " + time_maxones( iterations ))
    length = length*2
} while (length <= top_length);

// defs
function random_bitvector( length ) {
    var bit_vector = new Array;
    for ( var i = 0; i < length; i ++ ) {
	bit_vector.push( Math.random() >= 0.5?1:0 );
    }
    return bit_vector;
}
	
