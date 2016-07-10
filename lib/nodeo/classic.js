// Evolutionary Algorithm, simplified, for node, using `Chromosome` data structure
/*jslint node: true */
'use strict';
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>


// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

var utils = require('./Utils'),
    Chromosome = require('./chromosome'),
    ops = require('./ops');


// Nodeo creates an evolutionary algorithms.
// `options` include
// * `population_size`
// * `fitness_func` that is the fitness used to evaluate all
// individuals. Can be either a function or a fitness object with `apply`
// * `tournament_size` using tournament selection. This is the number
// of individuals in each one
// * `pool_size` reproductive pool size
// * `chromosome_size` used to generate random chromosomes.
// This function generates randomly a population which is used later
// on to start the evolutionary algorithms. 
module.exports = function( options ) {
/*jshint validthis: true */
    for ( var i in options ) {
	this[i] = options[i];
    }
    if ( ! this.population_size ) {
	return new Error ("0 population size");
    }
    if ( ! this.fitness_func ) {
	return new Error ("No fitness func");
    } else if ( typeof( this.fitness_func) === 'function' ) {
	this.fitness_obj = new Fitness( options.fitness_func );
    } else {
	this.fitness_obj = this.fitness_func;
    }
    if ( !this.tournament_size ) {
	this.tournament_size = 2;
    }
    if ( !this.pool_size ) {
	this.pool_size = this.population_size - 2;
    }

    if ( !this.chromosome_size || isNaN(this.chromosome_size) ) {
	throw "Chromosome size error";
    }
    this.population = [];
//    console.log( this.fitness_obj.apply );
    do {
	var this_string = utils.random( this.chromosome_size );
	var chromosome = new Chromosome( this_string,
					 this.fitness_obj.apply( this_string ) );
	this.population.push( chromosome );
    } while( this.population.length < this.population_size );

    // Methods
    this.tournament_selection = tournament_selection;
    this.evaluation = evaluation;
    this.generation= generation;
    this.rank=rank;
};

// create fitness function object if it does not exist
function Fitness ( f ) {
 /*jshint validthis: true */  
    this.apply = f;  
}

// Selects a new population of size pool_size via comparing tournament_size chromosomes and taking the best
function tournament_selection( tournament_size, pool_size ) {
/*jshint validthis: true */
    var pool = [];
    if ( tournament_size <= 1 ) {
	return new Error ("Tournament size too small");
    }
    do {
//	var joust = [];
	var best =  this.population[ Math.floor(Math.random()*this.population.length) ] ;
	for ( var i = 1; i < tournament_size; i ++) {
	    var another= this.population[ Math.floor(Math.random()*this.population.length) ];
	    if ( another.fitness > best.fitness) {
		best = another;
	    }
	}
	pool.push( best );
    } while (pool.length < pool_size );
    return pool;
}

// Evaluates all the population not in cache
function evaluation( new_guys ) {
/*jshint validthis: true */
    for (var i in new_guys) {	
	new_guys[i].fitness = this.fitness_obj.apply( new_guys[i].string );
    }
}

// sort population
function rank () {
    /*jshint validthis: true */
    var sorted_population = this.population.sort( function(a,b){ return b.fitness - a.fitness; } );
    this.population = sorted_population;
}

// Single generation
function generation() {
    /*jshint validthis: true */
    var chosen = this.tournament_selection( this.tournament_size, this.pool_size);
    this.rank(); // to get the best
    var the_best = [this.population[0],this.population[1]];
    var new_population = Chromosome.reproduction( chosen);
    this.evaluation(new_population);
    this.population = the_best.concat( new_population );
    this.rank(); // ranking twice????
}


