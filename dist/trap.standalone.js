function tabify ( x, l, a, b, z ) {
    var tab = "<table style='border:1px solid black;padding:0;margin:0'><tr>";
    for ( var i = 0; i < x.length; i+=4 ) {
	tab += "<td style='background-color:";
	var this_substr = x.substr(  i, l );
	var num_ones = 0;
	for ( var j = 0;  j < this_substr.length; j++ ) {
	  num_ones += (this_substr.substring(j,j+1) === "1"); 
	}
	var this_result;
	if ( num_ones <= z ) {
	  this_result = a*(z-num_ones)/z;
	} else {
	  this_result = b*(num_ones -z)/(l-z);
	}
	
	var colors=['white','lightgray','darkgray','black'];
	tab += colors[this_result*2]+"'> </td>";
    }
    tab += "</tr></table>";
    return tab;
}

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.nodeo=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process){


'use strict';

// Optimization of the deceptive trap function
// It might take a long time... or never end. Just ctrl-C when you're done.

var Classic = require('../lib/classic.js'),
trap = require('../lib/trap.js');

var population_size = 256;
var traps = 30;
var trap_len = 4;
var trap_b =  2;
var chromosome_size = traps*trap_len;

var trap_fitness = new trap.Trap(  { "l": trap_len, 
				     "a": 1, 
				     "b": trap_b, 
				     "z": trap_len -1  } );

var eo = new Classic( { population_size: population_size,
			chromosome_size: chromosome_size,
			fitness_func: trap_fitness } );

var generation_count=0;

(function do_ea() {
    eo.generation();
    generation_count++;
    if ( (generation_count % 20 === 0) ) {
	console.log(generation_count);
	document.getElementById('res').innerHTML = tabify(eo.population[0].string, trap_len, 1, trap_b, trap_len-1);
    }

    if ( eo.population[0].fitness < traps*trap_b ) {
	setTimeout(do_ea, 5);
    } else {
	console.log(  eo.population[0] );
	document.getElementById('res').innerHTML = tabify(eo.population[0].string, trap_len, 1, trap_b, trap_len-1);
    }
})();

console.log(eo.population);

}).call(this,require('_process'))
},{"../lib/classic.js":4,"../lib/trap.js":7,"_process":8}],2:[function(require,module,exports){
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
    var inverted='';
    for (var i = 0; i < chromosome.string.length; i ++ ) {
	inverted += chromosome.string.charAt(i).match(/1/)?"0":"1";
    }
    return new Chromosome (inverted);
}

// Bit-flips a single bit
function mutate (chromosome ) {

    var mutation_point = Math.floor( Math.random() * chromosome.string.length);
    var temp = chromosome.string;
    var flip_bit = temp.charAt(mutation_point).match(/1/)?"0":"1";
    var clone = temp.substring(0,mutation_point) +
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
	chrom2.string.substring(xover_point+range,length);
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

},{}],4:[function(require,module,exports){
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
    var new_population = this.population[0].reproduction( chosen);
    this.evaluation(new_population);
    this.population = the_best.concat( new_population );
    this.rank(); // ranking twice????
}



},{"./Utils":2,"./chromosome":3,"./ops":6}],5:[function(require,module,exports){
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
    console.log("Working with");
    console.log(x);
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

// L-trap function
functions.ltrap = function(x,l,a,b,z) {
    var total = 0;
    for ( var i = 0;  i < x.length; i+= l ) {
	var this_substr = x.substr(  i, l );
	var num_ones = 0;
	for ( var j = 0;  j < this_substr.length; j++ ) {
	  num_ones += (this_substr.substring(j,j+1) === "1"); 
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

//Masive Multimodal Deceptive Problem, a classic test function
functions.MMDP = function(x) {
    var block_size = 6;
    var unitation = [1,0,0.360384,0.640576,0.360384,0,1];
    var total = 0;
    for ( var i = 0;  i < x.length; i+= block_size ) {
	var this_substr = x.substr(  i, block_size );
	var num_ones = 0;
	for ( var j = 0;  j < this_substr.length; j++ ) {
	  num_ones += (this_substr.substring(j,j+1) === "1"); 
	}
	total += unitation[num_ones];
    }

    return total;
};

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){

// Trap function with Fitness function signature
//
// Trap is a deceptive function that is used, concatenated, to test
// evolutionary algorithms. 
// @license GPL v3
// @package nodeo
// @author J. J. Merelo <jjmerelo@gmail.com>

// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

var functions = require('./functions');
var trap = exports;

// Class definition
// ```
// var trap = new Trap.trap( { l: 3, a: 1, b:2, z = 2})
// ```
//
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

// Applies trap function to chromosome using instance values
function apply( chromosome ){
    return functions.ltrap(chromosome, this.l, this.a, this.b, this.z);    
}

trap.Trap = Trap;

},{"./functions":5}],8:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[1])(1)
});
