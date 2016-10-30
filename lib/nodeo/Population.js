/**
 * Population class for NodEO
 * 
 * @license GPL v3
 * @package nodeo
 * @author J. J. Merelo <jjmerelo@gmail.com>
 */

// To avoid uncomprehensible radix complaint at charAt
/*jshint -W065 */
/*jshint smarttabs:true */

module.exports = Population;

function Population( individuals, fitness_hash) {
    this.living = individuals || new Array;
    this.fitness_of = fitness_hash || new Object;
};

// Sorts the population and returns it sorted
Population.prototype.rank = function() {
    var fitness_of = this.fitness_of;
    return this.living.sort( function(a,b) {
	return fitness_of[b] - fitness_of[a];
    });
};

// Evaluates population
Population.prototype.evaluate = function( fitness ) {
    var fitness_of =  this.fitness_of;
    this.living.map( function( individual ) {
	if ( ! (individual in fitness_of ) ) {
	    fitness_of[individual] = fitness( individual );
	}
    });
};

// Initialize population
Population.prototype.initialize = function( size, create_individual ) {
    for ( var i = 0; i < size;  i ++ ) {
	this.living.push( create_individual() );
    }
};
	    
// Return population
Population.prototype.chromosomes = function() {
    return this.living;
};

// Returns the cached fitness of a particular individual 
Population.prototype.fitness = function( individual ) {
    return this.fitness_of[ individual ];
};

// Removes last elements
Population.prototype.cull = function( how_many ) {
    if ( how_many < this.living.length ) {
	for ( var i = 0; i < how_many; i++ ) {
	    this.living.pop();
	}
    }
};

// Inserts the new population into the old
Population.prototype.insert = function( new_population ) {
    this.living = this.living.concat( new_population );
};

			
// Gets a random one    
Population.prototype.one = function() {
    return this.living[ Math.floor(Math.random()*this.living.length)];
}

// Get first, best if ranked
Population.prototype.best = function() {
    return this.living[0];
}

// Get best n
Population.prototype.best_n = function(n) {
    if ( n < this.living.length ) {
	return this.living.slice(0,n+1);
    }
}

// Population size
Population.prototype.size = function() {
    return this.living.length;
}

/* Incorporates a chromosome, eliminating the worst. Mainly used for immigration purposes
Do not care if it's sorted or not, and it's not evaluated. To be done in the next round */
Population.prototype.addAsLast = function( individual ) {
    this.living.pop();
    this.living.push( individual );
}
    
