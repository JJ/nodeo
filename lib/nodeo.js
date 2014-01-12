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

// Bit-flips the whole chromosome
function invert (chromosome) {
    var inverted = '';
    for ( var i = 0; i < inverted.length; i ++ ) {
	inverted += chromosome.charAt(i).match(/1/)?"0":"1";
    }
    return inverted;
}
nodeo.invert=invert;

// Bit-flips a single bit
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

// Interchanges a substring between the two parents
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


function Nodeo( options ) {
    for ( var i in options ) {
	this[i] = options[i];
    }
    if ( ! this.population_size ) {
	return new Error ("0 population size");
    }
    if ( ! this.fitness_func ) {
	return new Error ("No fitness func");
    }
    if ( !this.tournament_size ) {
	this.tournament_size = 2;
    }
    if ( !this.pool_size ) {
	this.pool_size = this.population_size - 2;
    }
    this.fitness_of = new Object;
    this.population = new Array;
    do {
	var chromosome = nodeo.random( this.chromosome_size );
	if ( ! (chromosome in this.fitness_of) ) {
	    this.fitness_of[chromosome] = this.fitness_func( chromosome );
	    this.population.push( chromosome );
	}
    } while( this.population.length < this.population_size );

    // Methods
    this.tournament_selection = tournament_selection;
    this.reproduction = reproduction;
    this.evaluation = evaluation;
    this.generation= generation;
}

// Selects a new population of size pool_size via comparing tournament_size chromosomes and taking the best
function tournament_selection( tournament_size, pool_size ) {
    var pool = new Array;
    if ( tournament_size <= 1 ) {
	return new Error ("Tournament size too small");
    }
    do {
	var joust = new Array;
	var best =  this.population[ Math.floor(Math.random()*this.population.length) ] ;
	for ( var i = 1; i < tournament_size; i ++) {
	    var another= this.population[ Math.floor(Math.random()*this.population.length) ];
	    if ( this.fitness_of[another] > this.fitness_of[best]) {
		best = another;
	    }
	}
	pool.push( best );
    } while (pool.length < pool_size );
    return pool;
}

// Applies operators to the pool
function reproduction(  pool ) {
    var offspring = new Array;
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

// Evaluates all the population not in cache
function evaluation( new_guys ) {
    for (var i in new_guys) {
	if ( !this.fitness_of[new_guys[i]]) {	
	    this.fitness_of[new_guys[i]] = this.fitness_func( new_guys[i]);
	}
    }
}


// Single generation
function generation() {
    var fitness_of = this.fitness_of;
    var sorted_population = this.population.sort( function(a,b){ return fitness_of[b] - fitness_of[a] } );
    var chosen = this.tournament_selection( this.tournament_size, this.pool_size);
    var the_best = [sorted_population[0],sorted_population[1]];
    var new_population = this.reproduction( chosen);
    this.evaluation(new_population);
    this.population = the_best.concat( new_population );
}

nodeo.Nodeo = Nodeo;