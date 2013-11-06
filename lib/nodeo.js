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

// Mutate all chromosomes in the population
nodeo.mutate_population = function  ( pool ) {
    for ( var i=0 in pool ) {
	console.log( pool[i] );
	var mutation_point = Math.floor( Math.random() * pool[i].length);
	var temp = pool[i];
	var flip_bit = (temp.substr(mutation_point,1)=='1')?"0":"1";
	pool[i] = temp.substring(0,mutation_point-1) +
	    flip_bit + 
	    temp.substring(mutation_point,temp.length) ;
	console.log( pool[i] );
    }
};


