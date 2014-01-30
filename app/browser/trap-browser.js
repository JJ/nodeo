// Created with browserify
// Thanks to andreypopp for his help making this work.
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var nodeo = require('../../lib/nodeo.js'),
trap = require('../../lib/trap.js');

// get line chart canvas
var buyers = document.getElementById('fitness').getContext('2d');

// draw line chart
var this_chart = new Chart(buyers);

// GA conf
var conf = {  "max_evaluations": 1000000,
	      "population_size": 512,
	      "fitness": { "l": 4, 
			   "a": 1, 
			   "b": 2, 
			   "z": 3,
			   "traps": 40 }
	   };

var traps = conf.fitness.traps;
var chromosome_size = conf.fitness.l*traps;
var log = [];
log.push( conf );
var total_generations = 0;

var trapf = new trap.Trap( conf.fitness );

var eo = new nodeo.Nodeo( { population_size: conf.population_size,
				chromosome_size: chromosome_size,
				fitness_func: trapf } );

console.log( "Starting ");

// Chart data

 var fitness_data = {
                labels : [],
                datasets : [
                {
                    fillColor : "rgba(172,194,132,0.4)",
                    strokeColor : "#ACC26D",
                    pointColor : "#fff",
                    pointStrokeColor : "#9DB86D",
                    data : []
                }
            ]
            };

var generation_count=0;

(function do_ea() {
     eo.generation();
     generation_count++;
     if ( (generation_count % 100 === 0) ) {
	 console.log(generation_count);
	 fitness_data.labels.push(generation_count);
	 fitness_data.datasets[0].data.push(eo.fitness_of[eo.population[0]]);
	 this_chart.Line(fitness_data);
     }
     if( (eo.fitness_of[eo.population[0]] < traps*conf.fitness.b ) 
	 && ( generation_count*conf.population_size < conf.max_evaluations)) {
	 setTimeout(do_ea, 5);
     } else {
	 log.push( {end: { 
			evaluations: generation_count*conf.population_size,
			best : { chromosome : eo.population[0],
				 fitness : eo.fitness_of[eo.population[0]]}}} );
	 console.log( "Finished ", log );
	 console.log(  eo.population[0] );
     }
})();

},{"../../lib/nodeo.js":4,"../../lib/trap.js":5}],2:[function(require,module,exports){
/**
 * Utility functions for NodEO
 * 
 * @license GPL v3
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 */

// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

var Utils = exports;

// Create a random chromosome
Utils.random= function (length){
    var chromosome = '';
    for ( var i = 0; i < length; i++ ){
	chromosome = chromosome + ((Math.random() >0.5)? "1": "0") ;
    }
    return chromosome;
};

// Computes maxOnes fitness
Utils.max_ones = function (chromosome){
    var ones = 0;
    console.log( "MO " + chromosome);
    for ( var i=0; i < chromosome.length; i++ ){ 
	ones += parseInt(chromosome.charAt(i));
    }
    return ones;
};
},{}],3:[function(require,module,exports){
/**
 * Fitness functions for testing
 *
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 * @license GPL v3
 */

// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

var functions = exports;

//Ackley description in http://tracer.lcc.uma.es/problems/ackley/ackley.html
functions.ackley = function(x) {
    var result = 0;
    var sum = 0;
    console.log("Checking for " + x.length);
    for ( var i in x ) {
	sum += x[i]*x[i];
    }
    result = 20 - 20*Math.exp(-0.2*Math.sqrt(sum/x.length));
    var cos = 0;
    for (  i in x ) {
	cos += Math.cos(2*Math.PI*x[i]);
    } 
    result += Math.E - Math.exp(cos/x.length); // needed for precision
    console.log("Result = " + result.toPrecision(6));
    return result; // hack for returning 0
};

functions.ltrap = function(x,l,a,b,z) {
    var total = 0;
    for ( var i = 0;  i < x.length; i+= l ) {
	var this_substr = x.substr(  i, l );
	var num_ones = 0;
	for ( var j = 0;  j < this_substr.length; j++ ) {
	  num_ones += (this_substr.substring(j,j+1) == "1"); 
	}
	var this_result;
	if ( num_ones <= z ) {
	  this_result = a*(z-num_ones)/z;
	} else {
	  this_result = b*(num_ones -z)/(l-z);
	}
	total += this_result;
//	console.log("Total " + i + " :"+total + " num_ones " + num_ones );
    }

    return total;
};
},{}],4:[function(require,module,exports){
/**
 * Evolutionary Algorithm, simplified, for node
 * 
 * @license GPL v3
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 */

// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

var utils = require('./Utils');
var nodeo = exports;

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
    for ( var i in pool ) {
	pool[i] = mutate( pool[i]);
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
	var chromosome = utils.random( this.chromosome_size );
	if ( ! (chromosome in this.fitness_of) ) {
//	    console.log(this.fitness_obj.apply);
	    this.fitness_of[chromosome] = this.fitness_obj.apply( chromosome );
//	    console.log(this.fitness_of[chromosome]);
	    this.population.push( chromosome );
	}
    } while( this.population.length < this.population_size );

    // Methods
    this.tournament_selection = tournament_selection;
    this.reproduction = reproduction;
    this.evaluation = evaluation;
    this.generation= generation;
    this.order=order;
    this.incorporate=incorporate;
}

// create fitness function object
function Fitness ( f ) {
    this.apply = f;
    
}

// Selects a new population of size pool_size via comparing tournament_size chromosomes and taking the best
function tournament_selection( tournament_size, pool_size ) {
    var pool = [];
    if ( tournament_size <= 1 ) {
	return new Error ("Tournament size too small");
    }
    do {
	var joust = [];
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

// Evaluates all the population not in cache
function evaluation( new_guys ) {
    for (var i in new_guys) {
	if ( !this.fitness_of[new_guys[i]]) {
//	    console.log( "eval " + new_guys[i] );
	    this.fitness_of[new_guys[i]] = this.fitness_obj.apply( new_guys[i]);
	}
    }
}

function order () {
    var fitness_of = this.fitness_of;
    var sorted_population = this.population.sort( function(a,b){ return fitness_of[b] - fitness_of[a]; } );
    this.population = sorted_population;
}

// Single generation
function generation() {
    var chosen = this.tournament_selection( this.tournament_size, this.pool_size);
    this.order();
    var the_best = [this.population[0],this.population[1]];
    var new_population = this.reproduction( chosen);
    this.evaluation(new_population);
    this.population = the_best.concat( new_population );
    this.order();
}

// Population should be sorted, so the worst is the last
function incorporate( chromosome ) {
//    console.log(chromosome);
    if ( chromosome.length != this.chromosome_size )
	throw "Bad chromosome length" + chromosome.length + "!=" + this.chromosome_size ;
    if ( !this.fitness_of[chromosome]) {
	this.fitness_of[chromosome] = this.fitness_obj.apply( chromosome );
	this.population.push( chromosome );
	this.order();
	this.population.pop();
    }
    
}

nodeo.Nodeo = Nodeo;
},{"./Utils":2}],5:[function(require,module,exports){
/**
 * Trap function with Fitness function signature
 * 
 * @license GPL v3
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 */

// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

var functions = require('./functions');
var trap = exports;

function Trap( options ) {
    for ( var i in options ) {
	this[i] = options[i];
    }
    if ( !this.l ) {
	this.l = 3;
    }
    if ( !this.a ) {
	this.a = 1;
    }
    if ( !this.b ) {
	this.l = 2;
    }
    if ( !this.z ) {
	this.a = this.l-1;
    }

    // Methods
    this.apply = apply;
}

// Applies trap function to chromosome using defaults
function apply( chromosome ){
//    console.log( "apply " + chromosome);
//    console.log( this);
    return functions.ltrap(chromosome, this.l, this.a, this.b, this.z);
    
}

trap.Trap = Trap;
},{"./functions":3}]},{},[1])