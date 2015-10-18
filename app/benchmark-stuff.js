#!/usr/bin/env node

'use strict';

var nodeo = require( "../lib/nodeo.js"),
hiff = nodeo.HIFF,
this_HIFF = new hiff.HIFF();

var chromosomes = new Array;
for (var i=0; i< 100000; i++ ) {
    var this_chromosome = '';
    for ( var j=0;  j < 256; j++ ) {
	this_chromosome += (Math.random()>=0.5)?'1':'0';
    }
    chromosomes.push(this_chromosome);
}
for (var i in chromosomes ){
    this_HIFF.apply(chromosomes[i]);
}

    
    
	
