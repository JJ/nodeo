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
    var that = this;
    return this.living.sort( function(a,b) {
	return that.fitness_of[b] - that.fitness_of[a];
    });
};

// Evaluates population
Population.prototype.evaluate = function( fitness ) {
    console.log( "evaluate ");
    console.log( this );
    var that =  this;
    this.living.map( function( individual ) {
	if ( ! (individual in that.fitness_of ) ) {
	    that.fitness_of[individual] = fitness( individual );
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
Population.prototype.fitness_of = function( individual ) {
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

// Population size
Population.prototype.size = function() {
    return this.living.length;
}
