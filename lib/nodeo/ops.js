// A few operators that can be used here and there
/*jslint node: true */
'use strict';
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>


// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

var ops = exports;

// Bit-flips the whole chromosome
ops.invert = function (chromosome) {
    var inverted = '';
    for (var i = 0; i < inverted.length; i ++ ) {
	inverted += chromosome.charAt(i).match(/1/)?"0":"1";
    }
    return inverted;
};

// Bit-flips a single bit
ops.mutate = function (chromosome ) {

    var mutation_point = Math.floor( Math.random() * chromosome.length);
    var temp = chromosome;
    var flip_bit = temp.charAt(mutation_point).match(/1/)?"0":"1";
    chromosome = temp.substring(0,mutation_point) +
	flip_bit + 
	temp.substring(mutation_point+1,temp.length) ;
    return chromosome;
};

// Interchanges a substring between the two parents
ops.crossover = function ( chrom1, chrom2 ) {
    // Do nothing if they are the same.
    if (chrom1 === chrom2) {
	return [chrom1,chrom2];
    }
    var length = chrom1.length;
    var xover_point;
    var range;
//    console.log("Crossover " + chrom1 + " " + chrom2 );
    var counter = 0;
    do {
	xover_point = Math.floor( Math.random() * length);
	range = 1 + Math.floor(Math.random() * (length - xover_point) );
//	console.log( "Snippets " + chrom1.substring(xover_point+range,length) + "===" + chrom2.substring(xover_point+range,length) ) ; 
	counter++;
    } while ( counter < chrom1.length && (chrom1.substring(xover_point+range,length) === chrom2.substring(xover_point+range,length) ) );
    if ( counter < chrom1.length ) {
	var new_chrom1 = chrom1.substr(0,xover_point);
	var new_chrom2 = chrom2.substr(0,xover_point);
	new_chrom1+= chrom2.substring(xover_point,xover_point+range) +
	    chrom1.substring(xover_point+range,length);
	new_chrom2+= chrom1.substring(xover_point,xover_point+range) +
	    chrom2.substring(xover_point+range,length);
	return [new_chrom1, new_chrom2];
    } else { // must be different, but very little... let's just swap
	return [chrom2, chrom1];
    }
};

  
// Mutate all chromosomes in the population
ops.mutate_population = function  ( pool ) {
    for ( var i in pool ) {
	pool[i] = ops.mutate( pool[i]);
    }
};


// Applies operators to the pool
ops.reproduction = function (  pool ) {
    var offspring = [];
    while (pool.length ) {
	var first = pool.splice( Math.floor(Math.random()*pool.length), 1 );
	var second = pool.splice( Math.floor(Math.random()*pool.length), 1 );
	var crossovers = ops.crossover( first[0], second[0] );
	for ( var i in crossovers ) {
	    offspring.push( ops.mutate(crossovers[i]));
	}
    }
    return offspring;
};
