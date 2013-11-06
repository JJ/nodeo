/**
 * Evolutionary Algorithm, simplified, for node
 *
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 */

var nodeo = exports;

// Create a random chromosome
nodeo.random= function (length){
    var chromosome = '';
    for ( var i = 0; i < length; i++ ){
	chromosome = chromosome + ((Math.random() >0.5)? "1": "0") ;
    }
    return chromosome;
};

// Computes maxOnes fitness
nodeo.max_ones = function (chromosome){
    var ones = 0
    for ( var i=0; i < chromosome.length; i++ ){ 
	ones += parseInt(chromosome.charAt(i));
    }
    return ones;
};

function invert (chromosome) {
    var inverted = '';
    for ( var i = 0; i < inverted.length; i ++ ) {
	inverted += chromosome.charAt(i).match(/1/)?"0":"1";
    }
    return inverted;
}
nodeo.invert=invert;


function mutate  (chromosome ) {

    var mutation_point = Math.floor( Math.random() * chromosome.length);
    var temp = chromosome;
    var flip_bit = temp.charAt(mutation_point).match(/1/)?"0":"1";
    chromosome = temp.substring(0,mutation_point) +
	flip_bit + 
	temp.substring(mutation_point+1,temp.length) ;
    return chromosome;
}

nodeo.mutate = mutate;

function crossover ( chrom1, chrom2 ) {
    var length = chrom1.length;
    var xover_point = Math.floor( Math.random() * length);
    var range = 1 + Math.floor(Math.random() * (length - xover_point) );
    var new_chrom1 = chrom1.substr(0,xover_point);
    var new_chrom2 = chrom2.substr(0,xover_point);
    new_chrom1+= chrom2.substring(xover_point,xover_point+range) +
		       chrom1.substring(xover_point+range,length);
    new_chrom2+= chrom1.substring(xover_point,xover_point+range) +
		       chrom2.substring(xover_point+range,length);
   return [new_chrom1, new_chrom2];
}

nodeo.crossover = crossover;
  
// Mutate all chromosomes in the population
nodeo.mutate_population = function  ( pool ) {
    for ( var i=0 in pool ) {
	pool[i] = mutate( pool[i])
    }
};


