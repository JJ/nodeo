function tabify ( bitstring ) {
    var tab = "<table style='border:1px solid black;padding:0;margin:0'><tr>";
    for ( var i = 0; i < bitstring.length; i ++ ) {
	tab += "<td style='background-color:";
	if (bitstring.substring(i,i+1) == "1") {
	    tab += "black";
	} else {
	    tab += "white";
	}
	tab+="'> </td>";
	if (  (i + 1 ) % 40 == 0 )  {
	    console.log( i );
	    tab += "</tr>\n<tr>";
	}
    }
    tab += "</tr></table>";
    return tab;
}

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.nodeo=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process){

var Classic = require('../lib/classic.js'),
utils = require('../lib/Utils.js');

var population_size = 128;
var chromosome_size = 128;

var eo = new Classic( { population_size: population_size,
			chromosome_size: chromosome_size,
			fitness_func: utils.max_ones } );

var generation_count=0;

(function do_ea() {
    eo.generation();
    generation_count++;
    if ( (generation_count % 20 === 0) ) {
	console.log(generation_count);
	document.getElementById('res').innerHTML = tabify(eo.population[0].string);
    }

    if ( eo.population[0].fitness < chromosome_size ) {
	setTimeout(do_ea, 5);
    } else {
	console.log(  eo.population[0] );
	document.getElementById('res').innerHTML = tabify(eo.population[0].string);
    }
})();
    

}).call(this,require('_process'))
},{"../lib/Utils.js":2,"../lib/classic.js":4,"_process":6}],2:[function(require,module,exports){
/**
 * Utility functions for NodEO
 * 
 * @license GPL v3
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 */

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



},{"./Utils":2,"./chromosome":3,"./ops":5}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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
