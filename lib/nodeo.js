// Evolutionary Algorithm, simplified, for node.js
/*jslint node: true */
'use strict';
// * @license GPL v3
// * @package nodeo
// * @author J. J. Merelo <jjmerelo@gmail.com>


// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

var nodeo = exports;

nodeo.utils = require('./nodeo/Utils');
nodeo.Population = require('./nodeo/Population');
nodeo.ops = require('./nodeo/ops');
nodeo.Ackley = require('./nodeo/Ackley');
nodeo.classic = require('./nodeo/classic');
nodeo.classic_float = require('./nodeo/classic-float');
nodeo.MMDP = require('./nodeo/MMDP');
nodeo.HIFF = require('./nodeo/HIFF');
nodeo.chromosome = require('./nodeo/chromosome');
nodeo.chromosome_float = require('./nodeo/chromosome-float.js');
nodeo.trap = require('./nodeo/trap');
nodeo.vector = require('./nodeo/vector');
nodeo.functions = require('./nodeo/functions');
nodeo.Rastrigin = require('./nodeo/Rastrigin');

// Nodeo creates an evolutionary algorithms.
// `options` include
// * `population_size`
// * `fitness_func` that is the fitness used to evaluate all
// individuals. Can be either a function or a fitness object with the
// `apply` method
// * `tournament_size` using tournament selection. This is the number
// of individuals in each one
// * `pool_size` reproductive pool size
// * `chromosome_size` used to generate random chromosomes.
// This function generates randomly a population which is used later
// on to start the evolutionary algorithms. 
function Nodeo( options ) {
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
    this.fitness_of = {};
    this.population = [];
//    console.log( this.fitness_obj.apply );
    do {
	var chromosome = nodeo.utils.random( this.chromosome_size );
	if ( ! (chromosome in this.fitness_of) ) {
//	    console.log(this.fitness_obj.apply);
	    this.fitness_of[chromosome] = this.fitness_obj.apply( chromosome );
//	    console.log(this.fitness_of[chromosome]);
	    this.population.push( chromosome );
	}
    } while( this.population.length < this.population_size );

    // Methods
    this.tournament_selection = tournament_selection;
    this.evaluation = evaluation;
    this.generation= generation;
    this.rank=rank;
    this.incorporate=incorporate;
}

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
	    if ( this.fitness_of[another] > this.fitness_of[best]) {
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
	if ( !this.fitness_of[new_guys[i]]) {
//	    console.log( "eval " + new_guys[i] );
	    this.fitness_of[new_guys[i]] = this.fitness_obj.apply( new_guys[i]);
	}
    }
}

// sort population
function rank () {
    /*jshint validthis: true */
    var fitness_of = this.fitness_of;
    var sorted_population = this.population.sort( function(a,b){ return fitness_of[b] - fitness_of[a]; } );
    this.population = sorted_population;
}

// Single generation
function generation() {
    /*jshint validthis: true */
    var chosen = this.tournament_selection( this.tournament_size, this.pool_size);
    this.rank(); // to get the best
    var the_best = [this.population[0],this.population[1]];
    var new_population = nodeo.ops.reproduction( chosen);
    this.evaluation(new_population);
    this.population = the_best.concat( new_population );
    this.rank(); // ranking twice????
}

// Population should be sorted, so the worst is the last. Incorporates a new individual, taking out the worst one
function incorporate( chromosome ) {
    /*jshint validthis: true */
    if ( chromosome.length !== this.chromosome_size ) {
	throw "Bad chromosome length" + chromosome.length + "!=" + this.chromosome_size ;
    }
    this.fitness_of[chromosome] = this.fitness_obj.apply( chromosome );
    this.rank();
    this.population.pop(); // extracts the last
    
}

nodeo.Nodeo = Nodeo;
