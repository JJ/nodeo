// Chromosome for Evolutionary Algorithms that uses floating point vectors
/*jslint node: true */
'use strict';
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>

/*jshint smarttabs:true */

// Applies operators to the pool
function reproduction(  pool ) {
    var offspring = [];
    while (pool.length ) {
	var first = pool.splice( Math.floor(Math.random()*pool.length), 1 );
	var second = pool.splice( Math.floor(Math.random()*pool.length), 1 );
	var crossovers = crossover( first[0], second[0] );
	for ( var i in crossovers ) {
	    offspring.push( mutate(crossovers[i]));
	}
    }
    return offspring;
}

// Creates a single chromosome. Includes all utility functions
function Vector(vector,fitness){
    /*jshint validthis: true */
    this.vector = vector;
    this.fitness = fitness;
}

// Changes a single element
function mutate (chromosome ) {

    var mutation_point = Math.floor( Math.random() * chromosome.vector.length);
    var temp = [];
    for ( var i in chromosome.vector ) {
	temp[i] = chromosome.vector[i];
    }
    temp[mutation_point] = temp[mutation_point]-0.2+Math.random()*0.1;
    return new Vector( temp );
}

// Interchanges a substring between the two parents
function crossover ( chrom1, chrom2 ) {
    var length = chrom1.vector.length;
    var xover_point = Math.floor( Math.random() * length);
    var range = 1 + Math.floor(Math.random() * (length - xover_point) );
    var new_chrom1 = chrom1.vector.splice(0,xover_point);
    var new_chrom2 = chrom2.vector.splice(0,xover_point);
    new_chrom1.push( chrom2.vector.splice(xover_point,xover_point+range));
    new_chrom1.push( chrom1.vector.splice(xover_point+range,length) );
    new_chrom2.push( chrom1.vector.splice(xover_point,xover_point+range) );
    new_chrom2.push( chrom2.vector.splice(xover_point+range,length));
    return [new Vector(new_chrom1), new Vector(new_chrom2)];
}

// Returns a random vector of `n` components with minimum `min` and range `range`
function random( n, min, range ) {
    var $vector = [];
    for (var i = 0; i < n; i ++ ) {
	$vector.push( min+Math.random()*range );
    }
    return $vector;
}
	

module.exports =  {
    version: '0.0.1',
    Vector : Vector,
    mutate: mutate,
    crossover: crossover, 
    random: random,
    reproduction: reproduction };
