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

function mutate  (chromosome ) {

    var mutation_point = Math.floor( Math.random() * chromosome.length);
    var temp = chromosome;
    console.log( "=" + chromosome );
    var flip_bit = temp.charAt(mutation_point).match(/1/)?"0":"1";
    console.log(temp.substring(0,mutation_point));
    console.log(temp.charAt(mutation_point) + " - " + flip_bit + " p " + mutation_point);
    console.log(temp.substring(mutation_point+1,temp.length) );
    chromosome = temp.substring(0,mutation_point) +
	flip_bit + 
	temp.substring(mutation_point+1,temp.length) ;
    console.log("M"+chromosome);
    return chromosome;
}

nodeo.mutate = mutate;

// Mutate all chromosomes in the population
nodeo.mutate_population = function  ( pool ) {
    for ( var i=0 in pool ) {
	pool[i] = mutate( pool[i])
    }
};


