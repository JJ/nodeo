#!/usr/bin/env node

'use strict';

var nodeo = require( "../lib/nodeo.js"),
Chromosome = nodeo.chromosome;;

function time_mutations(number,indi) {
    var inicioTiempo = process.hrtime();
    for ( var i = 0; i < number; i++ ) {
	indi = indi.mutate( indi )
    }
    var finalTiempo = process.hrtime(inicioTiempo);
    return(finalTiempo[0]+finalTiempo[1]/1e9);
}

var length = 16
var iterations = 1000000
var top_length = 32768
do {
    var indi = new Chromosome (nodeo.utils.random( length ) );
    console.log("node, BitString, " + length + ", " + time_mutations( iterations, indi ))
    length = length*2
} while (length <= top_length);
