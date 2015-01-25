// Chromosome for Evolutionary Algorithms
/*jslint node: true */
'use strict';
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>

/*jshint smarttabs:true */

// Creates a single chromosome. Includes all utility functions
function Chromosome(string,fitness){
    this.string = string;
    this.fitness = fitness;

    // functions
    this.invert = invert;
    this.mutate = mutate;
    this.crossover=crossover;
    this.reproduction=reproduction;
}
module.exports = Chromosome;


// Bit-flips the whole chromosome
function invert (chromosome) {
    var inverted = '';
    for (var i = 0; i < inverted.length; i ++ ) {
	inverted += chromosome.string.charAt(i).match(/1/)?"0":"1";
    }
    return inverted;
}

// Bit-flips a single bit
function mutate (chromosome ) {

    var mutation_point = Math.floor( Math.random() * chromosome.length);
    var temp = chromosome.string;
    var clone = chromosome.string; 
    var flip_bit = temp.charAt(mutation_point).match(/1/)?"0":"1";
    clone = temp.substring(0,mutation_point) +
	flip_bit + 
	temp.substring(mutation_point+1,temp.length) ;
    return new Chromosome( clone );
}

// Interchanges a substring between the two parents
function crossover ( chrom1, chrom2 ) {
    var length = chrom1.string.length;
    var xover_point = Math.floor( Math.random() * length);
    var range = 1 + Math.floor(Math.random() * (length - xover_point) );
    var new_chrom1 = chrom1.string.substr(0,xover_point);
    var new_chrom2 = chrom2.string.substr(0,xover_point);
    new_chrom1+= chrom2.string.substring(xover_point,xover_point+range) +
	chrom1.string.substring(xover_point+range,length);
    new_chrom2+= chrom1.string.substring(xover_point,xover_point+range) +
	chrom2.stringsubstring(xover_point+range,length);
   return [new Chromosome(new_chrom1), new Chromosome(new_chrom2)];
}

// Applies operators to the pool
function reproduction(  pool ) {
/*jshint validthis: true */
    var offspring = [];
    while (pool.length ) {
	var first = pool.splice( Math.floor(Math.random()*pool.length), 1 );
	var second = pool.splice( Math.floor(Math.random()*pool.length), 1 );
	var crossovers = this.crossover( first[0], second[0] );
	for ( var i in crossovers ) {
	    offspring.push( this.mutate(crossovers[i]));
	}
    }
    return offspring;
}
